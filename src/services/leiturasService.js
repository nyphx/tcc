import { 
  db, 
  collection, 
  addDoc, 
  getDoc,
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
} from './../firebase/firebaseConfig';

// Função para obter todas as leituras
export const getLeituras = async () => {
  try {
    const docRef = collection(db, 'leituras');
    const docSnap = await getDocs(docRef);
    return docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching leituras: ', error);
    throw new Error('Could not fetch leituras');
  }
};

// Função para adicionar uma nova leitura
export const addLeitura = async (newLeitura) => {
  try {
    const docRef = collection(db, 'leituras');
    const docRefResult = await addDoc(docRef, newLeitura);
    return { ...newLeitura, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding leitura: ', error);
    throw new Error('Could not add leitura');
  }
};

// Função para atualizar uma leitura existente
export const updateLeitura = async (id, updateLeitura) => {
  try {
    const docRef = doc(db, 'leituras', id);
    await updateDoc(docRef, updateLeitura);
    return { ...updateLeitura, id };
  } catch (error) {
    console.error('Error updating leitura: ', error);
    throw new Error('Could not update leitura');
  }
};

// Função para excluir uma leitura 
export const deleteLeitura = async (id) => {
  try {
    const docRef = doc(db, 'leituras', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting leitura: ', error);
    throw new Error('Could not delete leitura');
  }
};

// Função para obter uma redação específica pelo ID
export const getLeituraById = async (id) => {
  const docRef = doc(db, 'leituras', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('No such document!');
  }
};