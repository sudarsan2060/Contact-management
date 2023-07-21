const express = require("express");
const connectDb = require("./database/connect");
const errorhandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const app = express();
connectDb();
//middlewares
app.use(express.json());
app.use(errorhandler);
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/user", require("./routes/user"));

// app connection
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`server is running at port ...${port}`);
});
