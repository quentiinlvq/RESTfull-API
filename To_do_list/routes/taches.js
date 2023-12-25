const { Router } = require("express");
const Tache = require("../models/Tache");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

router.get('/taches', checkAuth, async (req, res) => {
    try {
        const taches = await Tache.findAll();
        res.status(200).json(taches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/taches', checkAuth, async (req, res) => {
    try {
        const nouvelleTache = await Tache.create(req.body);
        res.status(201).json(nouvelleTache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/taches/:tacheId', checkAuth, async (req, res) => {
    try {
        const tache = await Tache.findByPk(req.params.tacheId);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée...' });
        }
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/taches/:tacheId', checkAuth, async (req, res) => {
    try {
        const tache = await Tache.findByPk(req.params.tacheId);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée...' });
        }
        await tache.update(req.body);
        res.status(200).json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/taches/:tacheId', checkAuth, async (req, res) => {
    try {
        const tache = await Tache.findByPk(req.params.tacheId);
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée...' });
        }
        await tache.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;