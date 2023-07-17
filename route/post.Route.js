const express = require("express");
const  postModel =require("../model/post.moel")
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query={};
  try {
    const {device} =req.query;

    if (device) {
      query.device=device;
    }

    const posts=await postModel.find(query);
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new postModel(payload);
    await newPost.save();
    res.send("Post created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const {id} =req.params;
    const post = await postModel.findById(id);
    if (!post) {
      res.status(404).send({ message:"Post not found"});
    } else {
      res.send({post});
    }
  } catch(error) {
    console.log(error.message);
    res.status(500).send({message:"Something went wrong"});
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const {id}=req.params;
  const payload=req.body;
  try {
    const post=await postModel.findById(id);
    const userID_in_post=post.userID;
    const userID_in_req =req.body.userID;
    if (userID_in_post!==userID_in_req) {
      res.status(401).send({ message:"You are not authorized to proceed" });
    } else {
      await postModel.findByIdAndUpdate(id, payload);
      res.send("Updated post successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message:"Something went wrong" });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const post = await postModel.findById(id);
    const userID_in_post =post.userID;
    const userID_in_req =req.body.userID;
    if (userID_in_post!==userID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed" });
    } else {
      await postModel.findByIdAndDelete(id);
      res.send("Deleted post successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = {
  postRouter,
};
