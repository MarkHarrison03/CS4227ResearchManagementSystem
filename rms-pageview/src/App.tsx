import './App.css';
import ResearchPage from './ResearchPage';
import { Provider } from "react-redux";
import { store } from './store';
import Sidebar from './Sidebar';
import { useState } from 'react';

const App = () => {
  const [selectedResearchId, setSelectedResearchId] = useState<number | null>(null);

  return (
    <Provider store={store}>
      <div className="flex w-screen h-screen bg-gray-900 text-white overflow-hidden">
       
        <aside className="w-1/6 bg-gray-800 shadow-lg p-6 flex flex-col">
         <Sidebar onSelect={setSelectedResearchId} />

       </aside>
        <main className="flex-grow w-full h-full">
          <ResearchPage selectedResearchId = {selectedResearchId} />
        </main>
      </div>
    </Provider>
  );
};

export default App;
