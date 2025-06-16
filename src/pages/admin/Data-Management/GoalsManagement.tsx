import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { goalApi } from '../../../lib/api';
import { Goal } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const GoalsManagement: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editName, setEditName] = useState('');

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await goalApi.getAll();
      setGoals(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (!newGoalName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await goalApi.create({ goalName: newGoalName });
      setNewGoalName('');
      setIsAdding(false);
      await fetchGoals();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditGoal = async () => {
    if (!editingGoal || !editName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await goalApi.update(editingGoal.goalId, { 
        ...editingGoal,
        goalName: editName
      });
      setEditingGoal(null);
      await fetchGoals();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGoal = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק מטרה זו?')) return;

    try {
      setIsLoading(true);
      setError(null);
      await goalApi.delete(id);
      await fetchGoals();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (goal: Goal) => {
    setEditingGoal(goal);
    setEditName(goal.goalName);
  };

  const cancelEditing = () => {
    setEditingGoal(null);
  };

  if (isLoading && goals.length === 0) {
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
          <h2 className="text-xl font-medium text-gray-900">ניהול מטרות</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף מטרה
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
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="שם המטרה"
                fullWidth
                autoFocus
              />
              <Button
                onClick={handleAddGoal}
                icon={<Save className="h-4 w-4" />}
                disabled={!newGoalName.trim()}
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
          {goals.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו מטרות
            </li>
          ) : (
            goals.map((goal) => (
              <li key={goal.goalId} className="px-4 py-4">
                {editingGoal && editingGoal.goalId === goal.goalId ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                    <Button
                      onClick={handleEditGoal}
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
                    <span className="text-gray-900">{goal.goalName}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(goal)}
                        icon={<Edit className="h-4 w-4" />}
                      >
                        ערוך
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteGoal(goal.goalId)}
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

export default GoalsManagement;