const question = require("./controller/question");
const config = require("./controller/config");

exports.InitializeRoutes = function InitializeRoutes(app) {
  app.use("/api/question", question);
  app.use("/api/config", config);
};
