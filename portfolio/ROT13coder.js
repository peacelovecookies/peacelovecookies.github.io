const rot13 = (str) => {
  const table = {
    A: 'N', B: 'O', C: 'P', D: 'Q',
    E: 'R', F: 'S', G: 'T', H: 'U',
    I: 'V', J: 'W', K: 'X', L: 'Y', 
    M: 'Z', 
    N: 'A', O: 'B', P: 'C', Q: 'D',
    R: 'E', S: 'F', T: 'G', U: 'H',
    V: 'I', W: 'J', X: 'K', Y: 'L', 
    Z: 'M',
  };
  const decoded = str.split('').map(elem => elem.toLowerCase() !== elem ? table[elem] : elem).join('');
  return decoded;
};

export default rot13;
