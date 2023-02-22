const readableNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default readableNumber;
