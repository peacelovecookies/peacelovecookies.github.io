const convertToRoman = (num) => {
 const thousands = Math.floor(num/1000);
 const hundreds = Math.floor(num%1000/100);
 const tens = Math.floor(num%1000%100/10);
 const ones = num%1000%100%10;
 
 let Ms = '';
  for (let counter = thousands; counter > 0; counter--) {
    Ms += 'M';
  }
  
  const toRoman = (number, tenth, half, one) => {
    switch(number) {
      case 0:
        return '';
      case 1:
        return tenth;
      case 2:
        return tenth+tenth;
      case 3:
        return tenth+tenth+tenth;
      case 4:
        return tenth+half;
      case 5:
        return half;
      case 6:
        return half+tenth;
      case 7:
        return half+tenth+tenth;
      case 8:
        return half+tenth+tenth+tenth;
      case 9:
        return tenth+one;
    }
  };
  
  const Cs = toRoman(hundreds, 'C', 'D', 'M');
  const Xs = toRoman(tens, 'X', 'L', 'C');
  const Is = toRoman(ones, 'I', 'V', 'X');
  return `${Ms}${Cs}${Xs}${Is}`;
};

export default convertToRoman;
