const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");
const { ExternalWallet, InternalWallet } = require("./wallet.model");

router.post("/wallet/internal", jwtAuth, async (req, res) => {
    new InternalWallet(req.body)
        .save()
        .then((value) => {
            return res.status(200).json(value);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

router.post("/wallet/external", jwtAuth, async (req, res) => {
    new ExternalWallet(req.body)
        .save()
        .then((value) => {
            return res.status(200).json(value);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

module.exports = router;
