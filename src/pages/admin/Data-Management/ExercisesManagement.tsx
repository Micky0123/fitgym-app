// // // import React, { useState, useEffect } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
// // // import Button from '../../../components/ui/Button';
// // // import Input from '../../../components/ui/Input';
// // // import Select from '../../../components/ui/Select';
// // // import { exerciseApi, categoryApi } from '../../../lib/api';
// // // import { Exercise, Category } from '../../../types';
// // // import { formatApiError } from '../../../lib/utils';

// // // const ExercisesManagement: React.FC = () => {
// // //   const [exercises, setExercises] = useState<Exercise[]>([]);
// // //   const [categories, setCategories] = useState<Category[]>([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [isAdding, setIsAdding] = useState(false);
// // //   const [newExerciseName, setNewExerciseName] = useState('');
// // //   const [selectedCategory, setSelectedCategory] = useState<string>('');
// // //   const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
// // //   const [editName, setEditName] = useState('');
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [expandedExercise, setExpandedExercise] = useState<number | null>(null);


// // //   const fetchExercises = async () => {
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);
// // //       const data = await exerciseApi.getAll();
// // //       setExercises(data);
// // //     } catch (error) {
// // //       setError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const fetchCategories = async () => {
// // //     try {
// // //       const data = await categoryApi.getAll();
// // //       setCategories(data);
// // //     } catch (error) {
// // //       setError(formatApiError(error));
// // //     }
// // //   };


// // //   useEffect(() => {
// // //     fetchExercises();
// // //     fetchCategories();
// // //   }, []);

// // //   const handleAddExercise = async () => {
// // //     if (!newExerciseName.trim()) return;
    
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);
      
// // //       // First create the exercise
// // //       const newExercise = await exerciseApi.create({ exerciseName: newExerciseName });
      
// // //       // Then add it to the selected category if one is selected
// // //       if (selectedCategory) {
// // //         await exerciseApi.addToCategory(parseInt(selectedCategory), newExercise);
// // //       }
      
// // //       setNewExerciseName('');
// // //       setSelectedCategory('');
// // //       setIsAdding(false);
// // //       await fetchExercises();
// // //     } catch (error) {
// // //       setError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleEditExercise = async () => {
// // //     if (!editingExercise || !editName.trim()) return;
    
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);
// // //       await exerciseApi.update(editingExercise.exerciseId, { 
// // //         ...editingExercise,
// // //         exerciseName: editName
// // //       });
// // //       setEditingExercise(null);
// // //       await fetchExercises();
// // //     } catch (error) {
// // //       setError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteExercise = async (id: number) => {
// // //     if (!confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) return;
    
// // //     try {
// // //       setIsLoading(true);
// // //       setError(null);
// // //       await exerciseApi.delete(id);
// // //       await fetchExercises();
// // //     } catch (error) {
// // //       setError(formatApiError(error));
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const startEditing = (exercise: Exercise) => {
// // //     setEditingExercise(exercise);
// // //     setEditName(exercise.exerciseName);
// // //   };

// // //   const cancelEditing = () => {
// // //     setEditingExercise(null);
// // //   };

// // //   const toggleExerciseDetails = (id: number) => {
// // //     setExpandedExercise(expandedExercise === id ? null : id);
// // //   };

// // //   const fetchExerciseDetails = async (id: number) => {
// // //     try {
// // //       const categoryIds = await exerciseApi.getCategoryIds(id);
// // //       // Update the exercise with its category IDs
// // //       setExercises(exercises.map(ex => 
// // //         ex.exerciseId === id ? { ...ex, categoryIds } : ex
// // //       ));
// // //     } catch (error) {
// // //       console.error('Failed to fetch exercise details:', error);
// // //     }
// // //   };
// // //   // const fetchExerciseDetails = async (id: number) => {
// // //   //   try {
// // //   //     const { categoryIds, muscleIds } = await exerciseApi.getDetails(id); // קריאה ל-API שמחזירה קטגוריות ושרירים
// // //   //     setExercises(exercises.map(ex => 
// // //   //       ex.exerciseId === id ? { ...ex, categoryIds, muscleIds } : ex
// // //   //     ));
// // //   //   } catch (error) {
// // //   //     console.error('Failed to fetch exercise details:', error);
// // //   //   }
// // //   // };


// // //   const filteredExercises = exercises.filter(exercise => 
// // //     exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   if (isLoading && exercises.length === 0) {
// // //     return (
// // //       <div className="flex justify-center items-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 20 }}
// // //       animate={{ opacity: 1, y: 0 }}
// // //       transition={{ duration: 0.5 }}
// // //     >
// // //       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
// // //         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
// // //           <h2 className="text-xl font-medium text-gray-900">ניהול תרגילים</h2>
// // //           <Button
// // //             onClick={() => setIsAdding(true)}
// // //             icon={<Plus className="h-4 w-4" />}
// // //             disabled={isAdding}
// // //           >
// // //             הוסף תרגיל
// // //           </Button>
// // //         </div>
        
// // //         {error && (
// // //           <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
// // //             {error}
// // //           </div>
// // //         )}

// // //         <div className="px-4 py-3 bg-gray-50 border-b">
// // //           <div className="flex items-center">
// // //             <Search className="h-5 w-5 text-gray-400 ml-2" />
// // //             <Input
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               placeholder="חיפוש תרגילים..."
// // //               fullWidth
// // //             />
// // //           </div>
// // //         </div>
        
// // //         {isAdding && (
// // //           <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
// // //             <div className="space-y-3">
// // //               <Input
// // //                 label="שם התרגיל"
// // //                 value={newExerciseName}
// // //                 onChange={(e) => setNewExerciseName(e.target.value)}
// // //                 placeholder="הזן שם תרגיל"
// // //                 fullWidth
// // //                 autoFocus
// // //               />
              
// // //               <Select
// // //                 label="קטגוריה"
// // //                 options={categories.map(category => ({ id: category.categoryId, name: category.categoryName }))}
// // //                 value={selectedCategory}
// // //                 onChange={(value) => setSelectedCategory(value)}
// // //                 fullWidth
// // //               />
              
// // //               <div className="flex justify-end space-x-2 space-x-reverse">
// // //                 <Button
// // //                   onClick={handleAddExercise}
// // //                   icon={<Save className="h-4 w-4" />}
// // //                   disabled={!newExerciseName.trim()}
// // //                 >
// // //                   שמור
// // //                 </Button>
// // //                 <Button
// // //                   variant="ghost"
// // //                   onClick={() => setIsAdding(false)}
// // //                   icon={<X className="h-4 w-4" />}
// // //                 >
// // //                   ביטול
// // //                 </Button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
        
// // //         <ul className="divide-y divide-gray-200">
// // //           {filteredExercises.length === 0 ? (
// // //             <li className="px-4 py-4 text-gray-500 text-center">
// // //               לא נמצאו תרגילים
// // //             </li>
// // //           ) : (
// // //             filteredExercises.map((exercise) => (
// // //               <li key={exercise.exerciseId} className="px-4 py-4">
// // //                 {editingExercise && editingExercise.exerciseId === exercise.exerciseId ? (
// // //                   <div className="space-y-3">
// // //                     <Input
// // //                       label="שם התרגיל"
// // //                       value={editName}
// // //                       onChange={(e) => setEditName(e.target.value)}
// // //                       fullWidth
// // //                       autoFocus
// // //                     />
// // //                     <div className="flex justify-end space-x-2 space-x-reverse">
// // //                       <Button
// // //                         onClick={handleEditExercise}
// // //                         icon={<Save className="h-4 w-4" />}
// // //                         disabled={!editName.trim()}
// // //                       >
// // //                         שמור
// // //                       </Button>
// // //                       <Button
// // //                         variant="ghost"
// // //                         onClick={cancelEditing}
// // //                         icon={<X className="h-4 w-4" />}
// // //                       >
// // //                         ביטול
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ) : (
// // //                   <>
// // //                     <div className="flex justify-between items-center">
// // //                       <div className="flex items-center">
// // //                         <button
// // //                           onClick={() => {
// // //                             toggleExerciseDetails(exercise.exerciseId);
// // //                             if (expandedExercise !== exercise.exerciseId) {
// // //                               fetchExerciseDetails(exercise.exerciseId);
// // //                             }
// // //                           }}
// // //                           className="ml-2 text-gray-500 hover:text-gray-700"
// // //                         >
// // //                           {expandedExercise === exercise.exerciseId ? (
// // //                             <ChevronUp className="h-5 w-5" />
// // //                           ) : (
// // //                             <ChevronDown className="h-5 w-5" />
// // //                           )}
// // //                         </button>
// // //                         <span className="text-gray-900">{exercise.exerciseName}</span>
// // //                       </div>
// // //                       <div className="flex space-x-2 space-x-reverse">
// // //                         <Button
// // //                           variant="ghost"
// // //                           size="sm"
// // //                           onClick={() => startEditing(exercise)}
// // //                           icon={<Edit className="h-4 w-4" />}
// // //                         >
// // //                           ערוך
// // //                         </Button>
// // //                         <Button
// // //                           variant="ghost"
// // //                           size="sm"
// // //                           className="text-red-600 hover:text-red-800"
// // //                           onClick={() => handleDeleteExercise(exercise.exerciseId)}
// // //                           icon={<Trash className="h-4 w-4" />}
// // //                         >
// // //                           מחק
// // //                         </Button>
// // //                       </div>
// // //                     </div>
                    
// // //                     {expandedExercise === exercise.exerciseId && (
// // //                       <div className="mt-3 pt-3 border-t border-gray-100">
// // //                         <h4 className="text-sm font-medium text-gray-500 mb-2">קטגוריות:</h4>
// // //                         {exercise.categoryIds && exercise.categoryIds.length > 0 ? (
// // //                           <div className="flex flex-wrap gap-2">
// // //                             {exercise.categoryIds.map(categoryId => {
// // //                               const category = categories.find(c => c.categoryId === categoryId);
// // //                               return category ? (
// // //                                 <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
// // //                                   {category.categoryName}
// // //                                 </span>
// // //                               ) : null;
// // //                             })}
// // //                           </div>
// // //                         ) : (
// // //                           <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
// // //                         )}
// // //                       </div>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </li>
// // //             ))
// // //           )}
// // //         </ul>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default ExercisesManagement;

// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
// // import Button from '../../../components/ui/Button';
// // import Input from '../../../components/ui/Input';
// // import Select from '../../../components/ui/Select';
// // import { exerciseApi, categoryApi, muscleApi, muscleTypeApi, sizeApi } from '../../../lib/api'; // ייבוא ה-API החדשים
// // import { Exercise, Category, Muscle, MuscleType, Size } from '../../../types'; // ייבוא הטיפוסים המעודכנים
// // import { formatApiError } from '../../../lib/utils';



// // const ExercisesManagement: React.FC = () => {
// //   const [exercises, setExercises] = useState<Exercise[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [muscleTypes, setMuscleTypes] = useState<MuscleType[]>([]); // סטייט לסוגי שרירים
// //   const [muscles, setMuscles] = useState<Muscle[]>([]); // סטייט לשרירים
// //   const [muscleGroups, setMuscleGroups] = useState<Size[]>([]); // סטייט לקבוצות שרירים
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [newExerciseName, setNewExerciseName] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState<string>('');
// //   const [selectedMuscleType, setSelectedMuscleType] = useState<string>(''); // סטייט לסוג שריר חדש
// //   const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>(''); // סטייט לקבוצת שריר חדשה
// //   const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]); // סטייט לשרירים חדשים
// //   const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
// //   const [editName, setEditName] = useState('');
// //   const [editSelectedCategory, setEditSelectedCategory] = useState<string>('');
// //   const [editSelectedMuscleType, setEditSelectedMuscleType] = useState<string>('');
// //   const [editSelectedMuscleGroup, setEditSelectedMuscleGroup] = useState<string>('');
// //   const [editSelectedMuscles, setEditSelectedMuscles] = useState<string[]>([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [expandedExercise, setExpandedExercise] = useState<number | null>(null);


// //   const fetchExercises = async () => {
// //     try {
// //       setIsLoading(true);
// //       setError(null);
// //       const data = await exerciseApi.getAll();
// //       setExercises(data);
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const data = await categoryApi.getAll();
// //       setCategories(data);
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     }
// //   };

