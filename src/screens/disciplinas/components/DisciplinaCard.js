import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { db, collection, getDocs } from "../../../firebase/firebaseConfig";
import * as Progress from 'react-native-progress';
import { calculatePercentage } from '../../../components';

const DisciplinaCard = ({ navigation, disciplina }) => {
  const [assuntosTotais, setAssuntosTotais] = useState(0);
  const [assuntosCompletos, setAssuntosCompletos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assuntoRef = collection(db, 'disciplinas', disciplina.id, 'assunto');
        const assuntoSnap = await getDocs(assuntoRef);

        let total = 0;
        let completos = 0;

        assuntoSnap.forEach(doc => {
          total += 1;

          if (doc.data()["estado"] === 'Finalizado') {
            completos += 1;
          }
        });

        setAssuntosTotais(total);
        setAssuntosCompletos(completos);
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation]);

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate(
            'DisciplinaDetalhes', 
            { id: disciplina.id }
          )
        }
      > 
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text>
            {disciplina.nome}
          </Text>

          <Text style={{ fontSize: 20 }}>
            {calculatePercentage(assuntosCompletos, assuntosTotais)}%
          </Text>
        </View>

        <View style={{ marginVertical: 8 }}>
          <Progress.Bar 
            progress={assuntosTotais ? assuntosCompletos / assuntosTotais : 0} 
            width={null}
            height={12}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        </View>

        <Text style={{ fontSize: 18, color: '#505050' }}>
          {assuntosCompletos} de {assuntosTotais} assuntos foram estudados
        </Text>
      </Pressable>
    </View>
  )
};

export default DisciplinaCard;
