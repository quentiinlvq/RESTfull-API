const { Router } = require('express');
const AssignationTache = require('../models/AssignationTache');
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get('/', checkAuth, async (req, res) => {
  try {
    const assignationsTaches = await AssignationTache.findAll();
    res.status(200).json(assignationsTaches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', checkAuth, async (req, res) => {
  try {
    const nouvelleAssignationTache = await AssignationTache.create(req.body);
    res.status(201).json(nouvelleAssignationTache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', checkAuth, async (req, res) => {
  try {
    const assignationTache = await AssignationTache.findByPk(req.params.id);
    if (!assignationTache) {
      return res.status(404).json({ message: 'Assignation de tâche non trouvée...' });
    }
    res.status(200).json(assignationTache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', checkAuth, async (req, res) => {
  try {
    const assignationTache = await AssignationTache.findByPk(req.params.id);
    if (!assignationTache) {
      return res.status(404).json({ message: 'Assignation de tâche non trouvée...' });
    }
    await assignationTache.update(req.body);
    res.status(200).json(assignationTache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const assignationTache = await AssignationTache.findByPk(req.params.id);
    if (!assignationTache) {
      return res.status(404).json({ message: 'Assignation de tâche non trouvée...' });
    }
    await assignationTache.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
