import { useState } from "react";

const Timeline = () => {
    const [milestones, setMilestones] = useState<{ date: string; description: string }[]>([]);
    const [milestoneDate, setMilestoneDate] = useState('');
    const [milestoneDesc, setMilestoneDesc] = useState('');

    const addMilestone = () => {
        if (milestoneDate && milestoneDesc) {
            setMilestones([...milestones, { date: milestoneDate, description: milestoneDesc }]);
            setMilestoneDate('');
            setMilestoneDesc('');
        }
    };

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold">Timeline</h3>

            <div className="grid grid-cols-2 gap-6 mt-2">
                <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="text-white">2024-03-11</p>
                </div>
                <div>
                    <p className="text-gray-400">Deadline</p>
                    <p className="text-white">2024-04-01</p>
                    <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded mt-1 inline-block">
                        Approaching
                    </span>
                </div>
            </div>

            {/* Display Added Milestones */}
            {milestones.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-md font-semibold text-white">Milestones</h4>
                    <ul className="text-gray-300">
                        {milestones.map((milestone, index) => (
                            <li key={index} className="bg-gray-700 p-2 rounded mt-2">
                                <strong>{milestone.date}:</strong> {milestone.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Input for Milestones */}
            <div className="mt-4 flex space-x-2">
                <input
                    type="date"
                    className="p-2 bg-gray-700 text-white rounded"
                    value={milestoneDate}
                    onChange={(e) => setMilestoneDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Milestone Description"
                    className="p-2 bg-gray-700 text-white rounded flex-grow"
                    value={milestoneDesc}
                    onChange={(e) => setMilestoneDesc(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={addMilestone}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Timeline;
