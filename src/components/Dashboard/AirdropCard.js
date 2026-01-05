// src/components/Dashboard/AirdropCard.js
import React from 'react';
import { Edit2, Trash2, ExternalLink, Wallet, Twitter, MessageCircle, Send, Mail, DollarSign } from 'lucide-react';

const AirdropCard = ({ airdrop, wallets, socialAccounts, darkMode, onEdit, onDelete }) => {
  const getStatusLabel = (status) => {
    switch(status) {
      case 'ongoing': return 'Ongoing';
      case 'completed': return 'Completed';
      case 'claimed': return 'Claimed';
      default: return status;
    }
  };

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

  const wallet = getWalletById(airdrop.selected_wallet);
  const twitter = getSocialById(airdrop.selected_twitter);
  const discord = getSocialById(airdrop.selected_discord);
  const telegram = getSocialById(airdrop.selected_telegram);
  const email = getSocialById(airdrop.selected_email);

  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}>
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
        {/* Categories */}
        {airdrop.categories && airdrop.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {airdrop.categories.map((cat) => (
              <span key={cat} className={`inline-block px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-100 text-purple-700'} rounded-full text-xs font-medium`}>
                📁 {cat}
              </span>
            ))}
          </div>
        )}
        
        {/* Date */}
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
        {(wallet || twitter || discord || telegram || email) && (
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-50'} p-3 rounded-lg mb-3 space-y-2`}>
            {wallet && (
              <div className="flex items-center gap-2 text-sm">
                <Wallet size={14} className="text-purple-600" />
                <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {wallet.name}: {truncateAddress(wallet.address)}
                </span>
              </div>
            )}
            <div className="flex gap-2 flex-wrap">
              {twitter && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center gap-1">
                  <Twitter size={12} />
                  {twitter.username}
                </span>
              )}
              {discord && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs flex items-center gap-1">
                  <MessageCircle size={12} />
                  {discord.username}
                </span>
              )}
              {telegram && (
                <span className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs flex items-center gap-1">
                  <Send size={12} />
                  {telegram.username}
                </span>
              )}
              {email && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs flex items-center gap-1">
                  <Mail size={12} />
                  {email.username}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Notes */}
        {airdrop.notes && (
          <div className={`text-sm ${darkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-700 bg-gray-50'} p-3 rounded-lg mb-3`}>
            {airdrop.notes}
          </div>
        )}
        
        {/* Link */}
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
          onClick={() => onEdit(airdrop)}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(airdrop.id)}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
          title="Hapus"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AirdropCard;