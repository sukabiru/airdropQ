// src/components/Dashboard/AirdropCard.js - List View
import React from 'react';
import { Edit2, Trash2, ExternalLink, Wallet, Twitter, MessageCircle, Send, Mail, DollarSign } from 'lucide-react';

const AirdropCard = ({ airdrop, wallets, socialAccounts, darkMode, onEdit, onDelete }) => {
  const getWalletById = (id) => {
    const wallet = wallets.find(w => w.id === id);
    return wallet || null;
  };

  const getSocialById = (id) => {
    const social = socialAccounts.find(s => s.id === id);
    return social || null;
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ongoing': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'claimed': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      case 'claimed': return 'Claimed';
      default: return status;
    }
  };

  const wallet = getWalletById(airdrop.selected_wallet);
  const twitter = getSocialById(airdrop.selected_twitter);
  const discord = getSocialById(airdrop.selected_discord);
  const telegram = getSocialById(airdrop.selected_telegram);
  const email = getSocialById(airdrop.selected_email);

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg hover:shadow-md transition-shadow`}>
      <div className="p-4">
        {/* Main Row */}
        <div className="flex items-start gap-4">
          {/* Status Indicator */}
          <div className={`w-1 h-16 ${getStatusColor(airdrop.status)} rounded-full flex-shrink-0`}></div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>
                    {airdrop.name}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(airdrop.status)} text-white`}>
                    {getStatusLabel(airdrop.status)}
                  </span>
                  {airdrop.status === 'claimed' && airdrop.reward && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-bold flex items-center gap-1">
                      <DollarSign size={12} />
                      ${parseFloat(airdrop.reward).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Categories */}
                {airdrop.categories && airdrop.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {airdrop.categories.map((cat) => (
                      <span key={cat} className={`px-2 py-0.5 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'} rounded text-xs`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date & Link */}
                <div className="flex items-center gap-4 text-sm">
                  {airdrop.date && (
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      📅 {new Date(airdrop.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  {airdrop.link && (
                    <a
                      href={airdrop.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span>Link</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => onEdit(airdrop)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(airdrop.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"
                  title="Hapus"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Details Row */}
            <div className="space-y-2">
              {/* Wallet & Social Media */}
              {(wallet || twitter || discord || telegram || email) && (
                <div className="flex flex-wrap gap-2 text-xs">
                  {wallet && (
                    <span className={`flex items-center gap-1 px-2 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded`}>
                      <Wallet size={12} className="text-purple-600" />
                      {wallet.name}: {truncateAddress(wallet.address)}
                    </span>
                  )}
                  {twitter && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      <Twitter size={12} />
                      {twitter.username}
                    </span>
                  )}
                  {discord && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
                      <MessageCircle size={12} />
                      {discord.username}
                    </span>
                  )}
                  {telegram && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-cyan-100 text-cyan-800 rounded">
                      <Send size={12} />
                      {telegram.username}
                    </span>
                  )}
                  {email && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded">
                      <Mail size={12} />
                      {email.username}
                    </span>
                  )}
                </div>
              )}

              {/* Notes */}
              {airdrop.notes && (
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                  "{airdrop.notes}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirdropCard;