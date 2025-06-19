function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1); // func() will executed first
}

console.log(factorial(5));

// Jangan hapus kode di bawah ini!
export default factorial;
