import Post from "../models/listModel.js";
import { Patient } from "../models/authModel.js";



export const createPost = async (req, res) => {
  try {
    const { content, imageUrl, reportUrl, medicalHistory } = req.body;

    console.log(content, imageUrl, reportUrl, medicalHistory);

    if (!content || !medicalHistory) {
      return res.status(400).json({ message: "Content and Medical History are required." });
    }

    let dataObj = {
      content,
      imageUrl,
      reportUrl,
      medicalHistory,
    };

    const newPost = new Post(dataObj); 
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("patientId", "fullName email").populate("verifiedBy", "fullName");
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getPatientPosts = async (req, res) => {
  try {
    const { patientId } = req.params;
    const posts = await Post.find({ patientId }).populate("verifiedBy", "fullName");

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this patient." });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching patient posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const verifyPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const ngoId = req.user.id; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.verifiedBy.includes(ngoId)) {
      return res.status(400).json({ message: "Post already verified by this NGO." });
    }

    post.verifiedBy.push(ngoId);
    post.verified = true; 

    await post.save();
    res.status(200).json({ message: "Post verified successfully", post });
  } catch (error) {
    console.error("Error verifying post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const patientId = req.user.id; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.patientId.toString() !== patientId) {
      return res.status(403).json({ message: "Unauthorized to delete this post." });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
