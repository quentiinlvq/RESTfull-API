const { Router } = require("express");
const Commentaire = require("../models/Commentaire.js")
const router = new Router();

router.get('/commentaires', async (req, res) => {
    try {
        const commentaires = await Commentaire.findAll();
        res.status(200).json(commentaires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/commentaires', async (req, res) => {
    try {
        const nouveauCommentaire = await Commentaire.create(req.body);
        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/commentaires/:commentaireId', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé...' });
        }
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/commentaires/:commentaireId', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé...' });
        }
        await commentaire.update(req.body);
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/commentaires/:commentaireId', async (req, res) => {
    try {
        const commentaire = await Commentaire.findByPk(req.params.commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé...' });
        }
        await commentaire.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;