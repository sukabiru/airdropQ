// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { 
  getAirdrops, 
  createAirdrop, 
  updateAirdrop, 
  deleteAirdrop,
  getWallets, 
  getSocialAccounts, 
  getCategories 
} from '../../services/airdropService';
import Header from './Header';
import Stats from './Stats';
import AirdropCard from './AirdropCard';
import AirdropForm from './AirdropForm';
import Pagination from './Pagination';
import SettingsPanel from '../Settings/SettingsPanel';

const Dashboard = ({ user, onLogout }) => {
  const [airdrops, setAirdrops] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingAirdrop, setEditingAirdrop] = useState(null);
  const itemsPerPage = 9;

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // loadData wrapped in useCallback
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [airdropsData, walletsData, socialData, categoriesData] = await Promise.all([
        getAirdrops(user.id),
        getWallets(user.id),
        getSocialAccounts(user.id),
        getCategories(user.id)
      ]);

      setAirdrops(airdropsData || []);
      setWallets(walletsData || []);
      setSocialAccounts(socialData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handleAddAirdrop = async (airdropData) => {
    try {
      await createAirdrop(user.id, airdropData);
      await loadData(); // Refresh
      setShowForm(false);
      setEditingAirdrop(null);
    } catch (error) {
      console.error('Error creating airdrop:', error);
      alert('Failed to create airdrop');
    }
  };

  const handleEditAirdrop = async (airdropData) => {
    try {
      await updateAirdrop(editingAirdrop.id, airdropData);
      await loadData(); // Refresh
      setShowForm(false);
      setEditingAirdrop(null);
    } catch (error) {
      console.error('Error updating airdrop:', error);
      alert('Failed to update airdrop');
    }
  };

  const handleDeleteAirdrop = async (airdropId) => {
    if (window.confirm('Yakin mau hapus airdrop ini?')) {
      try {
        await deleteAirdrop(airdropId);
        await loadData(); // Refresh
      } catch (error) {
        console.error('Error deleting airdrop:', error);
        alert('Failed to delete airdrop');
      }
    }
  };

  const handleEditClick = (airdrop) => {
    setEditingAirdrop(airdrop);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAirdrop(null);
  };

  // Filter airdrops by status
  const filteredAirdrops = filterStatus === 'all' 
    ? airdrops 
    : airdrops.filter(a => a.status === filterStatus);

  // Pagination
  const totalPages = Math.ceil(filteredAirdrops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAirdrops = filteredAirdrops.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} flex items-center justify-center`}>
        <div className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading your data...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4 md:p-8 transition-colors duration-200`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header 
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenSettings={() => setShowSettings(true)}
          onLogout={onLogout}
        />

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            user={user}
            wallets={wallets}
            socialAccounts={socialAccounts}
            categories={categories}
            darkMode={darkMode}
            onClose={() => setShowSettings(false)}
            onUpdate={loadData}
          />
        )}

        {/* Stats */}
        <Stats airdrops={airdrops} darkMode={darkMode} />

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingAirdrop(null);
              }
            }}
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
          <AirdropForm
            airdrop={editingAirdrop}
            wallets={wallets}
            socialAccounts={socialAccounts}
            categories={categories}
            darkMode={darkMode}
            onSave={editingAirdrop ? handleEditAirdrop : handleAddAirdrop}
            onCancel={handleCancelForm}
          />
        )}

        {/* Airdrop List */}
        <div className="grid md:grid-cols-3 gap-6">
          {currentAirdrops.length === 0 ? (
            <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-sm p-12 text-center md:col-span-3`}>
              <TrendingUp size={48} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} />
              <h3 className={`text-xl font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                {filterStatus === 'all' ? 'Belum ada airdrop' : `Belum ada airdrop ${filterStatus}`}
              </h3>
              <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>
                Mulai track airdrop kamu dengan klik tombol "Tambah Airdrop"
              </p>
            </div>
          ) : (
            currentAirdrops.map((airdrop) => (
              <AirdropCard
                key={airdrop.id}
                airdrop={airdrop}
                wallets={wallets}
                socialAccounts={socialAccounts}
                darkMode={darkMode}
                onEdit={handleEditClick}
                onDelete={handleDeleteAirdrop}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredAirdrops.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAirdrops.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;