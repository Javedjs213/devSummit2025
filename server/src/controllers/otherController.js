import Post from "../models/listModel.js";



export const varifyPost = async (req, res) => {
  try {
    const { postId, ngoId } = req.body;

    console.log(content, imageUrl, reportUrl, medicalHistory);

    if (!postId || !ngoId) {
      return res.status(400).json({ message: "Can not get data, Please try again!" });
    }
    
    const posts = await Post.find({ postId });

    posts.verifiedBy.push(ngoId);
    posts.verified = true;
    await posts.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });

  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};