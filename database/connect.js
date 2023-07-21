const mongose = require("mongoose");

const connectDb = async () => {
  try {
    await mongose.connect(process.env.URL).then(() => {
      console.log("db connected sucessfully...");
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
