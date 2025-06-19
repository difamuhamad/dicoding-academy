function fibonacci(n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }
  let result = fibonacci(n - 1);
  result.push(result[result.length - 1] + result[result.length - 2]);
  return result;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