// //   // פונקציה לטעינת סוגי שרירים
// //   const fetchMuscleTypes = async () => {
// //     try {
// //       const data = await muscleTypeApi.getAll();
// //       setMuscleTypes(data);
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     }
// //   };

// //   // פונקציה לטעינת שרירים
// //   const fetchMuscles = async () => {
// //     try {
// //       const data = await muscleApi.getAll();
// //       setMuscles(data);
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     }
// //   };

// //   // פונקציה לטעינת קבוצות שרירים
// //   const fetchMuscleGroups = async () => {
// //     try {
// //       const data = await sizeApi.getAll(); // נניח שזו נקודת קצה ל-MuscleGroup
// //       setMuscleGroups(data);
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     }
// //   };


// //   useEffect(() => {
// //     fetchExercises();
// //     fetchCategories();
// //     fetchMuscleTypes(); // טען סוגי שרירים
// //     fetchMuscles(); // טען שרירים
// //     fetchMuscleGroups(); // טען קבוצות שרירים
// //   }, []);

// //   const handleAddExercise = async () => {
// //     if (!newExerciseName.trim()) return;

// //     try {
// //       setIsLoading(true);
// //       setError(null);

// //       const newExerciseData = {
// //         exerciseName: newExerciseName,
// //         MuscleTypeId: selectedMuscleType ? parseInt(selectedMuscleType) : undefined,
// //         MuscleGroupId: selectedMuscleGroup ? parseInt(selectedMuscleGroup) : undefined,
// //         muscleIds: selectedMuscles.map(id => parseInt(id)),
// //       };

// //       // יצירת התרגיל
// //       const createdExercise = await exerciseApi.create(newExerciseData);

// //       // שיוך לקטגוריה אם נבחרה
// //       if (selectedCategory) {
// //         await exerciseApi.addToCategory(parseInt(selectedCategory), createdExercise);
// //       }

