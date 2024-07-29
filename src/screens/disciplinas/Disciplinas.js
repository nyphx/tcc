import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { db, collection, getDocs } from "../../firebase/firebaseConfig";
import { Container, RedirectButton, CountTitle } from '../../components';
import DisciplinaCard from './components/DisciplinaCard'; 

const fetchDisciplinas = async () => {
  try {
    const docRef = collection(db, 'disciplinas');
    const docSnap = await getDocs(docRef);
    return docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const DisciplinaSection = ({ title, count, bgColor, textColor, disciplinas, navigation }) => (
  <View>
    <CountTitle count={count} title={title} bgColor={bgColor} textColor={textColor} />
    {count !== 0 ? (
      disciplinas.map(disciplina => (
        <DisciplinaCard key={disciplina.id} navigation={navigation} disciplina={disciplina} />
      ))
    ) : (
      <Text>Não há disciplinas {title.toLowerCase()}.</Text>
    )}
  </View>
);

const Disciplinas = ({ navigation }) => {
  const [disciplinas, setDisciplinas] = useState({
    estudando: [],
    finalizado: [],
    parado: [],
    futuro: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const disciplinasData = await fetchDisciplinas();
      setDisciplinas({
        estudando: disciplinasData.filter(disciplina => disciplina.estado === "Estudando"),
        finalizado: disciplinasData.filter(disciplina => disciplina.estado === "Finalizado"),
        parado: disciplinasData.filter(disciplina => disciplina.estado === "Parado"),
        futuro: disciplinasData.filter(disciplina => disciplina.estado === "Futuro")
      });
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation]);

  const { estudando, finalizado, parado, futuro } = disciplinas;

  return (
    <Container>
      <CountTitle 
        count={estudando.length + finalizado.length + parado.length + futuro.length}
        title="Disciplinas"
        bgColor="rgb(191 219 254)"
        textColor="rgb(29 78 216)"
      />
      
      <RedirectButton screen="DisciplinasForm">Adicionar disciplina</RedirectButton>

      <DisciplinaSection 
        title="Estudando" 
        count={estudando.length} 
        bgColor="#B5E08A" 
        textColor="rgb(2 44 34)" 
        disciplinas={estudando} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Parado" 
        count={parado.length} 
        bgColor="#E09A8A" 
        textColor="rgb(69 10 10)" 
        disciplinas={parado} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Futuro" 
        count={futuro.length} 
        bgColor="#ccc" 
        textColor="rgb(8 47 73)" 
        disciplinas={futuro} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Finalizado" 
        count={finalizado.length} 
        bgColor="#A2B5E6" 
        textColor="rgb(30 41 59)" 
        disciplinas={finalizado} 
        navigation={navigation} 
      />
    </Container>
  );
}

export default Disciplinas;
