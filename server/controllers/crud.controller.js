class CRUDController {
  constructor(dao) {
    this.dao = dao;
  }

  async create(req, res, resource, onload = () => { }, onerror = () => true) {
    try {
      const id = await this.dao.create(resource);

      if (!id) {
        throw new Error('500'); // TODO: 500?
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
      const resource = await this.dao.readOne(req.params.id);

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
      const resources = await this.dao.read(req.query.page, req.query);
      await onload(resources);
      res.json(resources);
    } catch (err) {
      if (onerror(err)) {
        res.status(500).end();
      }
    }
  }

  async update(req, res, resource, onload = () => { }, onerror = () => true) {
    try {
      await this.dao.update(req.params.id, resource);
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
      await this.dao.delete(req.params.id);
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
