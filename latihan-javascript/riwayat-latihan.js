function convertCelsiusToFahrenheit(temperature) {
  const temperatureInFahrenheit = (9 / 5) * temperature + 32;

  console.log("Hasil konversi:", temperatureInFahrenheit);
}
const temperatureInCelsius = 90;
convertCelsiusToFahrenheit(temperatureInCelsius);
// //-----------------------------------------------------

// hello function
function hello(name, origin = "Bandung") {
  return `Halo! Nama saya ${name}. Saya tinggal di ${origin}.`; // Jangan lupa backtick
}
const rahmat = hello("Rahmat", "Semarang");
const indra = hello("Indra");

console.log(rahmat);
console.log(indra);
// -----------------------------------------------------

const karyawan = [
  {
    name: "Fulan",
    email: "fulan@dicoding.com",
    joinYear: 2020,
  },
];
function tambahKaryawan(name, email, joinYear) {
  const data = { name, email, joinYear };
  karyawan.push(data);
}
tambahKaryawan("budi", "budi@gaming.com", 2030);
tambahKaryawan("Siti", "santy@email.com", 2022);

console.log(...karyawan);

console.log(karyawan[2]);

/**
 * @TODO
 * lengkapi fungsi ini agar dapat menambahkan objek employee baru
 * berdasarkan nilai argumen fungsi dan simpan ke dalam array `employees`
 */

// -----------------------------------------------------
// menghitung  total gaji yang di dapat dalam satu bulan dengan input minimal;
//-nama karyawan
//-gaji perhari
//-jumlah hari masuk kerja

//Cara 1.
function hitungGaji(nama, absen) {
  console.log("Karyawan :", nama, "Gaji anda sebesar :", 300000 * absen);
}
const gajiKaryawan1 = hitungGaji("Adit", 25);

// Cara 2.
function hitungGaji2(nama, absen) {
  console.log("Nama karyawan :", nama);
  console.log("Gaji bulan ini :", (gaji = 300000 * absen));
}
const karyawan2 = hitungGaji2("Budi", 30);
// -----------------------------------------------------
function categorizeNumber(input) {
  // 1. Jika input bukan number, bangkitkan (throw) error.
  if (typeof input !== "number") {
    throw new Error("Input harus berupa number");
  }

  // 5. Jika input adalah nol, kategorikan kembalikan dengan nilai "Nol".
  if (input === 0) {
    return "Nol";
  }

  // 6. Jika input negatif, kembalikan dengan nilai "Negatif".
  if (input < 0) {
    return "Negatif";
  }

  // Fungsi untuk memeriksa apakah bilangan adalah bilangan prima
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  // 4. Jika input adalah bilangan prima, kembalikan dengan nilai "Prima".
  if (isPrime(input)) {
    return "Prima";
  }

  // 2. Jika input adalah bilangan genap, kembalikan dengan nilai "Genap".
  if (input % 2 === 0) {
    return "Genap";
  }

  // 3. Jika input adalah bilangan ganjil, kembalikan dengan nilai "Ganjil".
  return "Ganjil";
}

// Contoh
console.log(categorizeNumber(15)); // Output: "Ganjil"
console.log(categorizeNumber(12)); // Output: "Genap"
console.log(categorizeNumber(17)); // Output: "Prima"
console.log(categorizeNumber(0)); // Output: "Nol"
console.log(categorizeNumber(-5)); // Output: "Negatif"
// -----------------------------------------------------

const html = true;
const css = true;
const javascript = false;

const kepahaman = function (materi) {
  const mengerti = true;
  const bingung = false;

  if ((materi = false)) {
    console.log("Saya belum mengerti materi ini");
  } else (materi = true) => console.log("Saya sudah mengerti");
};

kepahaman(html);

// -----------------------------------------------------
// Parent Class Animal
class Animal {
  constructor(name, age, isMammal) {
    this.name = name;
    this.age = age;
    this.isMammal = isMammal;
  }
}

// Extends Class
class Rabbit extends Animal {
  constructor(name, age) {
    super(name, age, true);
  }
  eat() {
    return `${this.name} sedang makan!`;
  }
}

class Eagle extends Animal {
  constructor(name, age) {
    super(name, age, false);
  }
  fly() {
    return `${this.name} sedang terbang!`;
  }
}

// Create new Object
const myRabbit = new Rabbit("Labi", 2);
const myEagle = new Eagle("Elo", 4);

console.log(myRabbit.eat());
console.log(myEagle.fly());
// -----------------------------------------------------

function apply(operation, ...args) {
  // kita bisa menambahkan kode lain sebelum operation dijalankan.

  return operation(...args);
}

function sum(a, b, c) {
  return a + b + c;
}

function discount(disc, value) {
  return value - (disc / 100) * value;
}

const productPrice = apply(sum, 100, 100, 200);
const withDiscount = apply(discount, 25, productPrice);

