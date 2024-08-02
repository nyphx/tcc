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

import { v4 as uuidv4 } from 'uuid';

// Função para obter todos os simulados
export const getSimulados = async () => {
  try {
    const docRef = collection(db, 'simulados');
    const docSnap = await getDocs(docRef);
    return docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching simulados: ', error);
    throw new Error('Could not fetch simulados');
  }
};

// Função para adicionar um novo simulado
export const addSimulado = async (newSimulado) => {
  try {
    const docRef = collection(db, 'simulados');
    const docRefResult = await addDoc(docRef, newSimulado);
    return { ...newSimulado, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding simulado: ', error);
    throw new Error('Could not add simulado');
  }
};

// Função para atualizar um simulado existente
export const updateSimulado = async (id, updatedSimulado) => {
  try {
    const docRef = doc(db, 'simulados', id);
    await updateDoc(docRef, updatedSimulado);
    return { ...updatedSimulado, id };
  } catch (error) {
    console.error('Error updating simulado: ', error);
    throw new Error('Could not update simulado');
  }
};

// Função para excluir um simulado
export const deleteSimulado = async (id) => {
  try {
    const docRef = doc(db, 'simulados', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting simulado: ', error);
    throw new Error('Could not delete simulado');
  }
};

// Função para obter um simulado específico por ID
export const getSimuladoById = async (id) => {
  try {
    const docRef = doc(db, "simulados", id);
    const docSnap = await getDoc(docRef);
    return { ...docSnap.data(), id: docSnap.id };
  } catch (error) {
    console.error('Error fetching simulado: ', error);
    throw new Error('Could not fetch simulado');
  }
};

// Função para obter um simulado específico por ID, incluindo os conteúdos
export const getSimuladoWithConteudos = async (id) => {
  try {
    const simuladoRef = doc(db, 'simulados', id);
    const simuladoSnap = await getDoc(simuladoRef);
    const simuladoData = simuladoSnap.data();

    const conteudosArray = Object.keys(simuladoData.conteudos || {}).map(key => ({
      id: uuidv4(),
      nome: key,
      acertadas: simuladoData.conteudos[key].acertadas,
      totais: simuladoData.conteudos[key].totais
    }));

    return { simulado: { ...simuladoData, id: simuladoSnap.id }, conteudos: conteudosArray };
  } catch (error) {
    console.error('Error fetching simulado: ', error);
    throw new Error('Could not fetch simulado');
  }
};

// Função para atualizar um simulado específico por ID
export const updateSimuladoById = async (id, simulado, conteudoFields) => {
  try {
    const simuladoRef = doc(db, 'simulados', id);

    const conteudos = conteudoFields.reduce((acc, field) => {
      acc[field.nome] = {
        acertadas: field.acertadas,
        totais: field.totais
      };
      return acc;
    }, {});

    const simuladoData = {
      ...simulado,
      conteudos
    };

    await updateDoc(simuladoRef, simuladoData);
  } catch (error) {
    console.error('Error updating simulado: ', error);
    throw new Error('Could not update simulado');
  }
};

// Função para excluir um simulado específico por ID
export const deleteSimuladoById = async (id) => {
  try {
    const simuladoRef = doc(db, 'simulados', id);
    await deleteDoc(simuladoRef);
  } catch (error) {
    console.error('Error deleting simulado: ', error);
    throw new Error('Could not delete simulado');
  }
};