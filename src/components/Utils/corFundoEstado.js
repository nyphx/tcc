const corFundo = (estado) => {
  if (estado === "Lendo") {
    return '#B5E08A';
  } else if (estado === "Parado") {
    return '#E09A8A';
  } else if (estado === "Finalizado" ) {
    return '#ccc';
  } else {
    return '#A2B5E6';
  }
};

export default corFundo;