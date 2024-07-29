const calculatePercentage = (total, value) => {
  if (total === 0) {
    return '0'; // Retorna como string para garantir compatibilidade com o JSX
  }
  const percentage = (value / total) * 100;
  return percentage.toFixed(0); // Arredonda para o inteiro mais próximo
};

export default calculatePercentage;