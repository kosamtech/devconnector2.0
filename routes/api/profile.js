const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route GET api/profile/me
// @desc Get Current users Profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' })
    }

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route POST api/profile
// @desc Create or Update users Profile
// @access Private
router.post('/', [
  auth,
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {company, website, status, skills, bio, location, githubusername, youtube, facebook, twitter, instagram, linkedin} = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;


  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route GET api/profile
// @desc Get all users Profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    return res.status(200).json(profiles);

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route GET api/profile/user/:user_id
// @desc Get users Profile by id
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(404).json({ msg: 'Profile not found'});

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found'})
    } else {
      return res.status(500).send(err.message);
    }
  }
});

// @route DELETE api/profile
// @desc Delete user profile and post
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo delete post

    // delete user
    await User.findOneAndRemove({ _id: req.user.id });
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    return res.status(200).json({ msg: 'User deleted' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
})

module.exports = router;