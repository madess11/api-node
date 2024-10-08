import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await Post.create({ title, content, tags, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').populate('likes', 'username');
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch posts' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete post' });
  }
};


export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: 'Post liked', likes: post.likes });
    } else {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to like post' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      return res.status(200).json({ message: 'Post unliked', likes: post.likes });
    } else {
      return res.status(400).json({ message: 'You have not liked this post yet' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to unlike post' });
  }
};

