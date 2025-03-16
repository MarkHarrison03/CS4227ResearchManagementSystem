import {useEffect, useState } from 'react';
import api from './api';
import { Research } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {RootState, AppDispatch} from './store';
import { fetchResearch } from './ResearchSlice';
import PDFViewer from './PDFViewer';
import ResearchTitle from './ResearchTitle';
import Timeline from './Timeline';
import Comments from './Comments';
const ResearchPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { research, status, error } = useSelector((state: RootState) => state.research);
    //const [research, setResearch] = useState<Research | null>(null);
    const researchId = 1;


    const [milestones, setMilestones] = useState<{ date: string; description: string }[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [milestoneDate, setMilestoneDate] = useState('');
    const [milestoneDesc, setMilestoneDesc] = useState('');


    const [comments, setComments] = useState<{ name: string; message: string }[]>([]);
    const [commentName, setCommentName] = useState('');
    const [commentMessage, setCommentMessage] = useState('');

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
    const addMilestone = () => {
        if (milestoneDate && milestoneDesc) {
            setMilestones([...milestones, { date: milestoneDate, description: milestoneDesc }]);
            setMilestoneDate('');
            setMilestoneDesc('');
            setShowForm(false);
        }
    };
    
const addComment = () => {
    if (commentName && commentMessage) {
        setComments([...comments, { name: commentName, message: commentMessage }]);
        setCommentName('');
        setCommentMessage('');
    }
}

    return (
        <div className="flex w-full h-full ">
            <div className="w-2/3 h-full flex flex-col">
            <PDFViewer pdfUrl={research.pdfUrl} />
            </div>

            <div className="min-h-screen overflow-y-auto  bg-gray-900 text-white flex flex-col items-center justify-center py-10">
        {/* Header */}
          

            <div className="w-full max-w-3xl space-y-6">
            {/* Research Title Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <ResearchTitle title={research.title} status={research.status} />          
              </div>

            {/* Description Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-gray-300">{research.content}</p>
            </div>

            {/* Timeline Card */}
            <Timeline />

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
          {/* Comment Input Fields */}
          <div className="mt-4 flex space-x-2">
             <Comments/>
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