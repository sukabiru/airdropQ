// src/components/Settings/WalletSettings.js
import React, { useState } from 'react';
import { Plus, Trash2, Wallet } from 'lucide-react';
import { createWallet, deleteWallet } from '../../services/airdropService';

const WalletSettings = ({ userId, wallets, onUpdate, darkMode }) => {
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddWallet = async () => {
    if (!newWalletName.trim() || !newWalletAddress.trim()) {
      alert('Name and address are required!');
      return;
    }

    setLoading(true);
    try {
      await createWallet(userId, newWalletName.trim(), newWalletAddress.trim());
      setNewWalletName('');
      setNewWalletAddress('');
      onUpdate(); // Refresh data
    } catch (error) {
      console.error('Error adding wallet:', error);
      alert('Failed to add wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWallet = async (walletId) => {
    if (window.confirm('Yakin mau hapus wallet ini?')) {
      try {
        await deleteWallet(walletId);
        onUpdate(); // Refresh data
      } catch (error) {
        console.error('Error deleting wallet:', error);
        alert('Failed to delete wallet');
      }
    }
  };

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <Wallet size={20} />
        Wallet Addresses
      </h3>
      
      <div className="space-y-3">
        {/* Existing Wallets */}
        {wallets.map((wallet) => (
          <div key={wallet.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-lg`}>
            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                type="text"
                value={wallet.name}
                readOnly
                className={`px-3 py-2 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded-lg text-sm font-medium`}
                placeholder="Wallet Name"
              />
              <input
                type="text"
                value={wallet.address}
                readOnly
                className={`px-3 py-2 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded-lg text-sm`}
                placeholder="0x..."
              />
            </div>
            <button
              onClick={() => handleDeleteWallet(wallet.id)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {/* Add New Wallet */}
        <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'} border-2 border-dashed p-4 rounded-lg`}>
          <div className="space-y-3">
            <div>
              <label className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Wallet Name (e.g., "Main EVM", "Solana Wallet", "SUI #1")
              </label>
              <input
                type="text"
                value={newWalletName}
                onChange={(e) => setNewWalletName(e.target.value)}
                placeholder="Main EVM"
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
            <div>
              <label className={`block text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Wallet Address
              </label>
              <input
                type="text"
                value={newWalletAddress}
                onChange={(e) => setNewWalletAddress(e.target.value)}
                placeholder="0x... or Sol... or sui..."
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
            <button
              onClick={handleAddWallet}
              disabled={loading}
              className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Plus size={20} />
              {loading ? 'Adding...' : 'Add Wallet'}
            </button>
          </div>
        </div>

        {wallets.length === 0 && (
          <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
            Belum ada wallet. Tambahkan wallet pertama kamu!
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletSettings;