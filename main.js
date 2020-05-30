// XOR binary
function xor (a, b) {
  if ((a === 1 && b === 1) || (a === 0 && b === 0)) {
    return 0;
  } else if ((a === 1 && b === 0) || (a === 0 && b === 1)) {
    return 1;
  }
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

// Generates all possible combinations of binary with initialFillLength, and find
// the true register steam by comparing the stream with the cipher steam.
/* @params:
  initialFillLength: The length of register (initial fills)
  arr: An array to store the bits
  cipherArr: The cipher in binary
  drivingPoly: The driving polynomial */
function findCorrectRegisterStream (initialFillLength, arr, i, cipherArr, drivingPoly) {
  if (i === initialFillLength) {
    // 1. Use the driving polynomial to get the whole R stream
    let registerStream = [...arr];
    for (let j = initialFillLength; j < cipherArr.length; j++) {
      const firstBit = registerStream[j - (initialFillLength - drivingPoly[0])];
      const secondBit = registerStream[j - (initialFillLength - drivingPoly[1])];
      const newBit = xor(firstBit, secondBit);

      registerStream.push(newBit);
    }

    // 2. Compare the bits of register stream with cipher
    let counter = 0;
    for(let k = 0; k < cipherArr.length; k++) {
      if(registerStream[k] === cipherArr[k]) {
        counter = counter + 1;
      }
    }
    const probability = counter / cipherArr.length;

    // 3. Get the guess that has a matching probability of above 0.6
    if(probability > 0.6) {
      console.log(`The correct initial ${initialFillLength} fills of register ${drivingPoly[3]} is:`);
      console.log(registerStream.slice(0, drivingPoly[2]));
      console.log(`The matching probability of given stream is: ${probability}`);
    }
    return;
  }

  // First assign "0" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 0;
  findCorrectRegisterStream(initialFillLength, arr, i + 1, cipherArr, drivingPoly);

  // And then assign "1" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 1;
  findCorrectRegisterStream(initialFillLength, arr, i + 1, cipherArr, drivingPoly);
}

// Main driver
// returns the cipher as binary array of 1s and 0s
const cipherInBinary = hexString2bin(
  'B6 EF EA 5B D6 BD D2 58 91 17 78 CB 1D B8 65 39 8D ' +
  'D7 CD D9 28 93 14 04 63 31 F0 F7 53 D3 AE EA C1 7F 13 26 ' +
  'ED FF 6C B4 F9 7E 62 43 39 4C 80 3B 38 EB')
  .split('')
  .map(item => parseInt(item, 10));

let arr = [];
const drivingPoly1 = [0, 3, 10, 'R1'];
const drivingPoly2 = [0, 2, 11, 'R2'];
findCorrectRegisterStream(drivingPoly1[2], arr, 0, cipherInBinary, drivingPoly1);





