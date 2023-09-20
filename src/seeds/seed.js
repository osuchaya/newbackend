import User from "../models/user.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/wyzantDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// .finally will go here if you have code that you want to always run regardless if .then or .catch gets called
// i.e. whether it has error or not
//polymorphism
class UsersSeeder {
  async run() {
    return User.create({
      firstName: "Man",
      age: 26,
      registeredDate: new Date(),
    });
  }

  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then((count) => count === 0);
  }
}
//c# java == called 'reflection'

const seedDB = async () => {
  const seeder = new UsersSeeder();
  const shouldRun = await seeder.shouldRun();
  //shouldRun() - should we run the seeder? JS gonna go do sth else
  //code stop here and wait for seeder.shouldRun to give us response
  //once we get response, either going to be true or false then proceed
  //we check if we should run, we wait for seeder.run
  if (shouldRun) {
    await seeder.run();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
