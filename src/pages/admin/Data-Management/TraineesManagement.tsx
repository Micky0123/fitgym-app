import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { traineeApi } from '../../../lib/api';
import { Trainee } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const TraineesManagement: React.FC = () => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTraineeName, setNewTraineeName] = useState('');
  const [editingTrainee, setEditingTrainee] = useState<Trainee | null>(null);
  const [editName, setEditName] = useState('');
  const [expandedTrainee, setExpandedTrainee] = useState<number | null>(null);

  const fetchTrainees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await traineeApi.getAll();
      setTrainees(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainees();
  }, []);

  //   const handleAddTrainee = async () => { ... }

  const handleEditTrainee = async () => {
    if (!editingTrainee || !editName.trim()) return;
    try {
      setIsLoading(true);
      setError(null);
      await traineeApi.update(editingTrainee.traineeId, {
        ...editingTrainee,
        traineeName: editName,
      });
      setEditingTrainee(null);
      await fetchTrainees();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrainee = async (id: number) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק מתאמן זה?')) return;
    try {
      setIsLoading(true);
      setError(null);
      await traineeApi.delete(id);
      await fetchTrainees();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (trainee: Trainee) => {
    setEditingTrainee(trainee);
    setEditName(trainee.traineeName ?? '');
  };

  const cancelEditing = () => {
    setEditingTrainee(null);
  };

  const toggleExpand = (id: number) => {
    setExpandedTrainee(expandedTrainee === id ? null : id);
  };

  if (isLoading && trainees.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">ניהול מתאמנים</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף מתאמן
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
                value={newTraineeName}
                onChange={(e) => setNewTraineeName(e.target.value)}
                placeholder="שם המתאמן"
                fullWidth
                autoFocus
              />
              {/* <Button
                onClick={handleAddTrainee}
                icon={<Save className="h-4 w-4" />}
                disabled={!newTraineeName.trim()}
              >
                שמור
              </Button> */}
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
          {trainees.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו מתאמנים
            </li>
          ) : (
            trainees.map((trainee) => (
              <React.Fragment key={trainee.traineeId}>
                <li className="px-4 py-4">
                  {editingTrainee && editingTrainee.traineeId === trainee.traineeId ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                        autoFocus
                      />
                      <Button
                        onClick={handleEditTrainee}
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
                      <div className="flex items-center">
                        <button
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => toggleExpand(trainee.traineeId)}
                        >
                          {expandedTrainee === trainee.traineeId ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-900">{trainee.traineeName ?? ''}</span>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(trainee)}
                          icon={<Edit className="h-4 w-4" />}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteTrainee(trainee.traineeId)}
                          icon={<Trash className="h-4 w-4" />}
                        >
                          מחק
                        </Button>
                      </div>
                    </div>
                  )}
                </li>
                {expandedTrainee === trainee.traineeId && (
                  <li className="bg-gray-50 px-4 pb-4 pt-2">
                    <ul className="space-y-1 text-right text-sm">
                      <li><b>תעודת זהות:</b> {trainee.idnumber}</li>
                      <li><b>גיל:</b> {trainee.age}</li>
                      <li><b>משקל:</b> {trainee.traineeWeight} ק"ג</li>
                      <li><b>גובה:</b> {trainee.traineeHeight} ס"מ</li>
                      <li><b>מין:</b> {trainee.gender === 1 ? "זכר" : "נקבה"}</li>
                      <li><b>טלפון:</b> {trainee.phone}</li>
                      <li><b>אימייל:</b> {trainee.email}</li>
                      <li><b>הרשאות ניהול:</b> {trainee.isAdmin ? "כן" : "לא"}</li>
                      <li><b>סיסמה:</b>{trainee.password}</li>
                      <li><b>תאריך כניסה:</b> {trainee.loginDateTime ? new Date(trainee.loginDateTime).toLocaleString() : ""}</li>
                    </ul>
                  </li>
                )}
              </React.Fragment>
            ))
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default TraineesManagement;