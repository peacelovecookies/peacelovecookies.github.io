const palindrome = str => {
  const filtered = str.replace(/[^0-9a-z]/gi, '').toLowerCase();
  const reversed = filtered.split('').reverse().join('');
  return reversed === filtered;
  };
export default palindrome;
