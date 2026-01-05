// src/components/Dashboard/Stats.js
import React from 'react';
import { DollarSign } from 'lucide-react';

const Stats = ({ airdrops, darkMode }) => {
  const stats = {
    total: airdrops.length,
    ongoing: airdrops.filter(a => a.status === 'ongoing').length,
    completed: airdrops.filter(a => a.status === 'completed').length,
    claimed: airdrops.filter(a => a.status === 'claimed').length
  };

  const totalEarnings = airdrops
    .filter(a => a.status === 'claimed' && a.reward)
    .reduce((sum, a) => sum + parseFloat(a.reward || 0), 0);

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Airdrops</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.total}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ongoing</p>
          <p className="text-2xl font-bold text-yellow-500">{stats.ongoing}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
          <p className="text-2xl font-bold text-blue-500">{stats.completed}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Claimed</p>
          <p className="text-2xl font-bold text-green-500">{stats.claimed}</p>
        </div>
      </div>

      {/* Total Earnings */}
      {totalEarnings > 0 && (
        <div className={`${darkMode ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'} rounded-xl p-6 mb-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Penghasilan</p>
              <p className="text-3xl font-bold text-white flex items-center gap-2">
                <DollarSign size={28} />
                ${totalEarnings.toFixed(2)}
              </p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Stats;