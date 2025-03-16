import React from "react";

interface PDFViewerProps {
    pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
    if (!pdfUrl){
        return <div className="text-center text-gray-500">No PDF found.</div>;
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-top ">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8">Research Management</h1>

        <div className="w-full max-w-3xl space-y-6">
            {/* Research Title Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg w-full p-6">
                <h2 className="text-2xl font-semibold">Research PDF</h2>
            </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-grow w-full m-1 pt-6 h-[90%]">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0 rounded-lg"
          title="Research PDF"
        ></iframe>
      </div>
        </div>

    );
}
export default PDFViewer;
