package com.example.rms.controller;

import com.example.rms.repository.ResearchPageRepository;
import com.example.rms.model.ResearchPage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;
@CrossOrigin(origins = "*")  
@RestController
@RequestMapping("/api/research")
public class ResearchPageController {
    private static final Logger logger = LoggerFactory.getLogger(ResearchPageController.class);
    @Autowired
    private ResearchPageRepository researchPageRepository;

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<ResearchPage> getResearchPageById(@PathVariable Long id) {
        ResearchPage researchPage = researchPageRepository.findById(id).orElse(null);
        logger.info("Retrieved Research Page : {}", researchPage);
        return ResponseEntity.ok(researchPage);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<ResearchPage> createResearchPage(@RequestBody ResearchPage researchPage) {
        ResearchPage newResearchPage = researchPageRepository.save(researchPage);
        return ResponseEntity.ok(newResearchPage);
    }
    @GetMapping("/all")
    public ResponseEntity<List<ResearchPage>> getAllResearchPages() {
    List<ResearchPage> pages = researchPageRepository.findAll();
    return ResponseEntity.ok(pages);
    }
}
