const fs = require("fs");
const { resolve } = require("path");

const firstReadableStream = fs.createReadStream(
  resolve(__dirname, "articles.txt"),
  {
    highWaterMark: 15,
  }
);

firstReadableStream.on("readable", () => {
  try {
    process.stdout.write(`[${firstReadableStream.read()}]`);
  } catch (error) {
    // catch the error when the chunk cannot be read.
  }
});

firstReadableStream.on("end", () => {
  console.log("Done");
});
// =================================================================

/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */

const readableStream = fs.createReadStream(resolve(__dirname, "input.txt"), {
  highWaterMark: 15,
});

const writableStream = fs.createWriteStream(resolve(__dirname, "output.txt"));

readableStream.on("readable", () => {
  try {
    writableStream.write(`${readableStream.read()}\n`);
  } catch (error) {
    // catch the error when the chunk cannot be read.
  }
});

readableStream.on("end", () => {
  writableStream.end();
});
