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

// Função para obter todas as redações
export const getRedacoes = async () => {
  try {
    const docRef = collection(db, 'redacoes');
    const docSnap = await getDocs(docRef);
    return docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error('Error fetching redacoes: ', error);
    throw new Error('Could not fetch redacoes');
  }
};

// Função para adicionar uma nova redação
export const addRedacao = async (newRedacao) => {
  try {
    const docRef = collection(db, 'redacoes');
    const docRefResult = await addDoc(docRef, newRedacao);
    return { ...newRedacao, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding redacao: ', error);
    throw new Error('Could not add redacao');
  }
};

// Função para atualizar uma redação existente
export const updateRedacao = async (id, updatedRedacao) => {
  try {
    const docRef = doc(db, 'redacoes', id);
    await updateDoc(docRef, updatedRedacao);
    return { ...updatedRedacao, id };
  } catch (error) {
    console.error('Error updating redacao: ', error);
    throw new Error('Could not update redacao');
  }
};

// Função para excluir uma redação
export const deleteRedacao = async (id) => {
  try {
    const docRef = doc(db, 'redacoes', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting redacao: ', error);
    throw new Error('Could not delete redacao');
  }
};

// Função para obter uma redação específica pelo ID
export const getRedacaoById = async (id) => {
  const redacaoRef = doc(db, 'redacoes', id);
  const redacaoSnap = await getDoc(redacaoRef);
  if (redacaoSnap.exists()) {
    return redacaoSnap.data();
  } else {
    throw new Error('No such document!');
  }
};

// Função para obter uma redação específica e suas competências
export const getRedacaoWithCompetencias = async (id) => {
  try {
    const redacaoRef = doc(db, 'redacoes', id);
    const competenciasRef = collection(db, 'redacoes', id, 'competencias');

    const redacaoSnap = await getDoc(redacaoRef);
    const competenciasSnap = await getDocs(competenciasRef);

    const redacaoData = { ...redacaoSnap.data(), id: redacaoSnap.id };
    const competenciasData = competenciasSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    return { redacao: redacaoData, competencias: competenciasData };
  } catch (error) {
    console.error('Error fetching redacao with competencias: ', error);
    throw new Error('Could not fetch redacao with competencias');
  }
};

// Função para buscar uma competência específica
export const getCompetencia = async (redacaoId, competenciaId) => {
  try {
    const competenciaRef = doc(db, 'redacoes', redacaoId, 'competencias', competenciaId);
    const competenciaSnap = await getDoc(competenciaRef);

    if (competenciaSnap.exists()) {
      return { ...competenciaSnap.data(), id: competenciaId };
    } else {
      throw new Error('Competencia not found');
    }
  } catch (error) {
    console.error('Error getting competencia: ', error);
    throw new Error('Could not get competencia');
  }
};

// Função para adicionar uma nova competência a uma redação específica
export const addCompetencia = async (id, novaCompetencia) => {
  try {
    const docRef = collection(db, 'redacoes', id, 'competencias');
    const docRefResult = await addDoc(docRef, novaCompetencia);
    return { ...novaCompetencia, id: docRefResult.id };
  } catch (error) {
    console.error('Error adding competencia: ', error);
    throw new Error('Could not add competencia');
  }
};

// Função para atualizar uma competência existente
export const updateCompetencia = async (redacaoId, competenciaId, updatedCompetencia) => {
  try {
    const competenciaRef = doc(db, 'redacoes', redacaoId, 'competencias', competenciaId);
    await updateDoc(competenciaRef, updatedCompetencia);
    return { ...updatedCompetencia, id: competenciaId };
  } catch (error) {
    console.error('Error updating competencia: ', error);
    throw new Error('Could not update competencia');
  }
};

// Função para excluir uma competência
export const deleteCompetencia = async (redacaoId, competenciaId) => {
  try {
    const competenciaRef = doc(db, 'redacoes', redacaoId, 'competencias', competenciaId);
    await deleteDoc(competenciaRef);
  } catch (error) {
    console.error('Error deleting competencia: ', error);
    throw new Error('Could not delete competencia');
  }
};