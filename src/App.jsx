import React, { useState } from 'react';
import Calendar from './components/Calendar';
import { Dialog } from '@headlessui/react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} font-sans`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-8">📅 My Calendar</h1>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
            Dashboard
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            Add Event
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
            Settings
          </button>
          <div className="mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
              <span>Dark Mode</span>
            </label>
          </div>
        </nav>
      </aside>

      {/* Calendar Area */}
      <main className="flex-grow p-6">
        <Calendar />
      </main>

      {/* Modal for Add Event (just a placeholder form) */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Event</Dialog.Title>
            <form className="space-y-4">
            <input type="text"placeholder="Title"className="w-full px-4 py-2 border rounded text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600"/>
            <input type="date"className="w-full px-4 py-2 border rounded text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600"/>
            <input type="time"className="w-full px-4 py-2 border rounded text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400dark:bg-gray-700 dark:border-gray-600"/>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:underline"
              >
                Cancel
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
