


export function uuidv4(): string {
  // tslint:disable-next-line:only-arrow-functions
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // tslint:disable-next-line:one-variable-per-declaration no-bitwise prefer-const
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function reverseString(str): string {
  return str.split('').reverse().join('');
}

export function getCombinations(chars: string[], length: number = null, separator: string = ''): string[] {
  const result = [];
  for (const char of chars){
    for (const char2 of chars){
      if (char !== char2){
        result.push(reverseString(char) + separator + char2);
        result.push(char + separator + reverseString(char2));
      }
    }
  }
  return result;
}
