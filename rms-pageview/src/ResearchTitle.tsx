const ResearchTitle = ({ title, status }: { title: string, status: string }) => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Research Management</h1>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded mt-2 inline-block">
                {status}
            </span>
        </div>
    );
};
export default ResearchTitle;
