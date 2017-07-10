const users = require('../dao/users');
const service = require('../services/auth');

async function email(req, res) {
  try {
    const email = await users.checkUserEmail(req.body.email);
    if (email) {
      res.send();
      return;
    }
    throw new Error('no-user');
  } catch (err) {
    res.status(401).end();
  }
}

async function login(req, res) {
  try {
    const user = await service.promisifiedAuthenticate(req, res);
    if (!user) {
      res.status(401).send('auth-error');
      return;
    }
    req.logIn(user, (error) => {
      if (error) {
        res.send(error.message);
        return;
      }
      res.end();
    });
  } catch (err) {
    res.status(401).send(err.message);
    return;
  }
}

async function logout(req, res) {
  try {
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

module.exports = {
  email,
  login,
  logout,
};
