const express = require('express');
const router = express.Router();

const authenticate = require('./authenticate');
const expense = require('./expense');
const profile = require('./profile');
const task = require('./task');

router.use('/api/authenticate', authenticate);
router.use('/api/profile', profile);
router.use('/api/task', task);
router.use('/api/expense', expense);

module.exports(router);