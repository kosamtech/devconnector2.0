const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');
const User = require('../../models/User');


// @route GET api/users
// @desc Register user
// @access Public
router.post('/',[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be atleast 6 character').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {name, email, password} = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ errors: [{  msg: "User already exists"  }] });

    const avatar = normalize(
      gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }),
      { forceHttps: true }
    );

    user = new User({
      name,
      email,
      password,
      avatar
    });
  
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload  = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jsonSecret'), { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;