import { 
  db, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from './../firebase/firebaseConfig';

// Função para obter todas as disciplinas
export const getDisciplinas = async () => {
  try {
    const docRef = collection(db, 'disciplinas');
    const docSnap = await getDocs(docRef);
    return docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching disciplinas: ', error);
    throw new Error('Could not fetch disciplinas');
  }
};

// Função para adicionar uma nova disciplina
export const addDisciplina = async (newDisciplina) => {
  try {
    const docRef = collection(db, 'disciplinas');
    const docRefResult = await addDoc(docRef, newDisciplina);
    return { ...newDisciplina, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding disciplina: ', error);
    throw new Error('Could not add disciplina');
  }
};

// Função para atualizar uma disciplina existente
export const updateDisciplina = async (id, updatedDisciplina) => {
  try {
    const docRef = doc(db, 'disciplinas', id);
    await updateDoc(docRef, updatedDisciplina);
    return { ...updatedDisciplina, id };
  } catch (error) {
    console.error('Error updating disciplina: ', error);
    throw new Error('Could not update disciplina');
  }
};

// Função para excluir uma disciplina
export const deleteDisciplina = async (id) => {
  try {
    const docRef = doc(db, 'disciplinas', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting disciplina: ', error);
    throw new Error('Could not delete disciplina');
  }
};

// Função para obter todos os assuntos de uma disciplina específica
export const getAssuntosByDisciplinaId = async (disciplinaId) => {
  try {
    const assuntoRef = collection(db, 'disciplinas', disciplinaId, 'assunto');
    const assuntoSnap = await getDocs(assuntoRef);
    return assuntoSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching assuntos: ', error);
    throw new Error('Could not fetch assuntos');
  }
};