// //       setNewExerciseName('');
// //       setSelectedCategory('');
// //       setSelectedMuscleType('');
// //       setSelectedMuscleGroup('');
// //       setSelectedMuscles([]);
// //       setIsAdding(false);
// //       await fetchExercises(); // רענן את רשימת התרגילים
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleEditExercise = async () => {
// //     if (!editingExercise || !editName.trim()) return;

// //     try {
// //       setIsLoading(true);
// //       setError(null);

// //       const updatedExerciseData = {
// //         ...editingExercise,
// //         exerciseName: editName,
// //         MuscleTypeId: editSelectedMuscleType ? parseInt(editSelectedMuscleType) : undefined,
// //         MuscleGroupId: editSelectedMuscleGroup ? parseInt(editSelectedMuscleGroup) : undefined,
// //         muscleIds: editSelectedMuscles.map(id => parseInt(id)),
// //         // categoryIds should ideally be handled by a separate endpoint or passed here as well if the API supports it
// //       };

// //       await exerciseApi.update(editingExercise.exerciseId, updatedExerciseData);
      
// //       // Update category association if it changed (requires separate API call or a combined update)
// //       // This part depends heavily on your backend API structure for updating category associations
// //       // For simplicity, this example assumes you'll handle category changes separately or include them in the main update.
      
// //       setEditingExercise(null);
// //       await fetchExercises();
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleDeleteExercise = async (id: number) => {
// //     if (!confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) return;

// //     try {
// //       setIsLoading(true);
// //       setError(null);
// //       await exerciseApi.delete(id);
// //       await fetchExercises();
// //     } catch (error) {
// //       setError(formatApiError(error));
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const startEditing = (exercise: Exercise) => {
// //     setEditingExercise(exercise);
// //     setEditName(exercise.exerciseName);
// //     // הגדרת הערכים הנוכחיים של התרגיל לעריכה
// //     setEditSelectedCategory(exercise.categoryIds && exercise.categoryIds.length > 0 ? exercise.categoryIds[0].toString() : '');
// //     setEditSelectedMuscleType(exercise.MuscleTypeId?.toString() || '');
// //     setEditSelectedMuscleGroup(exercise.MuscleGroupId?.toString() || '');
// //     setEditSelectedMuscles(Array.isArray(exercise.muscleIds) ? exercise.muscleIds.map(id => id.toString()) : []);
// //   };

// //   const cancelEditing = () => {
// //     setEditingExercise(null);
// //   };

// //   const toggleExerciseDetails = (id: number) => {
// //     setExpandedExercise(expandedExercise === id ? null : id);
// //     // אם התרגיל לא מורחב, וודא שאתה טוען את הפרטים כאשר הוא נפתח
// //     if (expandedExercise !== id) {
// //       fetchExerciseDetails(id);
// //     }
// //   };

// //   // פונקציה לעדכון הפרטים המורחבים של התרגיל (קטגוריות, שרירים וכו')
// //   const fetchExerciseDetails = async (id: number) => {
// //     try {
// //       // כאן תצטרך נקודת קצה ב-API שתחזיר את כל הפרטים המשויכים לתרגיל:
// //       // קטגוריות, שרירים, סוג שריר, קבוצת שריר
// //       const details = await exerciseApi.getById(id); // נניח ש-getDetails מחזיר: { categoryIds: [], muscleIds: [], muscleTypeId: ..., muscleGroupId: ... }

// //       setExercises(prevExercises =>
// //         prevExercises.map(ex =>
// //           ex.exerciseId === id ? {
// //             ...ex,
// //             categoryIds: details.categoryIds,
// //             muscleIds: details.muscleIds,
// //             MuscleTypeId: details.MuscleTypeId,
// //             MuscleGroupId: details.MuscleGroupId,
// //           } : ex
// //         )
// //       );
// //     } catch (error) {
// //       console.error('Failed to fetch exercise details:', error);
// //       setError(formatApiError(error));
// //     }
// //   };

// //   const filteredExercises = exercises.filter(exercise =>
// //     exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (isLoading && exercises.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //     >
// //       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
// //         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
// //           <h2 className="text-xl font-medium text-gray-900">ניהול תרגילים</h2>
// //           <Button
// //             onClick={() => setIsAdding(true)}
// //             icon={<Plus className="h-4 w-4" />}
// //             disabled={isAdding}
// //           >
// //             הוסף תרגיל
// //           </Button>
// //         </div>

// //         {error && (
// //           <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
// //             {error}
// //           </div>
// //         )}

// //         <div className="px-4 py-3 bg-gray-50 border-b">
// //           <div className="flex items-center">
// //             <Search className="h-5 w-5 text-gray-400 ml-2" />
// //             <Input
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               placeholder="חיפוש תרגילים..."
// //               fullWidth
// //             />
// //           </div>
// //         </div>

// //         {isAdding && (
// //           <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
// //             <div className="space-y-3">
// //               <Input
// //                 label="שם התרגיל"
// //                 value={newExerciseName}
// //                 onChange={(e) => setNewExerciseName(e.target.value)}
// //                 placeholder="הזן שם תרגיל"
// //                 fullWidth
// //                 autoFocus
// //               />

// //               <Select
// //                 label="קטגוריה"
// //                 options={categories.map(category => ({ id: category.categoryId.toString(), name: category.categoryName }))}
// //                 value={selectedCategory}
// //                 onChange={(value) => setSelectedCategory(value)}
// //                 fullWidth
// //               />

// //               <Select
// //                 label="סוג שריר"
// //                 options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
// //                 value={selectedMuscleType}
// //                 onChange={(value) => setSelectedMuscleType(value)}
// //                 fullWidth
// //               />

// //               <Select
// //                 label="קבוצת שריר (תת-שריר)"
// //                 options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
// //                 value={selectedMuscleGroup}
// //                 onChange={(value) => setSelectedMuscleGroup(value)}
// //                 fullWidth
// //               />

// //               {/* Multiple Select for Muscles - you might need a custom multi-select component for this */}
// //               <label htmlFor="muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
// //               <select
// //                 id="muscles"
// //                 multiple
// //                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
// //                 value={selectedMuscles}
// //                 onChange={(e) => setSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
// //               >
// //                 {muscles.map(muscle => (
// //                   <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
// //                     {muscle.muscleName}
// //                   </option>
// //                 ))}
// //               </select>
// //               <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

// //               <div className="flex justify-end space-x-2 space-x-reverse">
// //                 <Button
// //                   onClick={handleAddExercise}
// //                   icon={<Save className="h-4 w-4" />}
// //                   disabled={!newExerciseName.trim()}
// //                 >
// //                   שמור
// //                 </Button>
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => setIsAdding(false)}
// //                   icon={<X className="h-4 w-4" />}
// //                 >
// //                   ביטול
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <ul className="divide-y divide-gray-200">
// //           {filteredExercises.length === 0 ? (
// //             <li className="px-4 py-4 text-gray-500 text-center">
// //               לא נמצאו תרגילים
// //             </li>
// //           ) : (
// //             filteredExercises.map((exercise) => (
// //               <li key={exercise.exerciseId} className="px-4 py-4">
// //                 {editingExercise && editingExercise.exerciseId === exercise.exerciseId ? (
// //                   <div className="space-y-3">
// //                     <Input
// //                       label="שם התרגיל"
// //                       value={editName}
// //                       onChange={(e) => setEditName(e.target.value)}
// //                       fullWidth
// //                       autoFocus
// //                     />

// //                     {/* Edit mode for Category, Muscle Type, Muscle Group, Muscles */}
// //                     <Select
// //                       label="קטגוריה"
// //                       options={categories.map(category => ({ id: category.categoryId.toString(), name: category.categoryName }))}
// //                       value={editSelectedCategory}
// //                       onChange={(value) => setEditSelectedCategory(value)}
// //                       fullWidth
// //                     />
// //                     <Select
// //                       label="סוג שריר"
// //                       options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
// //                       value={editSelectedMuscleType}
// //                       onChange={(value) => setEditSelectedMuscleType(value)}
// //                       fullWidth
// //                     />
// //                     <Select
// //                       label="קבוצת שריר"
// //                       options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
// //                       value={editSelectedMuscleGroup}
// //                       onChange={(value) => setEditSelectedMuscleGroup(value)}
// //                       fullWidth
// //                     />
// //                     <label htmlFor="edit-muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
// //                     <select
// //                       id="edit-muscles"
// //                       multiple
// //                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
// //                       value={editSelectedMuscles}
// //                       onChange={(e) => setEditSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
// //                     >
// //                       {muscles.map(muscle => (
// //                         <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
// //                           {muscle.muscleName}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

// //                     <div className="flex justify-end space-x-2 space-x-reverse">
// //                       <Button
// //                         onClick={handleEditExercise}
// //                         icon={<Save className="h-4 w-4" />}
// //                         disabled={!editName.trim()}
// //                       >
// //                         שמור
// //                       </Button>
// //                       <Button
// //                         variant="ghost"
// //                         onClick={cancelEditing}
// //                         icon={<X className="h-4 w-4" />}
// //                       >
// //                         ביטול
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <>
// //                     <div className="flex justify-between items-center">
// //                       <div className="flex items-center">
// //                         <button
// //                           onClick={() => toggleExerciseDetails(exercise.exerciseId)}
// //                           className="ml-2 text-gray-500 hover:text-gray-700"
// //                           aria-expanded={expandedExercise === exercise.exerciseId}
// //                           aria-controls={`details-${exercise.exerciseId}`}
// //                         >
// //                           {expandedExercise === exercise.exerciseId ? (
// //                             <ChevronUp className="h-5 w-5" />
// //                           ) : (
// //                             <ChevronDown className="h-5 w-5" />
// //                           )}
// //                         </button>
// //                         <span className="text-gray-900">{exercise.exerciseName}</span>
// //                       </div>
// //                       <div className="flex space-x-2 space-x-reverse">
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           onClick={() => startEditing(exercise)}
// //                           icon={<Edit className="h-4 w-4" />}
// //                         >
// //                           ערוך
// //                         </Button>
// //                         <Button
// //                           variant="ghost"
// //                           size="sm"
// //                           className="text-red-600 hover:text-red-800"
// //                           onClick={() => handleDeleteExercise(exercise.exerciseId)}
// //                           icon={<Trash className="h-4 w-4" />}
// //                         >
// //                           מחק
// //                         </Button>
// //                       </div>
// //                     </div>

// //                     {expandedExercise === exercise.exerciseId && (
// //                       <motion.div
// //                         id={`details-${exercise.exerciseId}`}
// //                         initial={{ opacity: 0, height: 0 }}
// //                         animate={{ opacity: 1, height: 'auto' }}
// //                         transition={{ duration: 0.3 }}
// //                         className="mt-3 pt-3 border-t border-gray-100 space-y-2"
// //                       >
// //                         {/* קטגוריות */}
// //                         <div>
// //                           <h4 className="text-sm font-medium text-gray-500 mb-1">קטגוריות:</h4>
// //                           {exercise.categoryIds && exercise.categoryIds.length > 0 ? (
// //                             <div className="flex flex-wrap gap-2">
// //                               {exercise.categoryIds.map(categoryId => {
// //                                 const category = categories.find(c => c.categoryId === categoryId);
// //                                 return category ? (
// //                                   <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
// //                                     {category.categoryName}
// //                                   </span>
// //                                 ) : null;
// //                               })}
// //                             </div>
// //                           ) : (
// //                             <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
// //                           )}
// //                         </div>

// //                         {/* סוג שריר */}
// //                         <div>
// //                           <h4 className="text-sm font-medium text-gray-500 mb-1">סוג שריר:</h4>
// //                           {exercise.MuscleTypeId ? (
// //                             <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
// //                               {muscleTypes.find(mt => mt.muscleTypeId === exercise.MuscleTypeId)?.muscleTypeName || 'לא ידוע'}
// //                             </span>
// //                           ) : (
// //                             <p className="text-sm text-gray-500">לא משויך לסוג שריר</p>
// //                           )}
// //                         </div>

// //                         {/* קבוצת שריר (תת-שריר) */}
// //                         <div>
// //                           <h4 className="text-sm font-medium text-gray-500 mb-1">קבוצת שריר:</h4>
// //                           {exercise.MuscleGroupId ? (
// //                             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
// //                               {muscleGroups.find(mg => mg.muscleGroupId === exercise.MuscleGroupId)?.muscleGroupName || 'לא ידוע'}
// //                             </span>
// //                           ) : (
// //                             <p className="text-sm text-gray-500">לא משויך לקבוצת שריר</p>
// //                           )}
// //                         </div>

// //                         {/* שרירים עיקריים */}
// //                         <div>
// //                           <h4 className="text-sm font-medium text-gray-500 mb-1">שרירים עיקריים:</h4>
// //                           {Array.isArray(exercise.muscleIds) && exercise.muscleIds.length > 0 ? (
// //                             <div className="flex flex-wrap gap-2">
// //                               {exercise.muscleIds.map(muscleId => {
// //                                 const muscle = muscles.find(m => m.muscleId === muscleId);
// //                                 return muscle ? (
// //                                   <span key={muscleId} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
// //                                     {muscle.muscleName}
// //                                   </span>
// //                                 ) : null;
// //                               })}
// //                             </div>
// //                           ) : (
// //                             <p className="text-sm text-gray-500">לא משויך לשרירים</p>
// //                           )}
// //                         </div>

// //                       </motion.div>
// //                     )}
// //                   </>
// //                 )}
// //               </li>
// //             ))
// //           )}
// //         </ul>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default ExercisesManagement;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp, Search } from 'lucide-react';

// // ייבוא קומפוננטות UI כלליות
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Select from '../../../components/ui/Select';

// // ייבוא שירותי API לתרגילים, קטגוריות, שרירים וכו'
// import { exerciseApi, categoryApi, muscleApi, muscleTypeApi, sizeApi } from '../../../lib/api';

// // ייבוא טיפוסים (ממשקים) עבור הנתונים
// import { Exercise, Category, Muscle, MuscleType, Size } from '../../../types';

// // פונקציית עזר לפורמט שגיאות API
// import { formatApiError } from '../../../lib/utils';

// const ExercisesManagement: React.FC = () => {
//   // --- מצבי (States) הקומפוננטה ---
//   // נתונים שהובאו מהשרת
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [muscleTypes, setMuscleTypes] = useState<MuscleType[]>([]);
//   const [muscles, setMuscles] = useState<Muscle[]>([]);
//   const [muscleGroups, setMuscleGroups] = useState<Size[]>([]); // שימו לב: sizeApi יובא כ-muscleGroups כפי שצוין בתגובה הקודמת

//   // מצבי טעינה ושגיאות
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // מצבים לניהול הוספת תרגיל חדש
//   const [isAdding, setIsAdding] = useState(false);
//   const [newExerciseName, setNewExerciseName] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedMuscleType, setSelectedMuscleType] = useState<string>('');
//   const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
//   const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

//   // מצבים לניהול עריכת תרגיל קיים
//   const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
//   const [editName, setEditName] = useState('');
//   const [editSelectedCategory, setEditSelectedCategory] = useState<string>('');
//   const [editSelectedMuscleType, setEditSelectedMuscleType] = useState<string>('');
//   const [editSelectedMuscleGroup, setEditSelectedMuscleGroup] = useState<string>('');
//   const [editSelectedMuscles, setEditSelectedMuscles] = useState<string[]>([]);

//   // מצבים נוספים ל-UI
//   const [searchTerm, setSearchTerm] = useState('');
//   const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

//   // --- פונקציות אחזור נתונים (API Calls) ---

//   // אחזור רשימת התרגילים
//   const fetchExercises = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await exerciseApi.getAll();
//       setExercises(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // אחזור רשימת הקטגוריות
//   const fetchCategories = async () => {
//     try {
//       const data = await categoryApi.getAll();
//       setCategories(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     }
//   };

//   // אחזור רשימת סוגי השרירים
//   const fetchMuscleTypes = async () => {
//     try {
//       const data = await muscleTypeApi.getAll();
//       setMuscleTypes(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     }
//   };

//   // אחזור רשימת השרירים
//   const fetchMuscles = async () => {
//     try {
//       const data = await muscleApi.getAll();
//       setMuscles(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     }
//   };

//   // אחזור רשימת קבוצות השרירים (תתי-שרירים)
//   const fetchMuscleGroups = async () => {
//     try {
//       const data = await sizeApi.getAll();
//       setMuscleGroups(data);
//     } catch (error) {
//       setError(formatApiError(error));
//     }
//   };

//   // --- Effect Hook לטעינת נתונים ראשונית ---
//   useEffect(() => {
//     fetchExercises();
//     fetchCategories();
//     fetchMuscleTypes();
//     fetchMuscles();
//     fetchMuscleGroups();
//   }, []); // ריצה רק פעם אחת בטעינת הקומפוננטה

//   // --- לוגיקה לטיפול בפעולות משתמש ---

//   // טיפול בהוספת תרגיל חדש
//   const handleAddExercise = async () => {
//     if (!newExerciseName.trim()) return; // ודא ששם התרגיל אינו ריק

//     try {
//       setIsLoading(true);
//       setError(null);

//       const newExerciseData = {
//         exerciseName: newExerciseName,
//         MuscleTypeId: selectedMuscleType ? parseInt(selectedMuscleType) : undefined,
//         MuscleGroupId: selectedMuscleGroup ? parseInt(selectedMuscleGroup) : undefined,
//         muscleIds: selectedMuscles.map(id => parseInt(id)),
//       };

//       // יצירת התרגיל באמצעות ה-API
//       const createdExercise = await exerciseApi.create(newExerciseData);

//       // שיוך לקטגוריה אם נבחרה
//       if (selectedCategory) {
//         await exerciseApi.addToCategory(parseInt(selectedCategory), createdExercise);
//       }

//       // איפוס שדות הטופס
//       setNewExerciseName('');
//       setSelectedCategory('');
//       setSelectedMuscleType('');
//       setSelectedMuscleGroup('');
//       setSelectedMuscles([]);
//       setIsAdding(false);
//       await fetchExercises(); // רענן את רשימת התרגילים לאחר ההוספה
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // טיפול בעריכת תרגיל קיים
//   const handleEditExercise = async () => {
//     if (!editingExercise || !editName.trim()) return; // ודא שתרגיל נבחר ושם התרגיל אינו ריק

//     try {
//       setIsLoading(true);
//       setError(null);

//       const updatedExerciseData = {
//         ...editingExercise, // שמור על שאר הפרטים של התרגיל המקורי
//         exerciseName: editName,
//         MuscleTypeId: editSelectedMuscleType ? parseInt(editSelectedMuscleType) : undefined,
//         MuscleGroupId: editSelectedMuscleGroup ? parseInt(editSelectedMuscleGroup) : undefined,
//         muscleIds: editSelectedMuscles.map(id => parseInt(id)),
//         // שיוך קטגוריות מצריך טיפול ספציפי ב-API אם לא ניתן לעדכן דרך נקודת הקצה הראשית של התרגיל
//       };

//       await exerciseApi.update(editingExercise.exerciseId, updatedExerciseData);

//       setEditingExercise(null); // סיים מצב עריכה
//       await fetchExercises(); // רענן את רשימת התרגילים לאחר העדכון
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // טיפול במחיקת תרגיל
//   const handleDeleteExercise = async (id: number) => {
//     if (!confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) return; // בקשת אישור לפני מחיקה

//     try {
//       setIsLoading(true);
//       setError(null);
//       await exerciseApi.delete(id);
//       await fetchExercises(); // רענן את רשימת התרגילים לאחר המחיקה
//     } catch (error) {
//       setError(formatApiError(error));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // התחלת מצב עריכה עבור תרגיל מסוים
//   const startEditing = (exercise: Exercise) => {
//     setEditingExercise(exercise);
//     setEditName(exercise.exerciseName);
//     // הגדרת הערכים הנוכחיים של התרגיל בשדות העריכה
//     setEditSelectedCategory(exercise.categoryId && exercise.categoryId.length > 0 ? exercise.categoryId[0].toString() : '');
//     setEditSelectedMuscleType(exercise.muscleTypeId?.toString() || '');
//     setEditSelectedMuscleGroup(exercise.muscleGroupId?.toString() || '');
//     setEditSelectedMuscles(exercise.muscleId ? [exercise.muscleId.toString()] : []);
//   };

//   // ביטול מצב עריכה
//   const cancelEditing = () => {
//     setEditingExercise(null);
//   };

//   // טוגל (פתיחה/סגירה) של פרטי תרגיל מורחבים
//   const toggleExerciseDetails = (id: number) => {
//     setExpandedExercise(expandedExercise === id ? null : id);
//     // אם התרגיל לא מורחב, וודא שאתה טוען את הפרטים כאשר הוא נפתח
//     if (expandedExercise !== id) {
//       fetchExerciseDetails(id);
//     }
//   };

//   // פונקציה לעדכון הפרטים המורחבים של התרגיל (קטגוריות, שרירים וכו')
//   const fetchExerciseDetails = async (id: number) => {
//     try {
//       // יש להניח ש-`exerciseApi.getById` מחזיר את כל הפרטים המשויכים:
//       // קטגוריות, שרירים, סוג שריר, קבוצת שריר.
//       const details = await exerciseApi.getById(id);

//       // עדכון הסטייט של התרגילים עם הפרטים המעודכנים
//       setExercises(prevExercises =>
//         prevExercises.map(ex =>
//           ex.exerciseId === id ? {
//             ...ex,
//             categoryIds: details.categoryIds,
//             muscleIds: details.muscleIds,
//             MuscleTypeId: details.MuscleTypeId,
//             MuscleGroupId: details.MuscleGroupId,
//           } : ex
//         )
//       );
//     } catch (error) {
//       console.error('Failed to fetch exercise details:', error);
//       setError(formatApiError(error));
//     }
//   };

//   // סינון תרגילים לפי מונח חיפוש
//   const filteredExercises = exercises.filter(exercise =>
//     exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // --- רכיב טעינה ---
//   if (isLoading && exercises.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // --- רכיב ה-UI הראשי ---
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         {/* כותרת וכפתור הוספה */}
//         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
//           <h2 className="text-xl font-medium text-gray-900">ניהול תרגילים</h2>
//           <Button
//             onClick={() => setIsAdding(true)}
//             icon={<Plus className="h-4 w-4" />}
//             disabled={isAdding}
//           >
//             הוסף תרגיל
//           </Button>
//         </div>

//         {/* הצגת שגיאות API */}
//         {error && (
//           <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
//             {error}
//           </div>
//         )}

//         {/* שורת חיפוש */}
//         <div className="px-4 py-3 bg-gray-50 border-b">
//           <div className="flex items-center">
//             <Search className="h-5 w-5 text-gray-400 ml-2" />
//             <Input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="חיפוש תרגילים..."
//               fullWidth
//             />
//           </div>
//         </div>

//         {/* טופס הוספת תרגיל חדש */}
//         {isAdding && (
//           <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
//             <div className="space-y-3">
//               <Input
//                 label="שם התרגיל"
//                 value={newExerciseName}
//                 onChange={(e) => setNewExerciseName(e.target.value)}
//                 placeholder="הזן שם תרגיל"
//                 fullWidth
//                 autoFocus
//               />
// {/* 
//               <Select
//                 label="קטגוריה"
//                 options={categories.map(category => ({ id: category.categoryId.toString(), name: category.categoryName }))}
//                 value={selectedCategory}
//                 onChange={(value) => setSelectedCategory(value)}
//                 fullWidth
//               /> */}
//               <Select
//                 label="קטגוריה"
//                 options={categories.map(category => ({ id: category.categoryId, name: category.categoryName }))}
//                 value={selectedCategory}
//                 onChange={(value) => setSelectedCategory(value)}
//                 fullWidth
//               />

//               <Select
//                 label="סוג שריר"
//                 options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
//                 value={selectedMuscleType}
//                 onChange={(value) => setSelectedMuscleType(value)}
//                 fullWidth
//               />

//               <Select
//                 label="קבוצת שריר (תת-שריר)"
//                 options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
//                 value={selectedMuscleGroup}
//                 onChange={(value) => setSelectedMuscleGroup(value)}
//                 fullWidth
//               />

//               {/* Multiple Select עבור שרירים עיקריים */}
//               <label htmlFor="muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
//               <select
//                 id="muscles"
//                 multiple
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                 value={selectedMuscles}
//                 onChange={(e) => setSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
//               >
//                 {muscles.map(muscle => (
//                   <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
//                     {muscle.muscleName}
//                   </option>
//                 ))}
//               </select>
//               <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

//               <div className="flex justify-end space-x-2 space-x-reverse">
//                 <Button
//                   onClick={handleAddExercise}
//                   icon={<Save className="h-4 w-4" />}
//                   disabled={!newExerciseName.trim()}
//                 >
//                   שמור
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   onClick={() => setIsAdding(false)}
//                   icon={<X className="h-4 w-4" />}
//                 >
//                   ביטול
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* רשימת התרגילים */}
//         <ul className="divide-y divide-gray-200">
//           {filteredExercises.length === 0 ? (
//             <li className="px-4 py-4 text-gray-500 text-center">
//               לא נמצאו תרגילים
//             </li>
//           ) : (
//             filteredExercises.map((exercise) => (
//               <li key={exercise.exerciseId} className="px-4 py-4">
//                 {editingExercise && editingExercise.exerciseId === exercise.exerciseId ? (
//                   // מצב עריכת תרגיל קיים
//                   <div className="space-y-3">
//                     <Input
//                       label="שם התרגיל"
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       fullWidth
//                       autoFocus
//                     />

//                     {/* <Select
//                       label="קטגוריה"
//                       options={categories.map(category => ({ id: category.categoryId.toString(), name: category.categoryName }))}
//                       value={editSelectedCategory}
//                       onChange={(value) => setEditSelectedCategory(value)}
//                       fullWidth
//                     /> */}
//                      <Select
//                       label="קטגוריה"
//                       options={categories.map(cat => ({ id: cat.categoryId, name: cat.categoryName }))}
//                       value={editSelectedCategory}
//                       onChange={(value) => setEditSelectedCategory(value)}
//                       fullWidth
//                     />
//                     <Select
//                       label="סוג שריר"
//                       options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
//                       value={editSelectedMuscleType}
//                       onChange={(value) => setEditSelectedMuscleType(value)}
//                       fullWidth
//                     />
//                     <Select
//                       label="קבוצת שריר"
//                       options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
//                       value={editSelectedMuscleGroup}
//                       onChange={(value) => setEditSelectedMuscleGroup(value)}
//                       fullWidth
//                     />
//                     <label htmlFor="edit-muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
//                     <select
//                       id="edit-muscles"
//                       multiple
//                       className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//                       value={editSelectedMuscles}
//                       onChange={(e) => setEditSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
//                     >
//                       {muscles.map(muscle => (
//                         <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
//                           {muscle.muscleName}
//                         </option>
//                       ))}
//                     </select>
//                     <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

//                     <div className="flex justify-end space-x-2 space-x-reverse">
//                       <Button
//                         onClick={handleEditExercise}
//                         icon={<Save className="h-4 w-4" />}
//                         disabled={!editName.trim()}
//                       >
//                         שמור
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         onClick={cancelEditing}
//                         icon={<X className="h-4 w-4" />}
//                       >
//                         ביטול
//                       </Button>
//                     </div>
//                   </div>
//                 ) : (
//                   // מצב תצוגה רגיל של תרגיל
//                   <>
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center">
//                         <button
//                           onClick={() =>{ toggleExerciseDetails(exercise.exerciseId);
//                             if (expandedExercise !== exercise.exerciseId) {
//                                 // קרא ל-fetchExerciseDetails רק אם הפרטים לא טעונים או אם זו פעם ראשונה שמרחיבים
//                                 if (!exercise.categoryIds || exercise.categoryIds.length === 0) {
//                                     fetchExerciseDetails(exercise.exerciseId);
//                                 }
//                             }
//                           }
//                         }
//                           className="ml-2 text-gray-500 hover:text-gray-700"
//                           aria-expanded={expandedExercise === exercise.exerciseId}
//                           aria-controls={`details-${exercise.exerciseId}`}
//                         >
//                           {expandedExercise === exercise.exerciseId ? (
//                             <ChevronUp className="h-5 w-5" />
//                           ) : (
//                             <ChevronDown className="h-5 w-5" />
//                           )}
//                         </button>
//                         <span className="text-gray-900">{exercise.exerciseName}</span>
//                       </div>
//                       <div className="flex space-x-2 space-x-reverse">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => startEditing(exercise)}
//                           icon={<Edit className="h-4 w-4" />}
//                         >
//                           ערוך
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="text-red-600 hover:text-red-800"
//                           onClick={() => handleDeleteExercise(exercise.exerciseId)}
//                           icon={<Trash className="h-4 w-4" />}
//                         >
//                           מחק
//                         </Button>
//                       </div>
//                     </div>

//                     {/* פרטים מורחבים של התרגיל (מוסתרים/מוצגים) */}
//                     {expandedExercise === exercise.exerciseId && (
//                       <motion.div
//                         id={`details-${exercise.exerciseId}`}
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: 'auto' }}
//                         transition={{ duration: 0.3 }}
//                         className="mt-3 pt-3 border-t border-gray-100 space-y-2"
//                       >
//                         {/* תצוגת קטגוריות משויכות */}  
//                           {/* תצוגת קטגוריות משויכות */}
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">קטגוריות:</h4>
//                           {exercise.categoryIds && exercise.categoryIds.length > 0 ? (
//                             <div className="flex flex-wrap gap-2">
//                               {exercise.categoryIds.map(categoryId => {
//                                 const category = categories.find(c => c.categoryId === categoryId);
//                                 return category ? (
//                                   <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                                     {category.categoryName}
//                                   </span>
//                                 ) : null;
//                               })}
//                             </div>
//                           ) : (
//                             <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
//                           )}
//                         </div>

