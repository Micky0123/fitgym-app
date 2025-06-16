import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { exerciseApi, categoryApi } from '../../../lib/api';
import { Exercise, Category } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const ExercisesManagement: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [editName, setEditName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);


  const fetchExercises = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await exerciseApi.getAll();
      setExercises(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };


  useEffect(() => {
    fetchExercises();
    fetchCategories();
  }, []);

  const handleAddExercise = async () => {
    if (!newExerciseName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // First create the exercise
      const newExercise = await exerciseApi.create({ exerciseName: newExerciseName });
      
      // Then add it to the selected category if one is selected
      if (selectedCategory) {
        await exerciseApi.addToCategory(parseInt(selectedCategory), newExercise);
      }
      
      setNewExerciseName('');
      setSelectedCategory('');
      setIsAdding(false);
      await fetchExercises();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExercise = async () => {
    if (!editingExercise || !editName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await exerciseApi.update(editingExercise.exerciseId, { 
        ...editingExercise,
        exerciseName: editName
      });
      setEditingExercise(null);
      await fetchExercises();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExercise = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await exerciseApi.delete(id);
      await fetchExercises();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setEditName(exercise.exerciseName);
  };

  const cancelEditing = () => {
    setEditingExercise(null);
  };

  const toggleExerciseDetails = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const fetchExerciseDetails = async (id: number) => {
    try {
      const categoryIds = await exerciseApi.getCategoryIds(id);
      // Update the exercise with its category IDs
      setExercises(exercises.map(ex => 
        ex.exerciseId === id ? { ...ex, categoryIds } : ex
      ));
    } catch (error) {
      console.error('Failed to fetch exercise details:', error);
    }
  };
  // const fetchExerciseDetails = async (id: number) => {
  //   try {
  //     const { categoryIds, muscleIds } = await exerciseApi.getDetails(id); // קריאה ל-API שמחזירה קטגוריות ושרירים
  //     setExercises(exercises.map(ex => 
  //       ex.exerciseId === id ? { ...ex, categoryIds, muscleIds } : ex
  //     ));
  //   } catch (error) {
  //     console.error('Failed to fetch exercise details:', error);
  //   }
  // };


  const filteredExercises = exercises.filter(exercise => 
    exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && exercises.length === 0) {
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
          <h2 className="text-xl font-medium text-gray-900">ניהול תרגילים</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף תרגיל
          </Button>
        </div>
        
        {error && (
          <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש תרגילים..."
              fullWidth
            />
          </div>
        </div>
        
        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
            <div className="space-y-3">
              <Input
                label="שם התרגיל"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                placeholder="הזן שם תרגיל"
                fullWidth
                autoFocus
              />
              
              <Select
                label="קטגוריה"
                options={categories.map(category => ({ id: category.categoryId, name: category.categoryName }))}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                fullWidth
              />
              
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  onClick={handleAddExercise}
                  icon={<Save className="h-4 w-4" />}
                  disabled={!newExerciseName.trim()}
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
          </div>
        )}
        
        <ul className="divide-y divide-gray-200">
          {filteredExercises.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו תרגילים
            </li>
          ) : (
            filteredExercises.map((exercise) => (
              <li key={exercise.exerciseId} className="px-4 py-4">
                {editingExercise && editingExercise.exerciseId === exercise.exerciseId ? (
                  <div className="space-y-3">
                    <Input
                      label="שם התרגיל"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button
                        onClick={handleEditExercise}
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
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            toggleExerciseDetails(exercise.exerciseId);
                            if (expandedExercise !== exercise.exerciseId) {
                              fetchExerciseDetails(exercise.exerciseId);
                            }
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          {expandedExercise === exercise.exerciseId ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-900">{exercise.exerciseName}</span>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(exercise)}
                          icon={<Edit className="h-4 w-4" />}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteExercise(exercise.exerciseId)}
                          icon={<Trash className="h-4 w-4" />}
                        >
                          מחק
                        </Button>
                      </div>
                    </div>
                    
                    {expandedExercise === exercise.exerciseId && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">קטגוריות:</h4>
                        {exercise.categoryIds && exercise.categoryIds.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {exercise.categoryIds.map(categoryId => {
                              const category = categories.find(c => c.categoryId === categoryId);
                              return category ? (
                                <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {category.categoryName}
                                </span>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExercisesManagement;