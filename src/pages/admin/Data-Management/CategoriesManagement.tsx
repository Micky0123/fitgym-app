import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { categoryApi } from '../../../lib/api';
import { Category } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const CategoriesManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await categoryApi.create({ categoryName: newCategoryName });
      setNewCategoryName('');
      setIsAdding(false);
      await fetchCategories();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategory || !editName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await categoryApi.update(editingCategory.categoryId, { 
        ...editingCategory,
        categoryName: editName
      });
      setEditingCategory(null);
      await fetchCategories();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await categoryApi.delete(id);
      await fetchCategories();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.categoryName);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  if (isLoading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">ניהול קטגוריות</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף קטגוריה
          </Button>
        </div>
        
        {error && (
          <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="שם הקטגוריה"
                fullWidth
                autoFocus
              />
              <Button
                onClick={handleAddCategory}
                icon={<Save className="h-4 w-4" />}
                disabled={!newCategoryName.trim()}
              >
                שמור
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsAdding(false)}
                icon={<X className="h-4 w-4" />}
              >
                ביטול
              </Button>
            </div>
          </div>
        )}
        
        <ul className="divide-y divide-gray-200">
          {categories.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו קטגוריות
            </li>
          ) : (
            categories.map((category) => (
              <li key={category.categoryId} className="px-4 py-4">
                {editingCategory && editingCategory.categoryId === category.categoryId ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                    <Button
                      onClick={handleEditCategory}
                      icon={<Save className="h-4 w-4" />}
                      disabled={!editName.trim()}
                    >
                      שמור
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={cancelEditing}
                      icon={<X className="h-4 w-4" />}
                    >
                      ביטול
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{category.categoryName}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(category)}
                        icon={<Edit className="h-4 w-4" />}
                      >
                        ערוך
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteCategory(category.categoryId)}
                        icon={<Trash className="h-4 w-4" />}
                      >
                        מחק
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default CategoriesManagement;