const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Homepage";
    },
  },
  {
    // * = all route can be accessed with all http mehthod
    method: "*",
    path: "/",
    handler: (request, h) => {
      return "Halaman tidak dapat diakses dengan method tersebut";
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return "About page";
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return "Halaman tidak dapat diakses dengan method";
    },
  },
  {
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name = "stranger" } = request.params;
      const { lang } = request.query;
      if (lang === "id") {
        return `Hai, ${name}!`;
      }
      return `Hello, ${name}!`;
    },
  },
  {
    method: "*",
    // any* = to handle all request from undefined path
    path: "/{any*}",
    handler: (request, h) => {
      return "Halaman tidak ditemukan";
    },
  },
];

module.exports = routes;
