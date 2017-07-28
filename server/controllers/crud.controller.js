const db = require('../dao');

class CRUDController {
  constructor(daoName) {
    this.daoName = daoName;
  }

  async create(req, res, resource, onload = () => { }, onerror = () => true) {
    try {
      const id = await db[this.daoName].create(resource);

      if (!id) {
        throw new Error('500'); // FIXME: 500?`
      }

      await onload(id);
      res.json({ id });
    } catch (err) {
      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }

  async readOne(req, res, onload = () => { }, onerror = () => true) {
    try {
      const resource = await db[this.daoName].readOne(req.params.id);

      if (!resource) {
        throw new Error('404');
      }

      await onload(resource);
      res.json(resource);
    } catch (err) {
      if (err.message === '404') {
        res.status(404).end();
        return;
      }

      if (err.message === '403') {
        res.status(403).end();
        return;
      }

      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }

  async read(req, res, onload = () => { }, onerror = () => true) {
    try {
      const candidates = await db[this.daoName].read(req.query.page);
      await onload(candidates);
      res.json(candidates);
    } catch (err) {
      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }

  async update(req, res, resource, onload = () => { }, onerror = () => true) {
    try {
      await db[this.daoName].update(req.params.id, resource);
      await onload(resource);
      res.json({});
    } catch (err) {
      if (err.message === '404') {
        res.status(404).end();
        return;
      }

      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }

  async delete(req, res, onload = () => { }, onerror = () => true) {
    try {
      await db[this.daoName].delete(req.params.id);
      await onload();
      res.json({});
    } catch (err) {
      if (err.message === '404') {
        res.status(404).end();
        return;
      }

      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }
}

module.exports = CRUDController;
