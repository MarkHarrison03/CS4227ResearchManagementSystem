import './App.css';
import ResearchPage from './ResearchPage';
import { Provider } from "react-redux";
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex w-screen h-screen bg-gray-900 text-white overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <a href="#" className="block text-gray-300 hover:text-white">📊 Dashboard</a>
            <a href="#" className="block text-gray-300 hover:text-white">👤 Profile</a>
            <a href="#" className="block text-gray-300 hover:text-white">⚙️ Settings</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow w-full h-full">
          <ResearchPage />
        </main>
      </div>
    </Provider>
  );
};

export default App;
