const mongoose = require("mongoose");

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    description: "Username of the commenter",
  },
  message: {
    type: String,
    required: [true, "Comment message is required"],
    description: "The comment text",
  },
  commentedAt: {
    type: Date,
    default: Date.now,
    description: "Timestamp when the comment was made",
  },
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      minlength: [5, "Title must be at least 5 characters long"],
      trim: true,
      description: "Title of the blog post",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [50, "Content must be at least 50 characters long"],
      description: "The main content of the blog post",
    },
    author: {
      type: String,
      required: true,
      trim: true,
      description: "Username of the author",
    },
    tags: {
      type: [String],
      default: [],
      description: "Tags or keywords related to the blog post",
    },
    category: {
      type: String,
      default: "General",
      trim: true,
      description: "Category of the blog post",
    },
    likes: {
      type: [String],
      default: [],
      description: "Usernames of users who liked the post",
    },
    comments: [commentSchema], // Embedding comments as subdocuments
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // Automatically manage timestamps
  }
);

// Export the model
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;