//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">קטגוריות:</h4>
//                           {exercise.categoryId && exercise.categoryId.length > 0 ? (
//                             <div className="flex flex-wrap gap-2">
//                               {exercise.categoryId.map(categoryId => {
//                                 const category = categories.find(c => c.categoryId === categoryId);
//                                 return category ? (
//                                   <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                                     {category.categoryName}
//                                   </span>
//                                 ) : null;
//                               })}
//                             </div>
//                           ) : (
//                             <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
//                           )}
//                         </div>

//                         {/* תצוגת סוג שריר */}
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">סוג שריר:</h4>
//                           {exercise.muscleTypeId ? (
//                             <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
//                               {muscleTypes.find(mt => mt.muscleTypeId === exercise.muscleTypeId)?.muscleTypeName || 'לא ידוע'}
//                             </span>
//                           ) : (
//                             <p className="text-sm text-gray-500">לא משויך לסוג שריר</p>
//                           )}
//                         </div>

//                         {/* תצוגת קבוצת שריר (תת-שריר) */}
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">קבוצת שריר:</h4>
//                           {exercise.muscleGroupId ? (
//                             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
//                               {muscleGroups.find(mg => mg.muscleGroupId === exercise.muscleGroupId)?.muscleGroupName || 'לא ידוע'}
//                             </span>
//                           ) : (
//                             <p className="text-sm text-gray-500">לא משויך לקבוצת שריר</p>
//                           )}
//                         </div>

