// src/services/airdropService.js
import { supabase } from './supabaseClient';

// ============ AIRDROPS ============
export const getAirdrops = async (userId) => {
  const { data, error } = await supabase
    .from('airdrops')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createAirdrop = async (userId, airdropData) => {
  // Parse reward properly
  let rewardValue = null;
  if (airdropData.reward && airdropData.reward.toString().trim() !== '') {
    rewardValue = parseFloat(airdropData.reward);
    if (isNaN(rewardValue)) {
      rewardValue = null;
    }
  }

  // Clean and format data
  const cleanData = {
    user_id: userId,
    name: airdropData.name,
    categories: airdropData.categories || [],
    status: airdropData.status,
    date: airdropData.date && airdropData.date.trim() !== '' ? airdropData.date : null,
    notes: airdropData.notes && airdropData.notes.trim() !== '' ? airdropData.notes : null,
    link: airdropData.link && airdropData.link.trim() !== '' ? airdropData.link : null,
    reward: rewardValue,
    selected_wallet: airdropData.selected_wallet && airdropData.selected_wallet !== '' ? airdropData.selected_wallet : null,
    selected_twitter: airdropData.selected_twitter && airdropData.selected_twitter !== '' ? airdropData.selected_twitter : null,
    selected_discord: airdropData.selected_discord && airdropData.selected_discord !== '' ? airdropData.selected_discord : null,
    selected_telegram: airdropData.selected_telegram && airdropData.selected_telegram !== '' ? airdropData.selected_telegram : null,
    selected_email: airdropData.selected_email && airdropData.selected_email !== '' ? airdropData.selected_email : null
  };

  console.log('Creating airdrop with data:', cleanData);

  const { data, error } = await supabase
    .from('airdrops')
    .insert([cleanData])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  return data;
};

export const updateAirdrop = async (airdropId, updates) => {
  // Parse reward properly
  let rewardValue = null;
  if (updates.reward && updates.reward.toString().trim() !== '') {
    rewardValue = parseFloat(updates.reward);
    if (isNaN(rewardValue)) {
      rewardValue = null;
    }
  }

  // Clean and format data
  const cleanData = {
    name: updates.name,
    categories: updates.categories || [],
    status: updates.status,
    date: updates.date && updates.date.trim() !== '' ? updates.date : null,
    notes: updates.notes && updates.notes.trim() !== '' ? updates.notes : null,
    link: updates.link && updates.link.trim() !== '' ? updates.link : null,
    reward: rewardValue,
    selected_wallet: updates.selected_wallet && updates.selected_wallet !== '' ? updates.selected_wallet : null,
    selected_twitter: updates.selected_twitter && updates.selected_twitter !== '' ? updates.selected_twitter : null,
    selected_discord: updates.selected_discord && updates.selected_discord !== '' ? updates.selected_discord : null,
    selected_telegram: updates.selected_telegram && updates.selected_telegram !== '' ? updates.selected_telegram : null,
    selected_email: updates.selected_email && updates.selected_email !== '' ? updates.selected_email : null
  };

  const { data, error } = await supabase
    .from('airdrops')
    .update(cleanData)
    .eq('id', airdropId)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
  
  return data;
};

export const deleteAirdrop = async (airdropId) => {
  const { error } = await supabase
    .from('airdrops')
    .delete()
    .eq('id', airdropId);

  if (error) throw error;
};

// ============ WALLETS ============
export const getWallets = async (userId) => {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createWallet = async (userId, name, address) => {
  const { data, error } = await supabase
    .from('wallets')
    .insert([{ user_id: userId, name, address }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteWallet = async (walletId) => {
  const { error } = await supabase
    .from('wallets')
    .delete()
    .eq('id', walletId);

  if (error) throw error;
};

// ============ SOCIAL ACCOUNTS ============
export const getSocialAccounts = async (userId, type = null) => {
  let query = supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', userId);

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createSocialAccount = async (userId, type, username) => {
  const { data, error } = await supabase
    .from('social_accounts')
    .insert([{ user_id: userId, type, username }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteSocialAccount = async (accountId) => {
  const { error } = await supabase
    .from('social_accounts')
    .delete()
    .eq('id', accountId);

  if (error) throw error;
};

// ============ CATEGORIES ============
export const getCategories = async (userId) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createCategory = async (userId, name) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ user_id: userId, name }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCategory = async (categoryId) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw error;
};