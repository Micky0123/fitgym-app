// components/management/FitnessLevelsManagement.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { fitnessLevelApi } from '../../../lib/api';
import { FitnessLevel } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const FitnessLevelsManagement: React.FC = () => {
  const [items, setItems] = useState<FitnessLevel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<FitnessLevel | null>(null);
  const [editName, setEditName] = useState('');

  const fetchItems = async () => {
    try {
      const data = await fitnessLevelApi.getAll();
      setItems(data);
    } catch (e) {
      setError(formatApiError(e));
    }
  };
  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!newName.trim()) return;
    try {
      await fitnessLevelApi.create({ fitnessLevelName: newName });
      setNewName('');
      setIsAdding(false);
      fetchItems();
    } catch (e) {
      setError(formatApiError(e));
    }
  };

  const updateItem = async () => {
    if (!editing || !editName.trim()) return;
    try {
      await fitnessLevelApi.update(editing.fitnessLevelId, { ...editing, fitnessLevelName: editName });
      setEditing(null);
      fetchItems();
    } catch (e) {
      setError(formatApiError(e));
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm('האם למחוק את רמת הכושר?')) return;
    try {
      await fitnessLevelApi.delete(id);
      fetchItems();
    } catch (e) {
      setError(formatApiError(e));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">ניהול רמות כושר</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus />} disabled={isAdding}>הוסף רמה</Button>
        </div>

        {error && <div className="px-4 py-2 text-red-600 bg-red-50">{error}</div>}

        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y">
            <div className="flex items-center gap-2">
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="שם רמת כושר" fullWidth />
              <Button onClick={addItem} icon={<Save />} disabled={!newName.trim()}>שמור</Button>
              <Button onClick={() => setIsAdding(false)} icon={<X />} variant="ghost">ביטול</Button>
            </div>
          </div>
        )}

        <ul className="divide-y divide-gray-200">
          {items.length === 0 ? (
            <li className="p-4 text-center text-gray-500">לא נמצאו רמות</li>
          ) : items.map(item => (
            <li key={item.fitnessLevelId} className="p-4 flex justify-between items-center">
              {editing?.fitnessLevelId === item.fitnessLevelId ? (
                <div className="flex items-center gap-2 w-full">
                  <Input value={editName} onChange={e => setEditName(e.target.value)} fullWidth />
                  <Button icon={<Save />} onClick={updateItem}>שמור</Button>
                  <Button icon={<X />} onClick={() => setEditing(null)} variant="ghost">ביטול</Button>
                </div>
              ) : (
                <>
                  <span>{item.fitnessLevelName}</span>
                  <div className="flex gap-2">
                    <Button icon={<Edit />} onClick={() => { setEditing(item); setEditName(item.fitnessLevelName); }} variant="ghost" size="sm">ערוך</Button>
                    <Button icon={<Trash />} onClick={() => deleteItem(item.fitnessLevelId)} variant="ghost" size="sm" className="text-red-600">מחק</Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default FitnessLevelsManagement;
