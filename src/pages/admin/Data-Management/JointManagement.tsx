// components/management/JointManagement.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { jointApi } from '../../../lib/api';
import { Joint } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const JointManagement: React.FC = () => {
  const [items, setItems] = useState<Joint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editing, setEditing] = useState<Joint | null>(null);
  const [editName, setEditName] = useState('');

  const fetchItems = async () => {
    try {
      const data = await jointApi.getAll();
      setItems(data);
    } catch (e) {
      setError(formatApiError(e));
    }
  };
  useEffect(() => { fetchItems(); }, []);

  const addItem = async () => {
    if (!newName.trim()) return;
    try {
      await jointApi.create({ jointName: newName });
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
      await jointApi.update(editing.JointId, { ...editing, jointName: editName });
      setEditing(null);
      fetchItems();
    } catch (e) {
      setError(formatApiError(e));
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm('האם למחוק את המפרק?')) return;
    try {
      await jointApi.delete(id);
      fetchItems();
    } catch (e) {
      setError(formatApiError(e));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">ניהול מפרקים</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus />} disabled={isAdding}>הוסף מפרק</Button>
        </div>

        {error && <div className="px-4 py-2 text-red-600 bg-red-50">{error}</div>}

        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y">
            <div className="flex items-center gap-2">
              <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="שם מפרק" fullWidth />
              <Button onClick={addItem} icon={<Save />} disabled={!newName.trim()}>שמור</Button>
              <Button onClick={() => setIsAdding(false)} icon={<X />} variant="ghost">ביטול</Button>
            </div>
          </div>
        )}

        <ul className="divide-y divide-gray-200">
          {items.length === 0 ? (
            <li className="p-4 text-center text-gray-500">לא נמצאו מפרקים</li>
          ) : items.map(item => (
            <li key={item.JointId} className="p-4 flex justify-between items-center">
              {editing?.JointId === item.JointId ? (
                <div className="flex items-center gap-2 w-full">
                  <Input value={editName} onChange={e => setEditName(e.target.value)} fullWidth />
                  <Button icon={<Save />} onClick={updateItem}>שמור</Button>
                  <Button icon={<X />} onClick={() => setEditing(null)} variant="ghost">ביטול</Button>
                </div>
              ) : (
                <>
                  <span>{item.JointName}</span>
                  <div className="flex gap-2">
                    <Button icon={<Edit />} onClick={() => { setEditing(item); setEditName(item.JointName ?? ''); }} variant="ghost" size="sm">ערוך</Button>
                    <Button icon={<Trash />} onClick={() => deleteItem(item.JointId)} variant="ghost" size="sm" className="text-red-600">מחק</Button>
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

export default JointManagement;
