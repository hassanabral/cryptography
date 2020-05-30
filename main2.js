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

// Generates all possible combinations of binary with initialFillLength, and find
// the true register steam by comparing the stream with the cipher steam.
/* @params:
  initialFillLength: The length of register (initial fills)
  arr: An array to store the bits
  cipherArr: The cipher in binary
  drivingPoly: The driving polynomial */

let global = [];

function meetInMiddlePlain (initialFillLength, arr, i, plain, drivingPoly) {
  if (i === initialFillLength) {
    // 1. Use the driving polynomial to get the whole key stream
    let keyStream = [...arr];
    for (let j = initialFillLength; j < plain.length; j++) {
      const firstBit = keyStream[j - (initialFillLength - drivingPoly[0])];
      const secondBit = keyStream[j - (initialFillLength - drivingPoly[1])];
      const thirdBit = keyStream[j - (initialFillLength - drivingPoly[2])];
      const fourthBit = keyStream[j - (initialFillLength - drivingPoly[3])];
      const newBit = fourBitXOR(firstBit, secondBit, thirdBit, fourthBit);

      keyStream.push(newBit);
    }
    // 2. get the resulting cipher1 array by XORing plain with key stream
    let cipher1 = [];
    for(let j = 0; j < plain.length; j++) {
      cipher1.push(xor(plain[j], keyStream[j]));
    }
    // 3. store cipher1 inside a an global array
    global.push(cipher1);

    return;
  }

  // First assign "0" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 0;
  meetInMiddlePlain(initialFillLength, arr, i + 1, plain, drivingPoly);

  // And then assign "1" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 1;
  meetInMiddlePlain(initialFillLength, arr, i + 1, plain, drivingPoly);
}

let global2 = [];
function meetInMiddleCipher (initialFillLength, arr, i, cipher, drivingPoly) {
  if (i === initialFillLength) {
    // 1. Use the driving polynomial to get the whole key stream
    let keyStream = [...arr];
    for (let j = initialFillLength; j < cipher.length; j++) {
      const firstBit = keyStream[j - (initialFillLength - drivingPoly[0])];
      const secondBit = keyStream[j - (initialFillLength - drivingPoly[1])];
      const thirdBit = keyStream[j - (initialFillLength - drivingPoly[2])];
      const fourthBit = keyStream[j - (initialFillLength - drivingPoly[3])];
      const newBit = fourBitXOR(firstBit, secondBit, thirdBit, fourthBit);

      keyStream.push(newBit);
    }
    // 2. get the resulting cipher1 array by XORing plain with key stream
    let cipher1 = [];
    for(let j = 0; j < cipher.length; j++) {
      cipher1.push(xor(cipher[j], keyStream[j]));
    }
    global2.push(cipher1);
    // 3. compare the current key stream against the bit stream in global array

    for(let k = 0; k < global.length; k++) {
      for(let l = 0; l < global[k].length; l++) {
        if(global[k][l] !== cipher1[l]) {
          break;
        } else if(l === 63) {

          console.log(`The correct initial ${initialFillLength} fills of R1 is:`);
          // let R1KeyStream = [];
          // for(let r = 0; r < 16; r++) {
          //   R1KeyStream.push(xor(global[k][r], ))
          // }
          console.log(global[k].slice(0, 16));
          // console.log(R1KeyStream);
          console.log(`The correct initial ${initialFillLength} fills of R2 is:`);
          // console.log(arr);
          console.log(cipher1.slice(0, 24));
          return;
        }
      }

    }

    return;
  }

  // First assign "0" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 0;
  meetInMiddleCipher(initialFillLength, arr, i + 1, cipher, drivingPoly);

  // And then assign "1" at ith position
  // and try for all other permutations
  // for remaining positions
  arr[i] = 1;
  meetInMiddleCipher(initialFillLength, arr, i + 1, cipher, drivingPoly);
}

// Main driver
const plainHex = "FE DC BA 01 23 45 67 89";
const cipherHex = 'E3 3F 8C 5F DF D7 58 C7';

const plainBinary = hexString2bin(plainHex).split('').map(item => parseInt(item, 10));
const cipherBinary = hexString2bin(cipherHex).split('').map(item => parseInt(item, 10));

let arr1 = [];
const drivingPoly1 = [0, 2, 3, 5, 16];
// meetInMiddlePlain(drivingPoly1[4], arr1, 0, plainBinary, drivingPoly1);
// global.sort();
// console.log(global.length);

let arr2 = [];
const drivingPoly2 = [0, 1, 3, 4, 24];
meetInMiddleCipher(drivingPoly2[4], arr2, 0, cipherBinary, drivingPoly2);
console.log(global2.length);



// console.table(global[65535]);
// console.log(global.length);
// console.log(global[0].length);
// 2^24 = 16,777,216 --> 8 digits








