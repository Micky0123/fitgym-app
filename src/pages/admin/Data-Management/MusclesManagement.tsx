import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { muscleApi } from '../../../lib/api';
import { Muscle } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const MusclesManagement: React.FC = () => {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMuscleName, setNewMuscleName] = useState('');
  const [editingMuscle, setEditingMuscle] = useState<Muscle | null>(null);
  const [editName, setEditName] = useState('');

  const fetchMuscles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await muscleApi.getAll();
      setMuscles(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMuscles();
  }, []);

  const handleAddMuscle = async () => {
    if (!newMuscleName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await muscleApi.create({ muscleName: newMuscleName });
      setNewMuscleName('');
      setIsAdding(false);
      await fetchMuscles();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMuscle = async () => {
    if (!editingMuscle || !editName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await muscleApi.update(editingMuscle.muscleId, {
        ...editingMuscle,
        muscleName: editName,
      });
      setEditingMuscle(null);
      await fetchMuscles();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMuscle = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק שריר זה?')) return;

    try {
      setIsLoading(true);
      setError(null);
      await muscleApi.delete(id);
      await fetchMuscles();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (muscle: Muscle) => {
    setEditingMuscle(muscle);
    setEditName(muscle.muscleName);
  };

  const cancelEditing = () => {
    setEditingMuscle(null);
  };

  if (isLoading && muscles.length === 0) {
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
          <h2 className="text-xl font-medium text-gray-900">ניהול שרירים</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף שריר
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
                value={newMuscleName}
                onChange={(e) => setNewMuscleName(e.target.value)}
                placeholder="שם השריר"
                fullWidth
                autoFocus
              />
              <Button
                onClick={handleAddMuscle}
                icon={<Save className="h-4 w-4" />}
                disabled={!newMuscleName.trim()}
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
          {muscles.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו שרירים
            </li>
          ) : (
            muscles.map((muscle) => (
              <li key={muscle.muscleId} className="px-4 py-4">
                {editingMuscle && editingMuscle.muscleId === muscle.muscleId ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                    <Button
                      onClick={handleEditMuscle}
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
                    <span className="text-gray-900">{muscle.muscleName}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(muscle)}
                        icon={<Edit className="h-4 w-4" />}
                      >
                        ערוך
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteMuscle(muscle.muscleId)}
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

export default MusclesManagement;