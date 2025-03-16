import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchAllResearch } from "./ResearchSlice";

const Sidebar = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allResearch, status, error } = useSelector((state: RootState) => state.research);

  useEffect(() => {
    dispatch(fetchAllResearch()); 
  }, [dispatch]);

  if (status === "loading") return <p className="text-gray-400">Loading...</p>;
  if (status === "failed") return <p className="text-red-500">Error: {error}</p>;

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
    </div>
  );
};

export default Sidebar;