//                         {/* תצוגת שרירים עיקריים משויכים */}
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-500 mb-1">שרירים עיקריים:</h4>
//                           {/* { exercise.muscleIds ? (
//                              <span className="bg-orange-100 text-green-800 text-xs px-2 py-1 rounded">
//                               {muscles.find(m => m.muscleId === exercise.muscleIds)?.muscleName || 'לא ידוע'}
//                             </span>


//                             // <div className="flex flex-wrap gap-2">
//                             //   {exercise.muscleIds.map(muscleId => {
//                             //     const muscle = muscles.find(m => m.muscleId === muscleId);
//                             //     return muscle ? (
//                             //       <span key={muscleId} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
//                             //         {muscle.muscleName}
//                             //       </span>
//                             //     ) : null;
//                             //   })}
//                             // </div>
//                           ) : ( */}
//                             {exercise.muscleId ? ( // שינוי כאן: exercise.muscleId במקום exercise.muscleIds
//                             <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded"> {/* שינוי הצבע ל-orange-800 בהתאמה */}
//                               {muscles.find(m => m.muscleId === exercise.muscleId)?.muscleName || 'לא ידוע'}
//                             </span>
//                           ) : (
//                             <p className="text-sm text-gray-500">לא משויך לשרירים</p>
//                           )}
//                         </div>

