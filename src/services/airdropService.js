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
  const { data, error } = await supabase
    .from('airdrops')
    .insert([{ ...airdropData, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAirdrop = async (airdropId, updates) => {
  const { data, error } = await supabase
    .from('airdrops')
    .update(updates)
    .eq('id', airdropId)
    .select()
    .single();

  if (error) throw error;
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