// src/components/Settings/CategorySettings.js
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { createCategory, deleteCategory } from '../../services/airdropService';

const CategorySettings = ({ userId, categories, onUpdate, darkMode }) => {
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Category name is required!');
      return;
    }

    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      alert('Kategori sudah ada!');
      return;
    }

    setLoading(true);
    try {
      await createCategory(userId, newCategory.trim());
      setNewCategory('');
      onUpdate(); // Refresh data
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.message.includes('duplicate')) {
        alert('Kategori sudah ada!');
      } else {
        alert('Failed to add category');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (window.confirm(`Yakin mau hapus kategori "${categoryName}"?`)) {
      try {
        await deleteCategory(categoryId);
        onUpdate(); // Refresh data
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
  };

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        📁 Categories
      </h3>
      
      {/* Existing Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.length === 0 ? (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Belum ada kategori. Tambahkan kategori pertama!
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-purple-100'} px-3 py-2 rounded-lg`}
            >
              <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-purple-800'}`}>
                {category.name}
              </span>
              <button
                onClick={() => handleDeleteCategory(category.id, category.name)}
                className="text-red-600 hover:text-red-700"
                title="Delete category"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Category */}
      <div className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'} border-2 border-dashed p-4 rounded-lg`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            placeholder="New category name..."
            className={`flex-1 px-4 py-2 border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          />
          <button
            onClick={handleAddCategory}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Plus size={20} />
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
          Tekan Enter atau klik Add untuk menambah kategori
        </p>
      </div>
    </div>
  );
};

export default CategorySettings;