//                       </motion.div>
//                     )}
//                   </>
//                 )}
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default ExercisesManagement;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, X, ChevronDown, ChevronUp, Search } from 'lucide-react';

// ייבוא קומפוננטות UI כלליות
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

// ייבוא שירותי API לתרגילים, קטגוריות, שרירים וכו'
import { exerciseApi, categoryApi, muscleApi, muscleTypeApi, sizeApi } from '../../../lib/api';

// ייבוא טיפוסים (ממשקים) עבור הנתונים
import { Exercise, Category, Muscle, MuscleType, Size } from '../../../types';

// פונקציית עזר לפורמט שגיאות API
import { formatApiError } from '../../../lib/utils';

const ExercisesManagement: React.FC = () => {
  // --- מצבי (States) הקומפוננטה ---
  // נתונים שהובאו מהשרת
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [muscleTypes, setMuscleTypes] = useState<MuscleType[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<Size[]>([]); // שימו לב: sizeApi יובא כ-muscleGroups כפי שצוין בתגובה הקודמת

  // מצבי טעינה ושגיאות
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // מצבים לניהול הוספת תרגיל חדש
  const [isAdding, setIsAdding] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // נשמור ID כסטרינג
  const [selectedMuscleType, setSelectedMuscleType] = useState<string>('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  // מצבים לניהול עריכת תרגיל קיים
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [editName, setEditName] = useState('');
  const [editSelectedCategory, setEditSelectedCategory] = useState<string>(''); // נשמור ID כסטרינג
  const [editSelectedMuscleType, setEditSelectedMuscleType] = useState<string>('');
  const [editSelectedMuscleGroup, setEditSelectedMuscleGroup] = useState<string>('');
  const [editSelectedMuscles, setEditSelectedMuscles] = useState<string[]>([]);

  // מצבים נוספים ל-UI
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  // --- פונקציות אחזור נתונים (API Calls) ---

  // אחזור רשימת התרגילים
  const fetchExercises = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await exerciseApi.getAll();
      setExercises(data);
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // אחזור רשימת הקטגוריות
  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAll();
      setCategories(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  // אחזור רשימת סוגי השרירים
  const fetchMuscleTypes = async () => {
    try {
      const data = await muscleTypeApi.getAll();
      setMuscleTypes(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  // אחזור רשימת השרירים
  const fetchMuscles = async () => {
    try {
      const data = await muscleApi.getAll();
      setMuscles(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  // אחזור רשימת קבוצות השרירים (תתי-שרירים)
  const fetchMuscleGroups = async () => {
    try {
      const data = await sizeApi.getAll();
      setMuscleGroups(data);
    } catch (error) {
      setError(formatApiError(error));
    }
  };

  // --- Effect Hook לטעינת נתונים ראשונית ---
  useEffect(() => {
    fetchExercises();
    fetchCategories();
    fetchMuscleTypes();
    fetchMuscles();
    fetchMuscleGroups();
  }, []); // ריצה רק פעם אחת בטעינת הקומפוננטה

  // --- לוגיקה לטיפול בפעולות משתמש ---

  // טיפול בהוספת תרגיל חדש
  const handleAddExercise = async () => {
    if (!newExerciseName.trim()) return; // ודא ששם התרגיל אינו ריק

    try {
      setIsLoading(true);
      setError(null);

      const newExerciseData = {
        exerciseName: newExerciseName,
        MuscleTypeId: selectedMuscleType ? parseInt(selectedMuscleType) : undefined,
        MuscleGroupId: selectedMuscleGroup ? parseInt(selectedMuscleGroup) : undefined,
        muscleIds: selectedMuscles.map(id => parseInt(id)),
        // הוסף את ה-categoryId אם קיים
        categoryIds: selectedCategory ? [parseInt(selectedCategory)] : undefined,
      };

      // יצירת התרגיל באמצעות ה-API
      const createdExercise = await exerciseApi.create(newExerciseData);

      // שיוך לקטגוריה אם נבחרה - אם ה-API של exercise.create כבר מטפל בזה, אפשר להסיר את השורה הבאה.
      // אחרת, אם ה-API דורש נקודת קצה נפרדת לשיוך, זה המקום:
      /*
      if (selectedCategory) {
        await exerciseApi.addToCategory(parseInt(selectedCategory), createdExercise.exerciseId);
      }
      */

      // איפוס שדות הטופס
      setNewExerciseName('');
      setSelectedCategory('');
      setSelectedMuscleType('');
      setSelectedMuscleGroup('');
      setSelectedMuscles([]);
      setIsAdding(false);
      await fetchExercises(); // רענן את רשימת התרגילים לאחר ההוספה
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // טיפול בעריכת תרגיל קיים
  const handleEditExercise = async () => {
    if (!editingExercise || !editName.trim()) return; // ודא שתרגיל נבחר ושם התרגיל אינו ריק

    try {
      setIsLoading(true);
      setError(null);

      const updatedExerciseData = {
        ...editingExercise, // שמור על שאר הפרטים של התרגיל המקורי
        exerciseName: editName,
        MuscleTypeId: editSelectedMuscleType ? parseInt(editSelectedMuscleType) : undefined,
        MuscleGroupId: editSelectedMuscleGroup ? parseInt(editSelectedMuscleGroup) : undefined,
        muscleIds: editSelectedMuscles.map(id => parseInt(id)),
        // עדכון categoryIds
        categoryIds: editSelectedCategory ? [parseInt(editSelectedCategory)] : undefined,
      };

      await exerciseApi.update(editingExercise.exerciseId, updatedExerciseData);

      setEditingExercise(null); // סיים מצב עריכה
      await fetchExercises(); // רענן את רשימת התרגילים לאחר העדכון
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // טיפול במחיקת תרגיל
  const handleDeleteExercise = async (id: number) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק תרגיל זה?')) return; // בקשת אישור לפני מחיקה

    try {
      setIsLoading(true);
      setError(null);
      await exerciseApi.delete(id);
      await fetchExercises(); // רענן את רשימת התרגילים לאחר המחיקה
    } catch (error) {
      setError(formatApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // התחלת מצב עריכה עבור תרגיל מסוים
  const startEditing = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setEditName(exercise.exerciseName);
    // הגדרת הערכים הנוכחיים של התרגיל בשדות העריכה
    // ייתכן ש-exercise.categoryIds הוא מערך, או ש-exercise.categoryId הוא מספר
    setEditSelectedCategory(exercise.categoryIds && exercise.categoryIds.length > 0 ? exercise.categoryIds[0].toString() : '');
    setEditSelectedMuscleType(exercise.muscleTypeId?.toString() || '');
    setEditSelectedMuscleGroup(exercise.muscleGroupId?.toString() || '');
    setEditSelectedMuscles(
        Array.isArray(exercise.muscleId)
            ? exercise.muscleId.map(id => id.toString())
            : exercise.muscleId !== undefined && exercise.muscleId !== null
                ? [exercise.muscleId.toString()]
                : []
    );
  };

  // ביטול מצב עריכה
  const cancelEditing = () => {
    setEditingExercise(null);
  };

  // טוגל (פתיחה/סגירה) של פרטי תרגיל מורחבים
  const toggleExerciseDetails = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
    // אם התרגיל לא מורחב, וודא שאתה טוען את הפרטים כאשר הוא נפתח
    if (expandedExercise !== id) {
      fetchExerciseDetails(id);
    }
  };

  // פונקציה לעדכון הפרטים המורחבים של התרגיל (קטגוריות, שרירים וכו')
  const fetchExerciseDetails = async (id: number) => {
    try {
      const details = await exerciseApi.getById(id);
      const categoryIds = await exerciseApi.getCategoryIds(id);
            // Update the exercise with its category IDs
      //       setExercises(exercises.map(ex => 
      //         ex.exerciseId === id ? { ...ex, categoryIds } : ex
      // ));
      // עדכון הסטייט של התרגילים עם הפרטים המעודכנים
      setExercises(prevExercises =>
        prevExercises.map(ex =>
          ex.exerciseId === id ? {
            ...ex,
            // ודא ש-categoryIds קיים ב-details ומועבר נכון
            categoryIds: categoryIds || [], // הוסף טיפול למקרה שזה undefined
            muscleIds: details.muscleIds || [],
            MuscleTypeId: details.MuscleTypeId,
            MuscleGroupId: details.MuscleGroupId,
          } : ex
        )
      );
    } catch (error) {
      console.error('Failed to fetch exercise details:', error);
      setError(formatApiError(error));
    }
  };

  // סינון תרגילים לפי מונח חיפוש
  const filteredExercises = exercises.filter(exercise =>
    exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- רכיב טעינה ---
  if (isLoading && exercises.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // --- רכיב ה-UI הראשי ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* כותרת וכפתור הוספה */}
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-900">ניהול תרגילים</h2>
          <Button
            onClick={() => setIsAdding(true)}
            icon={<Plus className="h-4 w-4" />}
            disabled={isAdding}
          >
            הוסף תרגיל
          </Button>
        </div>

        {/* הצגת שגיאות API */}
        {error && (
          <div className="px-4 py-3 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* שורת חיפוש */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="חיפוש תרגילים..."
              fullWidth
            />
          </div>
        </div>

        {/* טופס הוספת תרגיל חדש */}
        {isAdding && (
          <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
            <div className="space-y-3">
              <Input
                label="שם התרגיל"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
                placeholder="הזן שם תרגיל"
                fullWidth
                autoFocus
              />
              <Select
                label="קטגוריה"
                options={categories.map(category => ({ id: category.categoryId.toString(), name: category.categoryName }))}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                fullWidth
              />

              <Select
                label="סוג שריר"
                options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
                value={selectedMuscleType}
                onChange={(value) => setSelectedMuscleType(value)}
                fullWidth
              />

              <Select
                label="קבוצת שריר (תת-שריר)"
                options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
                value={selectedMuscleGroup}
                onChange={(value) => setSelectedMuscleGroup(value)}
                fullWidth
              />

              {/* Multiple Select עבור שרירים עיקריים */}
              <label htmlFor="muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
              <select
                id="muscles"
                multiple
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedMuscles}
                onChange={(e) => setSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {muscles.map(muscle => (
                  <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
                    {muscle.muscleName}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button
                  onClick={handleAddExercise}
                  icon={<Save className="h-4 w-4" />}
                  disabled={!newExerciseName.trim()}
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
          </div>
        )}

        {/* רשימת התרגילים */}
        <ul className="divide-y divide-gray-200">
          {filteredExercises.length === 0 ? (
            <li className="px-4 py-4 text-gray-500 text-center">
              לא נמצאו תרגילים
            </li>
          ) : (
            filteredExercises.map((exercise) => (
              <li key={exercise.exerciseId} className="px-4 py-4">
                {editingExercise && editingExercise.exerciseId === exercise.exerciseId ? (
                  // מצב עריכת תרגיל קיים
                  <div className="space-y-3">
                    <Input
                      label="שם התרגיל"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      fullWidth
                      autoFocus
                    />

                    <Select
                      label="קטגוריה"
                      options={categories.map(cat => ({ id: cat.categoryId.toString(), name: cat.categoryName }))}
                      value={editSelectedCategory}
                      onChange={(value) => setEditSelectedCategory(value)}
                      fullWidth
                    />
                    <Select
                      label="סוג שריר"
                      options={muscleTypes.map(mt => ({ id: mt.muscleTypeId.toString(), name: mt.muscleTypeName }))}
                      value={editSelectedMuscleType}
                      onChange={(value) => setEditSelectedMuscleType(value)}
                      fullWidth
                    />
                    <Select
                      label="קבוצת שריר"
                      options={muscleGroups.map(mg => ({ id: mg.muscleGroupId.toString(), name: mg.muscleGroupName }))}
                      value={editSelectedMuscleGroup}
                      onChange={(value) => setEditSelectedMuscleGroup(value)}
                      fullWidth
                    />
                    <label htmlFor="edit-muscles" className="block text-sm font-medium text-gray-700">שרירים עיקריים</label>
                    <select
                      id="edit-muscles"
                      multiple
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={editSelectedMuscles}
                      onChange={(e) => setEditSelectedMuscles(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                      {muscles.map(muscle => (
                        <option key={muscle.muscleId} value={muscle.muscleId.toString()}>
                          {muscle.muscleName}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">החזק Ctrl/Cmd כדי לבחור מספר שרירים</p>

                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button
                        onClick={handleEditExercise}
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
                  </div>
                ) : (
                  // מצב תצוגה רגיל של תרגיל
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            toggleExerciseDetails(exercise.exerciseId);
                            // קרא ל-fetchExerciseDetails רק אם הפרטים לא טעונים או אם זו פעם ראשונה שמרחיבים
                            // ודא ש-categoryIds קיים ובעל אורך > 0 לפני הקריאה
                            if (expandedExercise !== exercise.exerciseId && (!exercise.categoryIds || exercise.categoryIds.length === 0)) {
                              fetchExerciseDetails(exercise.exerciseId);
                            }
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          aria-expanded={expandedExercise === exercise.exerciseId}
                          aria-controls={`details-${exercise.exerciseId}`}
                        >
                          {expandedExercise === exercise.exerciseId ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        <span className="text-gray-900">{exercise.exerciseName}</span>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(exercise)}
                          icon={<Edit className="h-4 w-4" />}
                        >
                          ערוך
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteExercise(exercise.exerciseId)}
                          icon={<Trash className="h-4 w-4" />}
                        >
                          מחק
                        </Button>
                      </div>
                    </div>

                    {/* פרטים מורחבים של התרגיל (מוסתרים/מוצגים) */}
                    {expandedExercise === exercise.exerciseId && (
                      <motion.div
                        id={`details-${exercise.exerciseId}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-gray-100 space-y-2"
                      >
                        {/* תצוגת קטגוריות משויכות */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">קטגוריות:</h4>
                          {exercise.categoryIds && exercise.categoryIds.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {exercise.categoryIds.map(categoryId => {
                                const category = categories.find(c => c.categoryId === categoryId);
                                return category ? (
                                  <span key={categoryId} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {category.categoryName}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">לא משויך לקטגוריות</p>
                          )}
                        </div>

                        {/* תצוגת סוג שריר */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">סוג שריר:</h4>
                          {exercise.muscleTypeId ? (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {muscleTypes.find(mt => mt.muscleTypeId === exercise.muscleTypeId)?.muscleTypeName || 'לא ידוע'}
                            </span>
                          ) : (
                            <p className="text-sm text-gray-500">לא משויך לסוג שריר</p>
                          )}
                        </div>

                        {/* תצוגת קבוצת שריר (תת-שריר) */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">קבוצת שריר:</h4>
                          {exercise.muscleGroupId ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {muscleGroups.find(mg => mg.muscleGroupId === exercise.muscleGroupId)?.muscleGroupName || 'לא ידוע'}
                            </span>
                          ) : (
                            <p className="text-sm text-gray-500">לא משויך לקבוצת שריר</p>
                          )}
                        </div>

                        {/* תצוגת שרירים עיקריים משויכים */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">שרירים עיקריים:</h4>
                          {Array.isArray(exercise.muscleId) && exercise.muscleId.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {exercise.muscleId.map(muscleId => {
                                const muscle = muscles.find(m => m.muscleId === muscleId);
                                return muscle ? (
                                  <span key={muscleId} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                    {muscle.muscleName}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          ) : exercise.muscleId !== undefined && exercise.muscleId !== null ? (
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                              {muscles.find(m => m.muscleId === exercise.muscleId)?.muscleName || 'לא ידוע'}
                            </span>
                          ) : (
                            <p className="text-sm text-gray-500">לא משויך לשרירים</p>
                          )}
                        </div>

                      </motion.div>
                    )}
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExercisesManagement;