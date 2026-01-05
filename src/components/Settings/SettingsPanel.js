// src/components/Settings/SettingsPanel.js
import React from 'react';
import { Settings } from 'lucide-react';
import WalletSettings from './WalletSettings';
import SocialSettings from './SocialSettings';
import CategorySettings from './CategorySettings';

const SettingsPanel = ({ 
  user, 
  wallets, 
  socialAccounts, 
  categories, 
  darkMode, 
  onClose, 
  onUpdate 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-lg w-full max-w-4xl my-8`}>
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Settings size={24} />
            Settings
          </h2>

          {/* Wallets */}
          <WalletSettings
            userId={user.id}
            wallets={wallets}
            onUpdate={onUpdate}
            darkMode={darkMode}
          />

          {/* Social Media */}
          <SocialSettings
            userId={user.id}
            socialAccounts={socialAccounts}
            onUpdate={onUpdate}
            darkMode={darkMode}
          />

          {/* Categories */}
          <CategorySettings
            userId={user.id}
            categories={categories}
            onUpdate={onUpdate}
            darkMode={darkMode}
          />

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-6 py-2 rounded-lg hover:opacity-80 transition font-medium`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;