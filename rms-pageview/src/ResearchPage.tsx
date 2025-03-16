import {useEffect, useState } from 'react';
import api from './api';
import { Research } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {RootState, AppDispatch} from './store';
import { fetchResearch } from './ResearchSlice';
import PDFViewer from './PDFViewer';

const ResearchPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { research, status, error } = useSelector((state: RootState) => state.research);
    //const [research, setResearch] = useState<Research | null>(null);
    const researchId = 1;

    useEffect(() => {
        dispatch(fetchResearch(researchId))
        
    }, [dispatch, researchId]);


    if (status === "loading") {
        return <div className="text-center text-gray-400">Loading</div>;
    }

    if (status === "failed") {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!research) {
        return <div className="text-center text-gray-500">No research found.</div>;
    }
    
    return (
        <div className="flex w-full h-full ">
            <div className="w-2/3 h-full flex flex-col">
            <PDFViewer pdfUrl={research.pdfUrl} />
            </div>

            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-10">
        {/* Header */}
          

            <div className="w-full max-w-3xl space-y-6">
            {/* Research Title Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Research Management</h1>
                <h2 className="text-2xl font-semibold">{research.title}</h2>
                <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded mt-2 inline-block">
                    {research.status}
                </span>
            </div>

            {/* Description Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-300">{research.content}</p>
            </div>

            {/* Timeline Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold">Timeline</h3>
                <div className="grid grid-cols-2 gap-6 mt-2">
                    <div>
                        <p className="text-gray-400">Start Date</p>
                        <p className="text-white">{research.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Deadline</p>
                        <p className="text-white">{research.deadline}</p>
                        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded mt-1 inline-block">
                            Approaching
                        </span>
                    </div>
                </div>
            </div>

            {/* Status History Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold">Status History</h3>
                <div className="bg-gray-700 p-4 rounded-lg mt-3">
                    <p className="text-gray-400">Initial Status</p>
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                        COMPLETED
                    </span>
                    <p className="text-gray-400 mt-2">{research.date}</p>
                </div>
            </div>

            {/* Project Details Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold">Project Details</h3>
                <p className="text-gray-400">Owner: <span className="text-white">testuser</span></p>
                <p className="text-gray-400">Created: <span className="text-white">{research.date}</span></p>
                <p className="text-gray-400">Last Updated: <span className="text-white">{research.date}</span></p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    Back to Projects
                </button>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Edit Project
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Delete Project
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}
    
export default ResearchPage;