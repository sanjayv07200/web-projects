function reverseArr(arr) {
  let i = 0;
  let n = arr.length;
  while (i < n / 2) {
    let temp = arr[i];
    arr[i] = arr[n - 1 - i];
    arr[n - 1 - i] = temp;
    i++;
  }
  return arr;
}
console.log(reverseArr([1, 2, 3, 4]));
