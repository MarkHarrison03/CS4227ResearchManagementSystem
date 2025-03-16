import { useState } from "react";

const Comments = () => {
    const [comments, setComments] = useState<{ name: string; message: string }[]>([]);
    const [commentName, setCommentName] = useState('');
    const [commentMessage, setCommentMessage] = useState('');

    const addComment = () => {
        if (commentName && commentMessage) {
            setComments([...comments, { name: commentName, message: commentMessage }]);
            setCommentName('');
            setCommentMessage('');
        }
    };

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 mt-6 w-full">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-4 space-y-2">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded">
                            <p className="text-white font-semibold">{comment.name}</p>
                            <p className="text-gray-300">{comment.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No comments yet.</p>
                )}
            </div>
            <div className="mt-4 flex space-x-2">
                <input type="text" placeholder="Your Name" className="p-2 bg-gray-700 text-white rounded w-1/4" value={commentName} onChange={(e) => setCommentName(e.target.value)} />
                <input type="text" placeholder="Write a comment..." className="p-2 bg-gray-700 text-white rounded flex-grow" value={commentMessage} onChange={(e) => setCommentMessage(e.target.value)} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={addComment}>Add</button>
            </div>
        </div>
    );
};
export default Comments;
