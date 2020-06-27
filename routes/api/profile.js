const express = require('express');
const config = require('config');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const axios = require('axios');
const normalize = require('normalize-url')
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


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
  [check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty()]
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {company, website, status, skills, bio, location, githubusername, youtube, facebook, twitter, instagram, linkedin} = req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = normalize(website, { forceHttps: true });
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  // Build social object
  const socialFields = {youtube, facebook, twitter, linkedin, instagram}

  for (const [key, value] of Object.entries(socialFields)) {
    if (value.length > 0) {
      socialFields[key] = normalize(value, { forceHttps: true });
    }
  }

  profileFields.social = socialFields;


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
// @desc Get users Profile by ID
// @access Public
router.get('/user/:user_id', checkObjectId('user_id'), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(404).json({ msg: 'Profile Not Found'});

    // @todo implement views and send mail

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route DELETE api/profile
// @desc Delete user account permanently
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // user posts
    await Post.deleteMany({ user: req.user.id });

    // delete user
    await User.findOneAndRemove({ _id: req.user.id });
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    return res.status(200).json({ msg: 'User account permanently deleted' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route DELETE api/profile/deactivate
// @desc Deactivate user account
// @access Private
router.delete('/deactivate', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    const userObj = { active: false };

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userObj },
      { new: true }
    );

    await user.save();

    return res.status(200).json({ msg: 'User account deactivated' });

  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route PUT api/profile/experience
// @desc Add profile experience
// @access Private
router.put('/experience', [ auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {title, company, location, from, to, current, description} = req.body;

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    return res.status(200).json(profile);
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // foundProfile.experience = foundProfile.experience.filter(
    //   (exp) => exp._id.toString() !== req.params.exp_id
    // );

    const removeIndex = profile.experience.map(exp => exp.id.toString()).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.messsage);
  }
});



// @route PUT api/profile/education
// @desc Add profile education
// @access Private
router.put('/education', [ auth, [
  check('school', 'School is required').not().isEmpty(),
  check('degree', 'Degree is required').not().isEmpty(),
  check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {school, degree, fieldOfStudy, from, to, current, description} = req.body;

  const newEdu = {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    current,
    description
  }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

    await profile.save();

    return res.status(200).json(profile)
    
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});


// @route DELETE api/profile/education/:edu_id
// @desc Delete profile education
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // foundProfile.education = foundProfile.education.filter(
    //   (edu) => edu._id.toString() !== req.params.edu_id
    // );

    const removeIndex = profile.education.map(edu => edu.id.toString()).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json(profile);

  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.messsage);
  }
});


// @route GET api/profile/github/:username
// @desc Get users latest repos from github
// @access Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`
    };
    
    const response = await axios.get(uri, { headers });

    return res.status(200).json(response.data);

  } catch (err) {
    console.error(err.messsage);
    return res.status(500).send(err.message);
  }
});

module.exports = router;