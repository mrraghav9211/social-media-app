const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  try {
      const newPostData = {
      caption:req.body.caption,
      image:{
        public_id:"req.body.public_id",
        url:"req.body.url"
      },
      owner:req.user_id
    }

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user_id);
    user.posts.push(post._id)
    
    await user.save();
    res.status(201).json({
        seccess:true,
        post:post
    })
  } catch (error) {
    res.status(500).json({
        success:true,
        message:error.message
    })

  }
};
