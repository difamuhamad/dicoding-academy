// Initialize map
const gedungSateCoor = [-6.9025, 107.6191];
const myMap = L.map("map", {
  zoom: 15,
  center: gedungSateCoor,
  scrollWheelZoom: false,
});

// Set base map
const osmTileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const osmTile = L.tileLayer(osmTileUrl, {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
});
osmTile.addTo(myMap);

// baseTile.addTo(myMap)

//  Add MapTiler layer
const mtLayer = L.maptilerLayer({
  apiKey: "l0k8QaqXz3gvxaWweUYr",
  style:
    "https://api.maptiler.com/maps/019627f6-b03b-7098-b4db-f5cccaeb8202/style.json?key=4izbLKo9wl8vyxLCgXGW", //Optional
});

mtLayer.addTo(myMap);
