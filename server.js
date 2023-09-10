const app = require("./src/app");

const PORT = process.env.DEV_PORT || 3058;

const server = app.listen(PORT, () => {
  console.log(`Started with port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Closed server");
  });
});
