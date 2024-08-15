import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getLeituraById } from './../../services/leiturasService';
import { Pressable, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Container, Title, calculatePercentage } from '../../components';
import Estado from './components/Estado'
import Info from './components/Info'
import ProcessoPaginas from './components/ProcessoPaginas'
import ProcessoCapitulos from './components/ProcessoCapitulos'

export default LeituraDetalhes = () => {
  // Hook de navegação
  const navigation = useNavigation();
  // Obtém o ID da redação dos parâmetros da rota
  const { id } = useRoute().params;

  const [leitura, setLeitura] = useState({});
  
  // Função para buscar dados da redação e suas competências
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const leituraData = await getLeituraById(id);
      setLeitura(leituraData)
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Usa efeito para buscar dados sempre que o componente ganhar foco
  useFocusEffect(
    useCallback(() => {
      fetchData(); 
    }, [fetchData])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { gap: 8 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Erro ao carregar a leitura
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
    );
  }

  const handlePaginasChange = (novoValor) => {
    setLeitura(prevLeitura => ({
      ...prevLeitura,
      atualPaginas: novoValor,
    }));
  };

  const handleCapitulosChange = (novoValor) => {
    setLeitura(prevLeitura => ({
      ...prevLeitura,
      atualCapitulos: novoValor,
    }));
  };

  return (
    <Container>
      <View>
        <View style={styles.header}>
          <Title>{leitura.livro}</Title>
          
          <Pressable 
              style={styles.editButton}
              onPress={() => navigation.navigate(
                'LeituraAlterar',
                { data: leitura }
              )}
              >
              <MaterialIcons name="edit" size={26} color="#505050" />
          </Pressable>
        </View>

        <Estado estado={leitura.estado} />
      </View>

      <View style={{ marginHorizontal: -20, marginBottom: 10 }}>
        <Info 
          title="Autor"
          info={leitura.autor}
          />

        <Info 
          title="Vestibular"
          info={leitura.vestibular}
          />
        
        <Info 
          title="Início"
          info={leitura.dataInicio}
          />

        <Info 
          title="Termínio"
          info={leitura.dataTerminio}
        />
      </View>

      { leitura.id && ( // verifica se o id da leitura está definido
        <View>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
              Processo de leitura
            </Text>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <FontAwesome name="book" size={24} color="black" />
                  <Text style={{ fontSize: 18, fontWeight: '600', textTransform: 'uppercase' }}>
                    Páginas
                  </Text>
                </View>

                <View>
                  <ProcessoPaginas
                    leitura={leitura}
                    atual={leitura.atualPaginas}
                    total={leitura.totalPaginas}
                    onPaginasChange={handlePaginasChange}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 18 }}>
                <View style={{ flex: 1 }}>
                  <Progress.Bar 
                    progress={Number(leitura.atualPaginas) / Number(leitura.totalPaginas)} 
                    width={null}
                    height={24}
                    color={'rgba(88, 94, 255, 1)'}
                    unfilledColor={'rgba(217, 217, 217, 1)'}
                    borderWidth={0}
                  />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>
                  {calculatePercentage(leitura.totalPaginas, leitura.atualPaginas)}%
                </Text>
              </View>

              <View style={{ marginHorizontal: -20 }}>
                <Info 
                  title={"Leitura atual"}
                  info={`${leitura.atualPaginas} páginas`}
                  center={true}
                />

                <Info 
                  title={"Total"}
                  info={`${leitura.totalPaginas} páginas`}
                  center={true}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14  }}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <FontAwesome name="book" size={24} color="black" />
                  <Text style={{ fontSize: 18, fontWeight: '600', textTransform: 'uppercase' }}>
                    Capítulos
                  </Text>
                </View>

                <View>
                  <ProcessoCapitulos
                    leitura={leitura}
                    atual={leitura.atualCapitulos}
                    total={leitura.totalCapitulos}
                    onCapitulosChange={handleCapitulosChange}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 18 }}>
                <View style={{ flex: 1 }}>
                  <Progress.Bar 
                    progress={Number(leitura.atualCapitulos) / Number(leitura.totalCapitulos)} 
                    width={null}
                    height={24}
                    color={'rgba(88, 94, 255, 1)'}
                    unfilledColor={'rgba(217, 217, 217, 1)'}
                    borderWidth={0}
                  />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>
                  {calculatePercentage(leitura.totalCapitulos, leitura.atualCapitulos)}%
                </Text>
              </View>

              <View style={{ marginHorizontal: -20 }}>
                <Info 
                  title={"Capítulo atual"}
                  info={`${leitura.atualCapitulos} capítulos`}
                  center={true}
                />

                <Info 
                  title={"Total"}
                  info={`${leitura.totalCapitulos} capítulos`}
                  center={true}
                />
              </View>
          </View>
        </View>
      )}
    </Container> 
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20
  },
  editButton: {
    padding: 6,
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});