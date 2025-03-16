import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchAllResearch } from "./ResearchSlice";
import api from "./api"; 

const Sidebar = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allResearch, status, error } = useSelector((state: RootState) => state.research);

  const [showForm, setShowForm] = useState(false);
  const [jsonInput, setJsonInput] = useState("");


  useEffect(() => {
    dispatch(fetchAllResearch()); 
  }, [dispatch]);

  if (status === "loading") return <p className="text-gray-400">Loading...</p>;
  if (status === "failed") return <p className="text-red-500">Error: {error}</p>;


 const handleAddProject = async () => {
    try {
      const projectData = JSON.parse(jsonInput); 
      const response = await api.post("/research", projectData); 

      setJsonInput("");
      setShowForm(false); 
      dispatch(fetchAllResearch()); 
    } catch (error) {
      alert("Invalid json format.");
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 p-4 text-white overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Research Titles</h2>
      <ul>
        {allResearch.map((research) => (
          <li
            key={research.id}
            className="p-2 cursor-pointer hover:bg-gray-700 rounded"
            onClick={() => onSelect(research.id)}
          >
            {research.title}
          </li>
        ))}
      </ul>
      
      {/* Add Project Button */}
      <div className="mt-auto">
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          Add Project
        </button>

        {/* JSON Input Form */}
        {showForm && (
          <div className="mt-2 p-2 bg-gray-700 rounded">
            <textarea
              className="w-full h-24 p-2 bg-gray-800 text-white rounded"
              placeholder='{
    "title": "Third Project",
    "author": "John Doe",
    "content": "Exploring AI applications in healthcare.",
    "url": "http://example.com",
    "date": "2024-03-11",
    "source": "Science Journal",
    "type": "Research",
    "tags": "AI, Healthcare",
    "deadline": "2024-04-01",
    "status": "Published",
    "notes": "This research is promising.",
    "pdfUrl": "https://fass.open.ac.uk/sites/fass.open.ac.uk/files/files/research/sample-research-proposal.pdf"
}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <button
              className="w-full mt-2 bg-green-600 text-white p-2 rounded hover:bg-green-700"
              onClick={handleAddProject}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
