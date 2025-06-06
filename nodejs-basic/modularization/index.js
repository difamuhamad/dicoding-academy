const initialMemoryUsage = process.memoryUsage().heapUsed; // TODO 1
const yourName = process.argv[2]; // TODO 2
const environment = process.env.NODE_ENV; // TODO 3

for (let i = 0; i <= 10000; i++) {
  // Looping process to show the memory usage
}

const currentMemoryUsage = process.memoryUsage().heapUsed; // TODO 4

console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`);
console.log(
  `Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`
);

// ====================================================

const Tiger = require("./Tiger"); // TODO 3
const Wolf = require("./Wolf"); // TODO 4

const fighting = (tiger, wolf) => {
  if (tiger.strength > wolf.strength) {
    tiger.growl();
    return;
  }

  if (wolf.strength > tiger.strength) {
    wolf.howl();
    return;
  }

  console.log("Tiger and Wolf have same strength");
};

const tiger = new Tiger();
const wolf = new Wolf();

fighting(tiger, wolf);
