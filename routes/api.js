const express = require('express');
const router = express.Router();

const authenticate = require('./authenticate');
const expense = require('./expense');
const profile = require('./profile');
const task = require('./task');

router.use('/authenticate', authenticate);
router.use('/profile', profile);
router.use('/task', task);
router.use('/expense', expense);

module.exports = router;