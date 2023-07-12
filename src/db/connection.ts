const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/student-api", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error: any) => {
    console.log(error);
  });

module.exports = mongoose;
