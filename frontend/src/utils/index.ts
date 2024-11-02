export const formattedDecimal = (decimalPart: number) => {
  const formattedDecimal = decimalPart === 0 ? '00' : decimalPart.toString().padStart(2, '0');
  return formattedDecimal;
};

export const formattedNumberWithUnits = (number: number): string => {
  return new Intl.NumberFormat('en-US').format(number);
};