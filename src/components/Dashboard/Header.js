import React from 'react';
import { Settings, Moon, Sun, LogOut } from 'lucide-react';

const Header = ({ darkMode, onToggleDarkMode, onOpenSettings, onLogout }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-2xl p-6 mb-6`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            🪂 Airdrop Hunter Tracker
          </h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track semua airdrop yang sudah kamu garap
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={onLogout}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-100 hover:bg-red-200 text-red-600'
            }`}
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;