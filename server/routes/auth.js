const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const { dbMemory } = require('../db/db');
const { dbFind, dbGet } = require('../helper');

// auth ref by token
router.get('/ref', async function (req, res) {
  const { token } = req.query;
  const ref = await dbFind(dbMemory, 'token', token);
  //console.log('log ref: ', ref);
  if (!ref) return res.status(401).send('Unauthorized');
  return res.status(200).send(ref[0]);
});

// auth admin
router.get('/admin', async function (req, res) {
  const { user, password } = req.body;
  const adminUser = await dbGet(dbMemory, 'admin');

  const passCheck = await bcrypt.compare(password, adminUser?.password);

  if (user === adminUser.name && passCheck) {
    return res.status(200).send('Login');
  } else {
    return res.status(401).send('Unauthorized');
  }
});

module.exports = router;
