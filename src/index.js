import express from "express";
import cors from "cors";

import mongoose, { connect } from "mongoose";
import routes from "./controllers/index.js";

connect("mongodb://localhost:27017/wyzantDb");

const app = express();
const PORT = 3002;
app.use(
  cors({
    allowedHeaders: "*",
    methods: "*",
    origin: "*",
  })
);
app.get("/ping", (req, res) => {
  res.json({
    result: "pong",
  });
});
app.use(express.json());
app.use(routes);

// app.get('/user/:userid', async (req, res) => {
//     const userid = Number(req.params.userid);
//     const data = await db.getData("/users");
//     const user = data.filter(u => u.id === userid) //if this conditional is true, we filter to keep the element and get rid of the other ones that are false
//     if (user.length < 1) {
//         res.status(404);
//         return;
//     }
//     res.json(
//         {
//             result: user
//         }
//     )
// } )

app.listen(PORT, () => {
  console.log("API running");
});