// DeviceMuscleEdgeManagement.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, X, RefreshCcw } from 'lucide-react';
import { deviceMuscleEdgeApi } from '../../../lib/api';
import { Card } from '../../../components/ui/card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { formatApiError } from '../../../lib/utils';

const DeviceMuscleEdgeManagement: React.FC = () => {
  const [edges, setEdges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [muscleId, setMuscleId] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await deviceMuscleEdgeApi.getAll();
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
    if (!deviceId || !muscleId) return;
    try {
      await deviceMuscleEdgeApi.create({ deviceId: +deviceId, muscleId: +muscleId });
      setDeviceId('');
      setMuscleId('');
      setIsAdding(false);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('למחוק קשת זו?')) return;
    try {
      await deviceMuscleEdgeApi.delete(id);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleGenerate = async () => {
    try {
      await deviceMuscleEdgeApi.generateGraphEdges();
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow rounded-lg max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">ניהול קשתות מכשיר ↔ שריר</h2>
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
              <Input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="מזהה מכשיר" />
              <Input value={muscleId} onChange={(e) => setMuscleId(e.target.value)} placeholder="מזהה שריר" />
              <Button onClick={handleAdd} icon={<Save className="w-4 h-4" />} disabled={!deviceId || !muscleId}>
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
          {/* {isLoading ? (
            <p>טוען...</p>
          ) : edges.length === 0 ? (
            <p className="text-muted-foreground">אין קשתות להצגה</p>
          ) : (
            <ul className="space-y-2">
              {edges.map((edge) => (
                <li key={edge.edgeId} className="flex justify-between items-center border-b pb-2">
                  <span>🔗 מכשיר <strong>{edge.deviceId}</strong> ⬅ שריר <strong>{edge.muscleId}</strong></span>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(edge.edgeId)} icon={<Trash2 className="w-4 h-4" />}>
                    מחק
                  </Button>
                </li>
              ))}
            </ul>
          )} */}
          {isLoading ? (
            <p>טוען...</p>
          ) : edges.length === 0 ? (
            <p className="text-muted-foreground">אין קשתות להצגה</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                edges.reduce((acc, edge) => {
                  acc[edge.deviceId] = acc[edge.deviceId] || [];
                  acc[edge.deviceId].push(edge);
                  return acc;
                }, {} as Record<number, any[]>)
              ).map(([deviceId, edgesForDevice]) => {
                const edgesArr = edgesForDevice as any[];
                return (
                  <Card key={deviceId} className="p-4 border shadow-md">
                    <h4 className="text-lg font-bold mb-2">🖥 מכשיר #{deviceId}</h4>
                    <ul className="space-y-2">
                      {edgesArr.map((edge) => (
                        <li key={edge.edgeId} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span>💪 שריר #{edge.muscleId}</span>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(edge.edgeId)}
                            icon={<Trash2 className="w-4 h-4" />}
                          >
                            מחק
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          )}

        </Card>
      </div>
    </motion.div>
  );
};

export default DeviceMuscleEdgeManagement;

