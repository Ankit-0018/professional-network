import Post from "../models/post.model.js"

export const createPost = async (req , res) => {
  try {
    const userId = req.user.id;
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Text is required and must be a string." });
    }

    const newPost = new Post({
      user: userId,
      text,
    });

    const savedPost = await newPost.save();
await savedPost.populate('user', 'name email');
    res.status(201).json({
      success : true,
      message: "Post created successfully.",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "_id name email") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      message: "Posts fetched successfully.",
      success : true,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user?.id; 

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete Post Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};