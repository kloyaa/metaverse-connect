require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("./auth.model");
const { httpMessage } = require("../_core/const/http-messages.const");
const { generateJwt } = require("../_core/utils/jsonwebtoken.util");
const { encrypt } = require("../_core/utils/encryption.util");
const { saveSession, findSessionByUser, isAccountLocked } = require("./auth.service");
const { stringToObjectId } = require("../_core/utils/mongodb.util");
const { jwtAuth } = require("../_core/middleware/jsonwebtoken.middleware");

router.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res
            .status(403)
            .json(httpMessage[10301]);

        const isAccLocked = await isAccountLocked(user._id);
        if (isAccLocked) return res
            .status(403)
            .json(httpMessage[10202]);

        bcrypt.compare(password, user.hashValue, async function (err, result) {
            if (err) return res
                .status(403)
                .json(httpMessage[10301]);
            if (!result) return res
                .status(403)
                .json(httpMessage[10301]);

            const generatedToken = await generateJwt({
                _id: user._id.toString(),
                username
            });
            const encryptedToken = await encrypt(generatedToken);
            await saveSession({
                user: user._id,
                value: `${encryptedToken.iv}.${encryptedToken.content}`
            });
            return res.status(200).json({
                accessToken: `${encryptedToken.iv}.${encryptedToken.content}`
            });
        })

    } catch (error) {
        console.log(error);
    }
});

router.post("/auth/register", async (req, res) => {
    try {
        const { username, password, device } = req.body;
        const user = await User.findOne({ username });
        if (user) return res
            .status(403)
            .json(httpMessage[10205]);

        const hashValue = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        new User({ username, hashValue, device })
            .save()
            .then(async (value) => {
                const generatedToken = await generateJwt({
                    _id: value._id.toString(),
                    username
                })
                const encryptedToken = await encrypt(generatedToken);
                await saveSession({
                    user: value._id.toString(),
                    value: `${encryptedToken.iv}.${encryptedToken.content}`
                });
                return res.status(200).json({
                    accessToken: `${encryptedToken.iv}.${encryptedToken.content}`
                });
            })
            .catch((err) => {
                console.error(err)
                return res.status(403).json(httpMessage[10204])
            });
    } catch (error) {
        console.log(error);
    }
});

router.get("/auth/session", jwtAuth, async (req, res) => {
    try {
        const query = req.query.user;
        const session = await findSessionByUser(stringToObjectId(query));
        if (!session) return res
            .status(403)
            .json(httpMessage[10303]);
        return res.status(200).json(session);
    } catch (error) {
        return res
            .status(403)
            .json(httpMessage[10204]);
    }
});

module.exports = router;

