import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, X, RefreshCcw } from 'lucide-react';
import { muscleEdgeApi } from '../../../lib/api';
import { Card } from '../../../components/ui/card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { formatApiError } from '../../../lib/utils';

const MuscleEdgeManagement: React.FC = () => {
  const [edges, setEdges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [muscleId1, setMuscleId1] = useState('');
  const [muscleId2, setMuscleId2] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await muscleEdgeApi.getAll();
      setEdges(data);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!muscleId1 || !muscleId2) return;
    try {
      await muscleEdgeApi.create({ muscleId1: +muscleId1, muscleId2: +muscleId2 });
      setMuscleId1('');
      setMuscleId2('');
      setIsAdding(false);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('למחוק קשת זו?')) return;
    try {
      await muscleEdgeApi.delete(id);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleGenerate = async () => {
    try {
      await muscleEdgeApi.generateMuscleEdges();
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow rounded-lg max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">ניהול קשתות בין שרירים</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus className="h-4 w-4" />} disabled={isAdding}>
            הוסף קשת
          </Button>
        </div>

        {/* <Button className="mb-4" onClick={handleGenerate}>
          <RefreshCcw className="w-4 h-4 mr-2" /> הפק אוטומטית
        </Button> */}

        {error && <div className="text-red-700 bg-red-50 p-3 rounded mb-4 text-sm">{error}</div>}

        {isAdding && (
          <div className="bg-blue-50 p-4 border border-blue-200 rounded mb-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input value={muscleId1} onChange={(e) => setMuscleId1(e.target.value)} placeholder="מזהה שריר 1" />
              <Input value={muscleId2} onChange={(e) => setMuscleId2(e.target.value)} placeholder="מזהה שריר 2" />
              <Button onClick={handleAdd} icon={<Save className="w-4 h-4" />} disabled={!muscleId1 || !muscleId2}>
                שמור
              </Button>
              <Button variant="ghost" onClick={() => setIsAdding(false)} icon={<X className="w-4 h-4" />}>
                ביטול
              </Button>
            </div>
          </div>
        )}

        <Card className="p-4">
          <h3 className="text-xl mb-4">רשימת קשתות</h3>

          {isLoading ? (
            <p>טוען...</p>
          ) : edges.length === 0 ? (
            <p className="text-muted-foreground">אין קשתות להצגה</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                edges.reduce<Record<number, any[]>>((acc, edge) => {
                  acc[edge.muscleId1] = acc[edge.muscleId1] || [];
                  acc[edge.muscleId1].push(edge);
                  return acc;
                }, {})
              ).map(([muscleId, connections]) => (
                <Card key={muscleId} className="p-4 border shadow-md">
                  <h4 className="text-lg font-bold mb-2">💪 קשתות משריר #{muscleId}</h4>
                  <ul className="space-y-2">
                    {(connections as any[]).map((edge) => (
                      <li key={edge.muscleEdgeId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span>➡ אל שריר #{edge.muscleId2}</span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(edge.muscleEdgeId)}
                          icon={<Trash2 className="w-4 h-4" />}
                        >
                          מחק
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}

        </Card>
      </div>
    </motion.div>
  );
};

export default MuscleEdgeManagement;
