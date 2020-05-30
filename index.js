

function getIC (str) {
  const plaintext = str.toLowerCase().replace(/[^a-z]/g, '');
  let counts = new Array(26);
  let totcount = 0;
  for (let i = 0; i < 26; i++) counts[i] = 0;
  for (let i = 0; i < plaintext.length; i++) {
    counts[plaintext.charCodeAt(i) - 97]++;
    totcount++;
  }
  let sum = 0;
  for (let i = 0; i < 26; i++) sum = sum + counts[i] * (counts[i] - 1);
  return sum / (totcount * (totcount - 1));
}

function getFrequency(str) {
  const string = str.replace(/ /g,'');
  const freq = new Array(26).fill(0);
  for (let i=0; i<string.length;i++) {
    const character = string.charAt(i);
    const index = character.charCodeAt(0) - 97 + 32;
    freq[index]++;
  }
  return freq;
}

let input = 'TJMKIOCKMKNSXYYXYYXLLXUXANUXYMKNYNGIBWJIBCNYMUXANUXBMKXYGIOBMUPMKNBNVUXANUWNYLXMNXMYBTSNXYYOLLIYNWJPMKNYNGIBWIJWNYMUXANUIBNTUMKIBJPMKNBXJNUXANUXBTDUXGTXYIJWNU';
console.log('English Letters:     A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z');
console.log('Normal Frequency :',[8, 2, 3, 4, 13, 2, 2, 6, 7, 0, 1, 4, 2, 7, 8, 2, 0, 6, 6, 9, 3, 1, 2, 0, 2, 0]);
console.log('Text Frequency   :', getFrequency(input));
console.log('I.C: ', getIC(input));

function getSubText (str, keyLength) {
  let result = [];
  const plaintext = str.toLowerCase().replace(/[^a-z]/g, '');
  for (let i = 0; i < keyLength; i++) {
    let curr = '';
    let j = i;
    while( j < plaintext.length) {
      curr += plaintext[j];
      j += keyLength;
    }
    result[i] = curr;
  }
  return result;

}



function main(str, keyLength) {
  const subTexts = getSubText(str, keyLength);
  for(let i = 0; i < subTexts.length; i++) {
    console.log(`Subtext ${i+1}: ${subTexts[i]}`);
    console.log('English Letters:     A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z');
    console.log('Normal Frequency :',[8, 2, 3, 4, 13, 2, 2, 6, 7, 0, 1, 4, 2, 7, 8, 2, 0, 6, 6, 9, 3, 1, 2, 0, 2, 0]);
    console.log('Text Frequency   :', getFrequency(subTexts[i].toUpperCase()));
    console.log('');
  }
}

function getText(str) {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for(let i = 0; i < str.length; i++) {
    const index = str[i].charCodeAt(0) - 97;
    console.log(alpha.substring(index, index + 26));
  }
}









// problem 1 answer
function getSubRoutine (str, m , k) {
  const plaintext = str.toLowerCase().replace(/[^a-z]/g, '');
  let subtext = "";
  let i = k - 1;
  while (i < plaintext.length) {
    subtext += plaintext[i];
    i+=m;
  }
  return subtext.toUpperCase();
}

// console.log(getSubRoutine('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5, 3));

