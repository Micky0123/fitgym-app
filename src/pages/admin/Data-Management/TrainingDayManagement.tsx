import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { trainingDayApi } from '../../../lib/api';
import { TrainingDayOption } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const TrainingDayOptionManagement: React.FC = () => {
  const [items, setItems] = useState<TrainingDayOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<TrainingDayOption | null>(null);
  const [editName, setEditName] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await trainingDayApi.getAll();
      setItems(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await trainingDayApi.create({ name: newName });
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
      await trainingDayApi.update(editing.trainingDaysId, { ...editing, name: editName });
      setEditing(null);
      await fetchData();
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) return;
    try {
      await trainingDayApi.delete(id);
      await fetchData();
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">ניהול אופציות ימי אימון</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus className="h-4 w-4" />} disabled={isAdding}>
            הוסף אופציה
          </Button>
        </div>

        {error && <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">{error}</div>}

        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="שם האופציה" fullWidth autoFocus />
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
              <li key={item.trainingDaysId} className="px-4 py-4">
                {editing && editing.trainingDaysId === item.trainingDaysId ? (
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

export default TrainingDayOptionManagement;
