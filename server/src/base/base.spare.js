const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class BaseController {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async index(req, res) {
    try {
      const data = await prisma[this.modelName].findMany();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const newData = await prisma[this.modelName].create({
        data: req.body,
      });
      res.status(201).json(newData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const data = await prisma[this.modelName].findFirst({
        where: {
          id: parseInt(req.params.id),
        },
      });
      if (!data) {
        res.status(404).json({ message: 'Resource not found' });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const data = await prisma[this.modelName].update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const data = await prisma[this.modelName].delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = BaseController;
