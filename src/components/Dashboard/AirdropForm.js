// src/components/Dashboard/AirdropForm.js
import React, { useState, useEffect } from 'react';

const AirdropForm = ({ 
  airdrop, 
  wallets, 
  socialAccounts, 
  categories, 
  darkMode, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    categories: [],
    status: 'ongoing',
    date: '',
    notes: '',
    link: '',
    reward: '',
    selected_wallet: '',
    selected_twitter: '',
    selected_discord: '',
    selected_telegram: '',
    selected_email: ''
  });

  // Load existing airdrop data for editing
  useEffect(() => {
    if (airdrop) {
      setFormData({
        name: airdrop.name || '',
        categories: airdrop.categories || [],
        status: airdrop.status || 'ongoing',
        date: airdrop.date || '',
        notes: airdrop.notes || '',
        link: airdrop.link || '',
        reward: airdrop.reward || '',
        selected_wallet: airdrop.selected_wallet || '',
        selected_twitter: airdrop.selected_twitter || '',
        selected_discord: airdrop.selected_discord || '',
        selected_telegram: airdrop.selected_telegram || '',
        selected_email: airdrop.selected_email || ''
      });
    }
  }, [airdrop]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Nama airdrop harus diisi!');
      return;
    }

    onSave(formData);
  };

  const toggleCategory = (category) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter(c => c !== category)
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    }
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTwitterAccounts = () => socialAccounts.filter(a => a.type === 'twitter');
  const getDiscordAccounts = () => socialAccounts.filter(a => a.type === 'discord');
  const getTelegramAccounts = () => socialAccounts.filter(a => a.type === 'telegram');
  const getEmailAccounts = () => socialAccounts.filter(a => a.type === 'email');

  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {airdrop ? 'Edit Airdrop' : 'Tambah Airdrop Baru'}
      </h2>
      
      <div className="space-y-4">
        {/* Nama & Kategori */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Nama Airdrop *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="e.g. LayerZero"
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Kategori (bisa pilih lebih dari 1)
            </label>
            <div className={`relative ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border rounded-lg p-3 max-h-32 overflow-y-auto`}>
              {categories.length === 0 ? (
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Tambah kategori di Settings dulu
                </p>
              ) : (
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(cat.name)}
                        onChange={() => toggleCategory(cat.name)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {cat.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.categories.map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status & Tanggal */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="claimed">Claimed</option>
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Wallet & Social Media Selection */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
          <h3 className={`text-md font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>
            Wallet & Social Media yang Digunakan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Wallet */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Pilih Wallet
              </label>
              <select
                value={formData.selected_wallet}
                onChange={(e) => setFormData({...formData, selected_wallet: e.target.value})}
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">-- Tidak pakai wallet --</option>
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}: {truncateAddress(wallet.address)}
                  </option>
                ))}
              </select>
            </div>

            {/* Twitter */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Pilih Twitter
              </label>
              <select
                value={formData.selected_twitter}
                onChange={(e) => setFormData({...formData, selected_twitter: e.target.value})}
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">-- Tidak pakai Twitter --</option>
                {getTwitterAccounts().map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {/* Discord */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Pilih Discord
              </label>
              <select
                value={formData.selected_discord}
                onChange={(e) => setFormData({...formData, selected_discord: e.target.value})}
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">-- Tidak pakai Discord --</option>
                {getDiscordAccounts().map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Telegram */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Pilih Telegram
              </label>
              <select
                value={formData.selected_telegram}
                onChange={(e) => setFormData({...formData, selected_telegram: e.target.value})}
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">-- Tidak pakai Telegram --</option>
                {getTelegramAccounts().map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Pilih Email
              </label>
              <select
                value={formData.selected_email}
                onChange={(e) => setFormData({...formData, selected_email: e.target.value})}
                className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              >
                <option value="">-- Tidak pakai Email --</option>
                {getEmailAccounts().map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Link & Reward */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Link Website
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Penghasilan (USD) {formData.status === 'claimed' && '*'}
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.reward}
              onChange={(e) => setFormData({...formData, reward: e.target.value})}
              className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder="0.00"
              disabled={formData.status !== 'claimed'}
            />
            {formData.status !== 'claimed' && (
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                Hanya untuk status Claimed
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            rows="3"
            placeholder="Catatan tentang airdrop ini..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            {airdrop ? 'Update' : 'Simpan'}
          </button>
          <button
            onClick={onCancel}
            className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-6 py-2 rounded-lg font-medium hover:opacity-80 transition`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AirdropForm;