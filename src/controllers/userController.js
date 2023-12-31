import { Router } from "express";
const router = Router();
import User from "../models/user.js";


//object shape

router.get("/", async (req, res) => {
  try {

    const users = await User.find();
    res.status(200).json({
      result: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error!",
    });

  }
});

router.get("/:id", async (req, res) => {

    try {
       if (req.params.id.length !== 24){
        res.status(400).json({
            message: "ID not valid"
        })
       }
      const user = await User.findOne({
        _id: req.params.id
      });
    if (user && user.length > 0) {
      res.status(200).json({
        result: user,
      })
    } else {
        res.status(404).json({
            message: "User not found!"
        })
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error!",
      });
  
    }
  });

router.post("/", async (req, res) => {
    const reqData = req.body;
    try {
        const user = await User.create({...reqData, registeredDate: Date.now()});
        
        res.status(201).json(user)
    } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error!",
        });
    }
});

router.delete("/:id", async (req, res) => {
    //put id in try block in case there was no id so it does not throw error
    try {
        const userId = req.params.id;
        await User.deleteOne({
            _id: userId
        })
        res.status(200).json({ message: 'User deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error!",
        });
    }
});
//User.updateOne()

//route-binding : thing after / is :id, so req.params."id" has to match :"id".
router.put("/:id", async (req, res) => {
    const objectId = req.params.id;
    const reqbody = req.body;
    try {
        await User.updateOne({
           _id: objectId
        }, {...reqbody});
        res.status(200).json({ message: 'User updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error!',
        });
    }
});
export const UserController = router;
