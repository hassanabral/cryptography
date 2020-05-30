// XOR binary
function xor (a, b) {
  if ((a === 1 && b === 1) || (a === 0 && b === 0)) {
    return 0;
  } else if ((a === 1 && b === 0) || (a === 0 && b === 1)) {
    return 1;
  }
}

function fourBitXOR(a,b,c,d) {
  return xor(xor(xor(a, b), c), d)
}

// converts hex to 8 bit binary
function hex2bin (hex) {
  return ('00000000' + (parseInt(hex, 16)).toString(2)).substr(-8);
}

// Converts the hex key to binary
// returns an array of binary of 1s and 0s
function hexString2bin (str) {
  let result = '';
  str.split(' ').forEach(str => {
    result += hex2bin(str);
  });
  return result;
}

const cipherHex = 'E3 3F 8C 5F DF D7 58 C7';

const plainBinary = hexString2bin(plainHex).split('').map(item => parseInt(item, 10));