console.log("Product price:", productPrice); // Output: Product price: 400
console.log("With discount 25%:", withDiscount); // Output: With discount 25%: 300
// -----------------------------------------------------
function adjectivfy(adjective) {
  return function (noun) {
    return `${noun} ${adjective}.`;
  };
}

function multipleBy(x) {
  return function (y) {
    return x * y;
  };
}

const coolifier = adjectivfy("keren");
const funnifier = adjectivfy("seru");

const multipleByFive = multipleBy(5);

console.log(coolifier("Dicoding")); // Output: Dicoding keren.
console.log(funnifier("JavaScript")); // Output: JavaScript seru.
console.log(multipleByFive(7)); // Output: 35
console.log(multipleByFive(10)); // Output: 50
// ---------------------------------------

function addOne(x) {
  return x + 1;
}

function square(x) {
  return x * x;
}

function compose(f, g) {
  return (x) => {
    return f(g(x));
  };
}

const addOneAndSquare = compose(square, addOne);

console.log(addOneAndSquare(2)); // output: 9
// ---------------------------------------

// Recursive function (membuat data yg baru, bukan mengubah data)
function generateArray(n) {
  if (n < 0) {
    return [];
  }

  return [...generateArray(n - 1), n];
}

console.log(generateArray(5)); // Output: [0, 1, 2, 3, 4, 5]
// ---------------------------------------

// Menjadikan suatu function Immutable (tidak bisa diubah)
function max(arrayOfNumber) {
  // menggunakan spread operator untuk menduplikasi nilai arrayOfNumber
  return [...arrayOfNumber].sort((a, b) => a - b).pop();
}

function registerEmail(person, email) {
  // menggunakan spread operator untuk menduplikasi nilai person
  return { ...person, email };
}

const numbers = [10, 23, 24, 7, 42, 18];
const largest = max(numbers);

console.log(largest); // Output: 42
console.log(numbers); // Output: [ 10, 23, 24, 7, 42, 18 ]

const person = {
  name: "John",
  username: "johndoe",
};

const personWithEmail = registerEmail(person, "john@dicoding.com");

console.log(person); // Output: { name: 'John', username: 'johndoe' }
console.log(personWithEmail); // Output: { name: 'John', username: 'johndoe', email: 'john@dicoding.com' }
// ---------------------------------------

const sampleProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Phone", category: "Electronics", price: 500 },
  { id: 3, name: "Shirt", category: "Apparel", price: 50 },
  { id: 4, name: "Shoes", category: "Apparel", price: 80 },
  { id: 5, name: "Watch", category: "Accessories", price: 200 },
];

function getProductsByCategory(products, category) {
  /**
   * TODO:
   * Gunakan metode array immutable untuk mengembalikan array produk yang termasuk dalam kategori yang diberikan.
   */
  const product = products.filter((products) => products.category == category);
  return product;
}

function findProductById(products, id) {
  /**
   * TODO:
   * Gunakan metode array immutable untuk mengembalikan produk dengan ID yang cocok.
   */
  const product = products.find((products) => products.id == id);
  return product;
}

function calculateTotalPrice(products) {
  /**
   * TODO:
   * Gunakan metode array immutable untuk menghitung total harga semua produk.
   */
  const nilaiAwal = 0;
  const product = products.reduce(
    (total, product) => total + product.price,
    nilaiAwal
  );
  return product;
}

function applyDiscount(products, discount) {
  /**
   * TODO:
   * Gunakan metode array immutable untuk mengembalikan array baru,
   * di mana setiap produk memiliki harga yang sudah dikurangi dengan diskon yang diberikan.
   */
  const product = products.map((product) => ({
    ...product,
    price: product.price * (1 - discount / 100),
  }));
  return product;
}
// Menghitung Harga dengan Diskon:

// price: product.price * (1 - discount / 100) menghitung harga baru setelah diskon diterapkan.
// Untuk diskon 30%, discount / 100 menjadi 30 / 100 yaitu 0.3.
// (1 - discount / 100) menjadi 1 - 0.3 yaitu 0.7.
// product.price * 0.7 menghitung harga baru setelah diskon. Misalnya, harga asli 1000 dengan diskon 30% akan menjadi 700.

console.log(getProductsByCategory(sampleProducts, "Electronics")); // Should return products with id 1 and 2
console.log(calculateTotalPrice(sampleProducts)); // Should return 1830
console.log(applyDiscount(sampleProducts, 10)); // Should return products with prices reduced by 10%
console.log(findProductById(sampleProducts, 3)); // Should return the product with id 3

// ---------------------------------------
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Ups!")), 2000)
);
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 3000));

// Concurency dengan Promise
// Promise.all (1 error maka semua akan di rejected)
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("Success");
    console.log(values);
  })
  .catch((error) => {
    console.log("Failed");
    console.log(error.message);
  });

// Promise.allSettled (Semua akan dikembalikan walaupun ada yg error)
Promise.allSettled([promise1, promise2, promise3])
  .then((values) => {
    console.log("Success");
    console.log(values);
  })
  .catch((error) => {
    console.log("Failed");
    console.log(error.message);
  });
