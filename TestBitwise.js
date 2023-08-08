function calcTarget() {
  let input = 0x111101;

  const exponentBytes = (input >>> 24) - 3;

  console.log(exponentBytes);
  const exponentBits = exponentBytes * 8;
  const coefficient = input & 0xffffff;
  return coefficient << exponentBits;
}

const result = calcTarget();
console.log(result);
