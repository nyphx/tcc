import { 
  db, 
  collection, 
  addDoc, 
  getDoc,
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where
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


// Função para obter uma disciplina específica pelo ID
export const getDisciplinaById = async (id) => {
  const disciplinaRef = doc(db, 'disciplinas', id);
  const disciplinaSnap = await getDoc(disciplinaRef);
  if (disciplinaSnap.exists()) {
    return { ...disciplinaSnap.data(), id: disciplinaSnap.id };
  } else {
    throw new Error('No such document!');
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

export const getAssuntosPorEstado = async (id, estado) => {
  const disciplinaRef = doc(db, "disciplinas", id);
  const assuntosRef = collection(disciplinaRef, "assunto");
  const assuntosQuery = query(assuntosRef, where("estado", "==", estado));
  const assuntosSnapshot = await getDocs(assuntosQuery);
  return assuntosSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// Função para buscar um assunto específico
export const getAssunto = async (disciplinaId, assuntoId) => {
  try {
    const docRef = doc(db, 'disciplinas', disciplinaId, 'assunto', assuntoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: assuntoId };
    } else {
      throw new Error('Assunto not found');
    }
  } catch (error) {
    console.error('Error getting assunto: ', error);
    throw new Error('Could not get assunto');
  }
};

// Função para adicionar um novo assunto a uma disciplina específica
export const addAssunto = async (disciplinaId, novoAssunto) => {
  try {
    const docRef = collection(db, 'disciplinas', disciplinaId, 'assunto');
    const docRefResult = await addDoc(docRef, novoAssunto);
    return { ...novoAssunto, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding assunto: ', error);
    throw new Error('Could not add assunto');
  }
};

// Função para atualizar um assunto existente
export const updateAssunto = async (disciplinaId, assuntoId, updatedAssunto) => {
  try {
    const assuntoRef = doc(db, 'disciplinas', disciplinaId, 'assunto', assuntoId);
    await updateDoc(assuntoRef, updatedAssunto);
    return { ...updatedAssunto, id: assuntoId };
  } catch (error) {
    console.error('Error updating assunto: ', error);
    throw new Error('Could not update assunto');
  }
};

// Função para excluir um assunto
export const deleteAssunto = async (disciplinaId, assuntoId) => {
  try {
    const assuntoRef = doc(db, 'disciplinas', disciplinaId, 'assunto', assuntoId);
    await deleteDoc(assuntoRef);
  } catch (error) {
    console.error('Error deleting assunto: ', error);
    throw new Error('Could not delete assunto');
  }
};
