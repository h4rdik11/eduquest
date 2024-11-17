require("colors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { InitializeRoutes } = require("./routes");
const { createDbInstance } = require("./config");

const app = express();
const PORT = process.env.PORT;
const db = createDbInstance();

app.use(bodyParser.json());

app.use(cors());

// INITIALIZING ROUTES
InitializeRoutes(app);

app.listen(PORT, function listenCallback(err) {
  if (err) {
    console.error(`TROUBLE OPENING PORT : `, JSON.stringify(err, null, 2));
  } else {
    console.log(`SERVER STARTED AT PORT : ${PORT}`);
  }
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@eduquestdb.eudj1.mongodb.net/?retryWrites=true&w=majority&appName=eduquestDB`;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);
