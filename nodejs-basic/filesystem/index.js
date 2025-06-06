// TODO: tampilkan teks pada notes.txt pada console.

// Synchronous
const fs = require("fs");

const data = fs.readFileSync("notes.txt", "UTF-8");
console.log(data);

// Asynchronous

const fileReadCallback = (error, data) => {
  if (error) {
    console.log("Failed read file");
    return;
  }
  console.log(data);
};

// fs.readFile("notes.txt", "UTF-8", fileReadCallback);
fs.readFile(resolve(__dirname, "notes.txt"), "UTF-8", fileReadCallback);
