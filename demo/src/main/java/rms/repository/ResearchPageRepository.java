package com.example.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.rms.model.ResearchPage;

@Repository
public interface ResearchPageRepository extends JpaRepository<ResearchPage, Long> {
}