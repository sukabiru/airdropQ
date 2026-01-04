import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, TrendingUp, Settings, Wallet, Twitter, Moon, Sun, DollarSign, MessageCircle, Send } from 'lucide-react';

const AirdropTracker = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    categories: [],
    status: 'ongoing',
    date: '',
    notes: '',
    link: '',
    reward: '',
    selectedWallet: '',
    selectedTwitter: '',
    selectedDiscord: '',
    selectedTelegram: ''
  });
  const [settings, setSettings] = useState({
    wallets: [],
    twitter: [],
    discord: [],
    telegram: [],
    categories: [
      'Testnet',
      'Quest Hub',
      'Trading Testnet',
      'Node',
      'Waitlist',
      'Daily',
      'Retro'
    ]
  });
  const [newWallet, setNewWallet] = useState('');
  const [newTwitter, setNewTwitter] = useState('');
  const [newDiscord, setNewDiscord] = useState('');
  const [newTelegram, setNewTelegram] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    loadData();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const loadData = () => {
    try {
      const airdropsData = localStorage.getItem('airdrops-data');
      if (airdropsData) {
        setAirdrops(JSON.parse(airdropsData));
      }
    } catch (error) {
      console.log('No airdrops data');
    }

    try {
      const settingsData = localStorage.getItem('user-settings');
      if (settingsData) {
        setSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.log('No settings data');
    }

    setIsLoading(false);
  };

  const saveAirdrops = (data) => {
    try {
      localStorage.setItem('airdrops-data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save airdrops:', error);
    }
  };

  const saveSettings = (data) => {
    try {
      localStorage.setItem('user-settings', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Nama airdrop harus diisi!');
      return;
    }

    let updatedAirdrops;
    
    if (editingId) {
      updatedAirdrops = airdrops.map(a => 
        a.id === editingId ? { ...formData, id: editingId } : a
      );
      setEditingId(null);
    } else {
      const newAirdrop = {
        ...formData,
        id: Date.now().toString()
      };
      updatedAirdrops = [...airdrops, newAirdrop];
    }
    
    setAirdrops(updatedAirdrops);
    saveAirdrops(updatedAirdrops);
    resetForm();
  };

  const handleEdit = (airdrop) => {
    setFormData(airdrop);
    setEditingId(airdrop.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin mau hapus airdrop ini?')) {
      const updatedAirdrops = airdrops.filter(a => a.id !== id);
      setAirdrops(updatedAirdrops);
      saveAirdrops(updatedAirdrops);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      categories: [],
      status: 'ongoing',
      date: '',
      notes: '',
      link: '',
      reward: '',
      selectedWallet: '',
      selectedTwitter: '',
      selectedDiscord: '',
      selectedTelegram: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleAddWallet = () => {
    if (!newWallet.trim()) return;
    const updatedSettings = {
      ...settings,
      wallets: [...settings.wallets, { id: Date.now().toString(), address: newWallet.trim() }]
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setNewWallet('');
  };

  const handleDeleteWallet = (id) => {
    const updatedSettings = {
      ...settings,
      wallets: settings.wallets.filter(w => w.id !== id)
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleAddTwitter = () => {
    if (!newTwitter.trim()) return;
    const updatedSettings = {
      ...settings,
      twitter: [...settings.twitter, { id: Date.now().toString(), username: newTwitter.trim() }]
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setNewTwitter('');
  };

  const handleDeleteTwitter = (id) => {
    const updatedSettings = {
      ...settings,
      twitter: settings.twitter.filter(t => t.id !== id)
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleAddDiscord = () => {
    if (!newDiscord.trim()) return;
    const updatedSettings = {
      ...settings,
      discord: [...settings.discord, { id: Date.now().toString(), username: newDiscord.trim() }]
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setNewDiscord('');
  };

  const handleDeleteDiscord = (id) => {
    const updatedSettings = {
      ...settings,
      discord: settings.discord.filter(d => d.id !== id)
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleAddTelegram = () => {
    if (!newTelegram.trim()) return;
    const updatedSettings = {
      ...settings,
      telegram: [...settings.telegram, { id: Date.now().toString(), username: newTelegram.trim() }]
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setNewTelegram('');
  };

  const handleDeleteTelegram = (id) => {
    const updatedSettings = {
      ...settings,
      telegram: settings.telegram.filter(t => t.id !== id)
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    if (settings.categories.includes(newCategory.trim())) {
      alert('Kategori sudah ada!');
      return;
    }
    const updatedSettings = {
      ...settings,
      categories: [...settings.categories, newCategory.trim()]
    };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    setNewCategory('');
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Yakin mau hapus kategori "${category}"?`)) {
      const updatedSettings = {
        ...settings,
        categories: settings.categories.filter(c => c !== category)
      };
      setSettings(updatedSettings);
      saveSettings(updatedSettings);
    }
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

  const handleSaveSettings = () => {
    saveSettings(settings);
    alert('Settings berhasil disimpan!');
  };

  const filteredAirdrops = filterStatus === 'all' 
    ? airdrops 
    : airdrops.filter(a => a.status === filterStatus);

  // Pagination
  const totalPages = Math.ceil(filteredAirdrops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAirdrops = filteredAirdrops.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const stats = {
    total: airdrops.length,
    ongoing: airdrops.filter(a => a.status === 'ongoing').length,
    completed: airdrops.filter(a => a.status === 'completed').length,
    claimed: airdrops.filter(a => a.status === 'claimed').length
  };

  const totalEarnings = airdrops
    .filter(a => a.status === 'claimed' && a.reward)
    .reduce((sum, a) => sum + parseFloat(a.reward || 0), 0);

  const getStatusLabel = (status) => {
    switch(status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      case 'claimed': return 'Claimed';
      default: return status;
    }
  };

  const getAccountName = (type, id) => {
    if (!id) return '';
    const list = settings[type] || [];
    const account = list.find(a => a.id === id);
    return account ? account.username || account.address : '';
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} flex items-center justify-center`}>
        <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4 md:p-8 transition-colors duration-200`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>🪂 Airdrop Hunter Tracker</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Track semua airdrop yang sudah kamu garap</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-700 text-white'} p-3 rounded-lg hover:opacity-80 transition`}
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-700 text-white'} p-3 rounded-lg hover:opacity-80 transition`}
              title="Settings"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-lg p-6 mb-6`}>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Settings size={24} />
              Settings
            </h2>

            {/* Wallets Section */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <Wallet size={20} />
                Wallet Addresses
              </h3>
              <div className="space-y-3">
                {settings.wallets.map((wallet) => (
                  <div key={wallet.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-lg`}>
                    <input
                      type="text"
                      value={wallet.address}
                      readOnly
                      className={`flex-1 px-3 py-2 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded-lg text-sm`}
                    />
                    <button
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newWallet}
                    onChange={(e) => setNewWallet(e.target.value)}
                    placeholder="0x..."
                    className={`flex-1 px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                  <button
                    onClick={handleAddWallet}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                📁 Categories
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {settings.categories.map((category) => (
                  <div
                    key={category}
                    className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-purple-100'} px-3 py-2 rounded-lg`}
                  >
                    <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-purple-800'}`}>{category}</span>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category..."
                  className={`flex-1 px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>
            </div>

            {/* Social Media Sections */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Twitter */}
              <div>
                <h3 className={`text-md font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <Twitter size={18} />
                  Twitter Accounts
                </h3>
                <div className="space-y-2">
                  {settings.twitter.map((account) => (
                    <div key={account.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-2 rounded-lg`}>
                      <input
                        type="text"
                        value={account.username}
                        readOnly
                        className={`flex-1 px-2 py-1 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded text-sm`}
                      />
                      <button
                        onClick={() => handleDeleteTwitter(account.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTwitter}
                      onChange={(e) => setNewTwitter(e.target.value)}
                      placeholder="@username"
                      className={`flex-1 px-3 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg text-sm`}
                    />
                    <button onClick={handleAddTwitter} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Discord */}
              <div>
                <h3 className={`text-md font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <MessageCircle size={18} />
                  Discord Accounts
                </h3>
                <div className="space-y-2">
                  {settings.discord.map((account) => (
                    <div key={account.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-2 rounded-lg`}>
                      <input
                        type="text"
                        value={account.username}
                        readOnly
                        className={`flex-1 px-2 py-1 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded text-sm`}
                      />
                      <button
                        onClick={() => handleDeleteDiscord(account.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDiscord}
                      onChange={(e) => setNewDiscord(e.target.value)}
                      placeholder="username#1234"
                      className={`flex-1 px-3 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg text-sm`}
                    />
                    <button onClick={handleAddDiscord} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Telegram */}
              <div>
                <h3 className={`text-md font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <Send size={18} />
                  Telegram Accounts
                </h3>
                <div className="space-y-2">
                  {settings.telegram.map((account) => (
                    <div key={account.id} className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-2 rounded-lg`}>
                      <input
                        type="text"
                        value={account.username}
                        readOnly
                        className={`flex-1 px-2 py-1 ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} border rounded text-sm`}
                      />
                      <button
                        onClick={() => handleDeleteTelegram(account.id)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTelegram}
                      onChange={(e) => setNewTelegram(e.target.value)}
                      placeholder="@username"
                      className={`flex-1 px-3 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg text-sm`}
                    />
                    <button onClick={handleAddTelegram} className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveSettings}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-6 py-2 rounded-lg hover:opacity-80 transition`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Total Airdrops</div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.total}</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Ongoing</div>
            <div className="text-2xl font-bold text-blue-600">{stats.ongoing}</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Completed</div>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg p-4 shadow-sm`}>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Claimed</div>
            <div className="text-2xl font-bold text-purple-600">{stats.claimed}</div>
          </div>
        </div>

        {/* Total Earnings */}
        {totalEarnings > 0 && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Total Penghasilan</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <DollarSign size={32} />
                  ${totalEarnings.toFixed(2)}
                </div>
              </div>
              <div className="text-6xl opacity-20">💰</div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {showForm ? 'Cancel' : 'Tambah Airdrop'}
          </button>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'all' 
                  ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('ongoing')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'ongoing' 
                  ? 'bg-blue-600 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'completed' 
                  ? 'bg-green-600 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('claimed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === 'claimed' 
                  ? 'bg-purple-600 text-white'
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Claimed
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {editingId ? 'Edit Airdrop' : 'Tambah Airdrop Baru'}
            </h2>
            <div className="space-y-4">
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
                    {settings.categories.length === 0 ? (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tambah kategori di Settings dulu</p>
                    ) : (
                      <div className="space-y-2">
                        {settings.categories.map((category) => (
                          <label key={category} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.categories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{category}</span>
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
                <h3 className={`text-md font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>Wallet & Social Media yang Digunakan</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Pilih Wallet
                    </label>
                    <select
                      value={formData.selectedWallet}
                      onChange={(e) => setFormData({...formData, selectedWallet: e.target.value})}
                      className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">-- Tidak pakai wallet --</option>
                      {settings.wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                          {truncateAddress(wallet.address)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Pilih Twitter
                    </label>
                    <select
                      value={formData.selectedTwitter}
                      onChange={(e) => setFormData({...formData, selectedTwitter: e.target.value})}
                      className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">-- Tidak pakai Twitter --</option>
                      {settings.twitter.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Pilih Discord
                    </label>
                    <select
                      value={formData.selectedDiscord}
                      onChange={(e) => setFormData({...formData, selectedDiscord: e.target.value})}
                      className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">-- Tidak pakai Discord --</option>
                      {settings.discord.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.username}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Pilih Telegram
                    </label>
                    <select
                      value={formData.selectedTelegram}
                      onChange={(e) => setFormData({...formData, selectedTelegram: e.target.value})}
                      className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    >
                      <option value="">-- Tidak pakai Telegram --</option>
                      {settings.telegram.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

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
                </div>
              </div>

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

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                >
                  {editingId ? 'Update' : 'Simpan'}
                </button>
                <button
                  onClick={resetForm}
                  className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} px-6 py-2 rounded-lg font-medium hover:opacity-80 transition`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Airdrop List - CARD DESIGN */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentAirdrops.length === 0 ? (
            <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-sm p-12 text-center md:col-span-3`}>
              <TrendingUp size={48} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} />
              <h3 className={`text-xl font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                Belum ada airdrop
              </h3>
              <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                Mulai track airdrop kamu dengan klik tombol "Tambah Airdrop"
              </p>
            </div>
          ) : (
            currentAirdrops.map((airdrop) => (
              <div key={airdrop.id} className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Card Header with gradient */}
                <div className={`${
                  airdrop.status === 'ongoing' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  airdrop.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  'bg-gradient-to-r from-purple-500 to-purple-600'
                } p-4 text-white`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{airdrop.name}</h3>
                    <span className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-xs font-medium">
                      {getStatusLabel(airdrop.status)}
                    </span>
                  </div>
                  {airdrop.status === 'claimed' && airdrop.reward && (
                    <div className="flex items-center gap-1 text-yellow-300 font-bold">
                      <DollarSign size={18} />
                      <span className="text-lg">${parseFloat(airdrop.reward).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {airdrop.categories && airdrop.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {airdrop.categories.map((cat) => (
                        <span key={cat} className={`inline-block px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'} rounded-full text-xs font-medium`}>
                          📁 {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {airdrop.date && (
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                      📅 {new Date(airdrop.date).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  )}

                  {/* Wallet & Social Media Info */}
                  {(airdrop.selectedWallet || airdrop.selectedTwitter || airdrop.selectedDiscord || airdrop.selectedTelegram) && (
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} p-3 rounded-lg mb-3 space-y-2`}>
                      {airdrop.selectedWallet && (
                        <div className="flex items-center gap-2 text-sm">
                          <Wallet size={14} className="text-purple-600" />
                          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {truncateAddress(getAccountName('wallets', airdrop.selectedWallet))}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        {airdrop.selectedTwitter && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center gap-1">
                            <Twitter size={12} />
                            {getAccountName('twitter', airdrop.selectedTwitter)}
                          </span>
                        )}
                        {airdrop.selectedDiscord && (
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs flex items-center gap-1">
                            <MessageCircle size={12} />
                            {getAccountName('discord', airdrop.selectedDiscord)}
                          </span>
                        )}
                        {airdrop.selectedTelegram && (
                          <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs flex items-center gap-1">
                            <Send size={12} />
                            {getAccountName('telegram', airdrop.selectedTelegram)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {airdrop.notes && (
                    <div className={`text-sm ${darkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-700 bg-gray-50'} p-3 rounded-lg mb-3`}>
                      {airdrop.notes}
                    </div>
                  )}
                  
                  {airdrop.link && (
                    <a
                      href={airdrop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                  )}
                </div>

                {/* Card Footer */}
                <div className={`${darkMode ? 'bg-gray-700 border-t border-gray-600' : 'bg-gray-50 border-t'} px-5 py-3 flex justify-end gap-2`}>
                  <button
                    onClick={() => handleEdit(airdrop)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(airdrop.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredAirdrops.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === 1
                  ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === totalPages
                  ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Showing info */}
        {filteredAirdrops.length > 0 && (
          <div className={`text-center mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {startIndex + 1} - {Math.min(endIndex, filteredAirdrops.length)} of {filteredAirdrops.length} airdrops
          </div>
        )}
      </div>
    </div>
  );
};

export default AirdropTracker;