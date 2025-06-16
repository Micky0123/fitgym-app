import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { trainingDurationApi } from '../../../lib/api';
import { TrainingDuration } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const TrainingDurationManagement: React.FC = () => {
  const [items, setItems] = useState<TrainingDuration[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<TrainingDuration | null>(null);
  const [editName, setEditName] = useState('');

  const fetchData = async () => {
    try {
      setError(null);
      const data = await trainingDurationApi.getAll();
      setItems(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await trainingDurationApi.create({ name: newName });
      setNewName('');
      setIsAdding(false);
      await fetchData();
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  const handleEdit = async () => {
    if (!editing || !editName.trim()) return;
    try {
      await trainingDurationApi.update(editing.TrainingDurationId, { ...editing, name: editName });
      setEditing(null);
      await fetchData();
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) return;
    try {
      await trainingDurationApi.delete(id);
      await fetchData();
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">ניהול משכי אימון</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus className="h-4 w-4" />} disabled={isAdding}>
            הוסף משך
          </Button>
        </div>

        {error && <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">{error}</div>}

        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="שם המשך" fullWidth autoFocus />
              <Button onClick={handleAdd} icon={<Save className="h-4 w-4" />} disabled={!newName.trim()}>
                שמור
              </Button>
              <Button variant="ghost" onClick={() => setIsAdding(false)} icon={<X className="h-4 w-4" />}>
                ביטול
              </Button>
            </div>
          </div>
        )}

        <ul className="divide-y divide-gray-200">
          {items.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">לא נמצאו נתונים</li>
          ) : (
            items.map((item) => (
              <li key={item.TrainingDurationId} className="px-4 py-4">
                {editing && editing.TrainingDurationId === item.TrainingDurationId ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} fullWidth autoFocus />
                    <Button onClick={handleEdit} icon={<Save className="h-4 w-4" />} disabled={!editName.trim()}>
                      שמור
                    </Button>
                    <Button variant="ghost" onClick={() => setEditing(null)} icon={<X className="h-4 w-4" />}>
                      ביטול
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">{item.timeTrainingDuration}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setEditName(String(item.timeTrainingDuration)); }} icon={<Edit className="h-4 w-4" />}>
                        ערוך
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800" onClick={() => handleDelete(item.TrainingDurationId)} icon={<Trash className="h-4 w-4" />}>
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

export default TrainingDurationManagement;
