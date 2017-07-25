const db = require('../dao/dao');
const service = require('../services/auth.service');

async function checkEmail(req, res) {
  try {
    const user = await db.users.findByEmail(req.body.email);

    if (user) {
      res.send();
      return;
    }

    res.status(401).end();
  } catch (err) {
    res.status(500).end();
  }
}

async function login(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error('400');
    }

    const user = await service.promisifiedAuthenticate(req, res);

    if (!user) {
      res.status(401).end();
      return;
    }

    req.logIn(user, (error) => {
      if (error) {
        res.status(401).end();
        return;
      }

      res.json({ name: user.name, role: user.role });
    });
  } catch (err) {
    if (err.message === '401') {
      res.status(401).end();
      return;
    }

    if (err.message === '400') {
      res.status(400).end();
      return;
    }

    res.status(500).send(err.message);
  }
}

function logout(req, res) {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      res.status(500).end();
      return;
    }

    res.end();
  });
}

async function authCheck(req, res, next) {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  next();
}

function getUser(req, res) {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  res.json({ name: req.user.name, role: req.user.role });
}

module.exports = {
  checkEmail,
  login,
  logout,
  authCheck,
  getUser,
};
