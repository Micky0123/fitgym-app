// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Edit, Trash, Save, X } from 'lucide-react';
// import Button from '../../components/ui/Button';
// import Input from '../../components/ui/Input';
// import { equipmentApi } from '../../lib/api';
// import { Equipment } from '../../types';
// import { formatApiError } from '../../lib/utils';

// const EquipmentManagement: React.FC = () => {
//   const [equipments, setEquipments] = useState<Equipment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [newEquipmentName, setNewEquipmentName] = useState('');
//   const [newQuantity, setNewQuantity] = useState(0);
//   const [newPrice, setNewPrice] = useState(0);
//   const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
//   const [editName, setEditName] = useState('');
//   const [editQuantity, setEditQuantity] = useState(0);
//   const [editPrice, setEditPrice] = useState(0);

//   const fetchEquipments = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await equipmentApi.getAll();
//       setEquipments(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEquipments();
//   }, []);

//   const handleAddEquipment = async () => {
//     if (!newEquipmentName.trim() || newQuantity <= 0 || newPrice <= 0) return;
    
//     try {
//       setIsLoading(true);
//       setError(null);
//       await equipmentApi.create({ 
//         equipmentName: newEquipmentName, 
//         quantity: newQuantity, 
//         price: newPrice 
//       });
//       setNewEquipmentName('');
//       setNewQuantity(0);
//       setNewPrice(0);
//       setIsAdding(false);
//       await fetchEquipments();
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditEquipment = async () => {
//     if (!editingEquipment || !editName.trim() || editQuantity <= 0 || editPrice <= 0) return;
    
//     try {
//       setIsLoading(true);
//       setError(null);
//       await equipmentApi.update(editingEquipment.EquipmentId, { 
//         ...editingEquipment,
//         equipmentName: editName,
//         quantity: editQuantity,
//         price: editPrice
//       });
//       setEditingEquipment(null);
//       await fetchEquipments();
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteEquipment = async (id: number) => {
//     if (!confirm('האם אתה בטוח שברצונך למחוק ציוד זה?')) return;
    
//     try {
//       setIsLoading(true);
//       setError(null);
//       await equipmentApi.delete(id);
//       await fetchEquipments();
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const startEditing = (equipment: Equipment) => {
//     setEditingEquipment(equipment);
//     setEditName(equipment.EquipmentName);
//   };

//   const cancelEditing = () => {
//     setEditingEquipment(null);
//   };

//   if (isLoading && equipments.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
//           <h2 className="text-xl font-medium text-gray-900">ניהול ציוד</h2>
//           <Button
//             onClick={() => setIsAdding(true)}
//             icon={<Plus className="h-4 w-4" />}
//             disabled={isAdding}
//           >
//             הוסף ציוד
//           </Button>
       
// {/*         
//         <Button
//             className="bg-ai-accent hover:bg-ai-secondary text-black"
//             onClick={() => setIsAdding(true)}
//             icon={<Plus className="h-4 w-4" />}
//             disabled={isAdding}
//       >
//             הוסף ציוד
//         </Button> */}
//         </div>
//         {error && (
//           <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
//             {error}
//           </div>
//         )}
        
//         {isAdding && (
//           <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
//             <div className="flex items-center space-x-2 space-x-reverse">
//               <Input
//                 value={newEquipmentName}
//                 onChange={(e) => setNewEquipmentName(e.target.value)}
//                 placeholder="שם הציוד"
//                 fullWidth
//                 autoFocus
//               />
//               <Input
//                 type="number"
//                 value={newQuantity}
//                 onChange={(e) => setNewQuantity(parseInt(e.target.value))}
//                 placeholder="כמות"
//                 fullWidth
//               />
//               <Input
//                 type="number"
//                 value={newPrice}
//                 onChange={(e) => setNewPrice(parseFloat(e.target.value))}
//                 placeholder="מחיר"
//                 fullWidth
//               />
//               <Button
//                 onClick={handleAddEquipment}
//                 icon={<Save className="h-4 w-4" />}
//                 disabled={!newEquipmentName.trim() || newQuantity <= 0 || newPrice <= 0}
//               >
//                 שמור
//               </Button>
//               <Button
//                 variant="ghost"
//                 onClick={() => setIsAdding(false)}
//                 icon={<X className="h-4 w-4" />}
//               >
//                 ביטול
//               </Button>
//             </div>
//           </div>
//         )}
        
//         <ul className="divide-y divide-gray-200">
//           {equipments.length === 0 ? (
//             <li className="px-4 py-4 text-gray-500 text-center">
//               לא נמצאו פריטים
//             </li>
//           ) : (
//             equipments.map((equipment) => (
//               <li key={equipment.EquipmentId} className="px-4 py-4">
//                 {editingEquipment && editingEquipment.EquipmentId === equipment.EquipmentId ? (
//                   <div className="flex items-center space-x-2 space-x-reverse">
//                     <Input
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       fullWidth
//                       autoFocus
//                     />
//                     <Input
//                       type="number"
//                       value={editQuantity}
//                       onChange={(e) => setEditQuantity(parseInt(e.target.value))}
//                       fullWidth
//                     />
//                     <Input
//                       type="number"
//                       value={editPrice}
//                       onChange={(e) => setEditPrice(parseFloat(e.target.value))}
//                       fullWidth
//                     />
//                     <Button
//                       onClick={handleEditEquipment}
//                       icon={<Save className="h-4 w-4" />}
//                       disabled={!editName.trim() || editQuantity <= 0 || editPrice <= 0}
//                     >
//                       שמור
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       onClick={cancelEditing}
//                       icon={<X className="h-4 w-4" />}
//                     >
//                       ביטול
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="flex justify-between items-center">
//                     <div className="flex space-x-2 space-x-reverse">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => startEditing(equipment)}
//                         icon={<Edit className="h-4 w-4" />}
//                       >
//                         ערוך
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-red-600 hover:text-red-800"
//                         onClick={() => handleDeleteEquipment(equipment.EquipmentId)}
//                         icon={<Trash className="h-4 w-4" />}
//                       >
//                         מחק
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default EquipmentManagement;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { equipmentApi } from '../../../lib/api';
import { Equipment } from '../../../types';
import { formatApiError } from '../../../lib/utils';

const EquipmentManagement: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [editName, setEditName] = useState('');

//   const fetchEquipments = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await equipmentApi.getAll();
//       setEquipments(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };
  const fetchEquipments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await equipmentApi.getAll();
      console.log('API Response:', data); // Debugging
      setEquipments(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleAddEquipment = async () => {
    if (!newEquipmentName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await equipmentApi.create({ equipmentName: newEquipmentName });
      setNewEquipmentName('');
      setIsAdding(false);
      await fetchEquipments();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditEquipment = async () => {
    if (!editingEquipment || !editName.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await equipmentApi.update(editingEquipment.equipmentId, { 
        ...editingEquipment,
        equipmentName: editName
      });
      setEditingEquipment(null);
      await fetchEquipments();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEquipment = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק ציוד זה?')) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await equipmentApi.delete(id);
      await fetchEquipments();
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setEditName(equipment.equipmentName);
  };

  const cancelEditing = () => {
    setEditingEquipment(null);
  };

  if (isLoading && equipments.length === 0) {
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
          <h2 className="text-xl font-medium text-gray-900">ניהול ציוד</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף ציוד
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
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
                placeholder="שם הציוד"
                fullWidth
                autoFocus
              />
              <Button
                onClick={handleAddEquipment}
                icon={<Save className="h-4 w-4" />}
                disabled={!newEquipmentName.trim()}
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
          {equipments.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו פריטים
            </li>
          ) : (
            equipments.map((equipment) => (
              <li key={equipment.equipmentId} className="px-4 py-4">
                {editingEquipment && editingEquipment.equipmentId === equipment.equipmentId ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />
                    <Button
                      onClick={handleEditEquipment}
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
                    <span className="text-gray-900">{equipment.equipmentName}</span>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(equipment)}
                        icon={<Edit className="h-4 w-4" />}
                      >
                        ערוך
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteEquipment(equipment.equipmentId)}
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

export default EquipmentManagement;