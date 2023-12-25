const { Router } = require("express");
const Tache = require("../models/Tache.js");
const ListeTaches = require("../models/ListeTaches.js")
const router = new Router();

router.get('/listetaches', async (req, res) => {
    try {
        const listesTaches = await ListeTaches.findAll();
        res.status(200).json(listesTaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/listetaches', async (req, res) => {
    try {
        const nouvelleListeTaches = await ListeTaches.create(req.body);
        res.status(201).json(nouvelleListeTaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/listetaches/:listeId', async (req, res) => {
    try {
        const listeTaches = await ListeTaches.findByPk(req.params.listeId);
        if (!listeTaches) {
            return res.status(404).json({ message: 'Liste de tâches non trouvée...' });
        }
        res.status(200).json(listeTaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/listetaches/:listeId', async (req, res) => {
    try {
        const listeTaches = await ListeTaches.findByPk(req.params.listeId);
        if (!listeTaches) {
            return res.status(404).json({ message: 'Liste de tâches non trouvée...' });
        }
        await listeTaches.update(req.body);
        res.status(200).json(listeTaches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/listetaches/:listeId', async (req, res) => {
    try {
        const listeTaches = await ListeTaches.findByPk(req.params.listeId);
        if (!listeTaches) {
            return res.status(404).json({ message: 'Liste de tâches non trouvée...' });
        }
        await listeTaches.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;