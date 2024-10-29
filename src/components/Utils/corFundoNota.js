import calculatePercentage from "./calculatePercentage";

const corFundo = (notaTotal, notaMaxima) => {
  const porcentagem = calculatePercentage(notaMaxima, notaTotal);

  if (porcentagem < 70) {
    return '#FF6961'; // Fundo vermelho
  } else if (porcentagem > 70 && porcentagem <= 90) {
    return '#F8D66D'; // Fundo amarelo
  } else {
    return '#8CD47E'; // Fundo verde
  }
};

export default corFundo;