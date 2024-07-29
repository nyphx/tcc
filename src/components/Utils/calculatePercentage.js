const calculatePercentage = (total, value) => {
  if (total === 0) {
    return 0;
  }
  return ((value / total) * 100).toFixed();
};

export default calculatePercentage;