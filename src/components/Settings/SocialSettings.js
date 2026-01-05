// src/components/Settings/SocialSettings.js
import React, { useState } from 'react';
import { Plus, Trash2, Twitter, MessageCircle, Send, Mail } from 'lucide-react';
import { createSocialAccount, deleteSocialAccount } from '../../services/airdropService';

const SocialSettings = ({ userId, socialAccounts, onUpdate, darkMode }) => {
  const [newAccount, setNewAccount] = useState({ type: 'twitter', username: '' });
  const [loading, setLoading] = useState(false);

  const getAccountsByType = (type) => {
    return socialAccounts.filter(acc => acc.type === type);
  };

  const handleAddAccount = async () => {
    if (!newAccount.username.trim()) {
      alert('Username/email is required!');
      return;
    }

    setLoading(true);
    try {
      await createSocialAccount(userId, newAccount.type, newAccount.username.trim());
      setNewAccount({ type: 'twitter', username: '' });
      onUpdate(); // Refresh data
    } catch (error) {
      console.error('Error adding social account:', error);
      alert('Failed to add account');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (window.confirm('Yakin mau hapus akun ini?')) {
      try {
        await deleteSocialAccount(accountId);
        onUpdate(); // Refresh data
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'twitter': return <Twitter size={18} />;
      case 'discord': return <MessageCircle size={18} />;
      case 'telegram': return <Send size={18} />;
      case 'email': return <Mail size={18} />;
      default: return null;
    }
  };

  const getLabel = (type) => {
    switch(type) {
      case 'twitter': return 'Twitter / X';
      case 'discord': return 'Discord';
      case 'telegram': return 'Telegram';
      case 'email': return 'Email';
      default: return type;
    }
  };

  const getPlaceholder = (type) => {
    switch(type) {
      case 'twitter': return '@username';
      case 'discord': return 'username#1234';
      case 'telegram': return '@username';
      case 'email': return 'email@example.com';
      default: return 'username';
    }
  };

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        Social Media Accounts
      </h3>

      {/* Display by Type */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {['twitter', 'discord', 'telegram', 'email'].map((type) => (
          <div key={type} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {getIcon(type)}
              {getLabel(type)}
            </h4>
            <div className="space-y-2">
              {getAccountsByType(type).map((account) => (
                <div key={account.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-600' : 'bg-white'} p-2 rounded-lg`}>
                  <input
                    type="text"
                    value={account.username}
                    readOnly
                    className={`flex-1 px-2 py-1 ${darkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-gray-50 border-gray-300'} border rounded text-sm`}
                  />
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {getAccountsByType(type).length === 0 && (
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
                  Belum ada akun
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Account */}
      <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'} border-2 border-dashed p-4 rounded-lg`}>
        <div className="space-y-3">
          <div>
            <label className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Account Type
            </label>
            <select
              value={newAccount.type}
              onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="twitter">Twitter / X</option>
              <option value="discord">Discord</option>
              <option value="telegram">Telegram</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              {getLabel(newAccount.type)} {newAccount.type === 'email' ? 'Address' : 'Username'}
            </label>
            <input
              type={newAccount.type === 'email' ? 'email' : 'text'}
              value={newAccount.username}
              onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
              placeholder={getPlaceholder(newAccount.type)}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
          <button
            onClick={handleAddAccount}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus size={20} />
            {loading ? 'Adding...' : 'Add Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSettings;