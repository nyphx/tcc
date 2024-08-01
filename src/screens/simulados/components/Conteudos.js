import React from 'react';
import Disciplina from './Disciplina';

const Conteudos = (simulado) => {
  const elementos = [];
  if (simulado.conteudos) {
    for (let disciplina in simulado.conteudos) {
      if (simulado.conteudos.hasOwnProperty(disciplina)) {
        let dados = simulado.conteudos[disciplina];
        elementos.push(
          <Disciplina 
            key={disciplina} 
            disciplina={disciplina} 
            dados={dados}
          />
        );
      }
    }
  }
  return elementos;
};

export default Conteudos;
