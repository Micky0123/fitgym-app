import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, X, RefreshCcw } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { graphEdgeApi } from '../../../lib/api';
import { GraphEdge } from '../../../types';
import { formatApiError } from '../../../lib/utils';


const GraphManagement: React.FC = () => {
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [device1Id, setDevice1Id] = useState('');
  const [device2Id, setDevice2Id] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await graphEdgeApi.getAll();
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
    if (!device1Id.trim() || !device2Id.trim()) return;
    try {
      await graphEdgeApi.create({
        device1Id: parseInt(device1Id),
        device2Id: parseInt(device2Id),
      });
      setDevice1Id('');
      setDevice2Id('');
      setIsAdding(false);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('האם למחוק את הקשת הזו?')) return;
    try {
      await graphEdgeApi.delete(id);
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const handleGenerate = async () => {
    try {
      await graphEdgeApi.generateGraphEdges();
      await fetchData();
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">ניהול קשתות גרף</h2>
          <Button onClick={() => setIsAdding(true)} icon={<Plus className="h-4 w-4" />} disabled={isAdding}>
            הוסף קשת
          </Button>
        </div>

        {/* <Button className="mb-4" onClick={handleGenerate}>
          <RefreshCcw className="w-4 h-4 mr-2" /> הפק קשתות אוטומטית
        </Button> */}

        {error && <div className="px-4 py-3 bg-red-50 text-red-700 text-sm mb-4">{error}</div>}

        {isAdding && (
          <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded">
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <Input
                value={device1Id}
                onChange={(e) => setDevice1Id(e.target.value)}
                placeholder="מכשיר 1"
                className="w-full sm:w-auto"
              />
              <Input
                value={device2Id}
                onChange={(e) => setDevice2Id(e.target.value)}
                placeholder="מכשיר 2"
                className="w-full sm:w-auto"
              />
              <Button onClick={handleAdd} icon={<Save className="h-4 w-4" />} disabled={!device1Id || !device2Id}>
                שמור
              </Button>
              <Button variant="ghost" onClick={() => setIsAdding(false)} icon={<X className="h-4 w-4" />}>
                ביטול
              </Button>
            </div>
          </div>
        )}

        <Card className="p-4">
          <h3 className="text-xl font-medium mb-4">רשימת קשתות</h3>
          {/* {isLoading ? (
            <p>טוען...</p>
          ) : edges.length === 0 ? (
            <p className="text-muted-foreground">לא נמצאו קשתות</p>
          ) : (
            <ul className="space-y-2">
              {edges.map((edge) => (
                <li key={edge.id} className="flex justify-between items-center border-b pb-2">
                  <span>
                    🔗 מכשיר <strong>{edge.device1Id}</strong> ⬅ מכשיר <strong>{edge.device2Id}</strong>
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(edge.id)}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    מחק
                  </Button>
                </li>
              ))}
            </ul>
          )} */}
          {isLoading ? (
            <p>טוען...</p>
          ) : edges.length === 0 ? (
            <p className="text-muted-foreground">לא נמצאו קשתות</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                edges.reduce((acc, edge) => {
                  acc[edge.device1Id] = acc[edge.device1Id] || [];
                  acc[edge.device1Id].push(edge);
                  return acc;
                }, {} as Record<number, any[]>)
              ).map(([deviceId, connections]) => (
                <Card key={deviceId} className="p-4 border shadow-md">
                  <h4 className="text-lg font-bold mb-2">🖥 חיבורים ממכשיר #{deviceId}</h4>
                  <ul className="space-y-2">
                    {connections.map((edge) => (
                      <li key={edge.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span>➡ למכשיר #{edge.device2Id}</span>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(edge.id)}
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

export default GraphManagement;
