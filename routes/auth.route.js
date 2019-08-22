const router = require('express').Router();
const util = require('../util');

const AuthService = require('../services/auth.service');

router.post('/signup', async (req, res, next) => {
    try {
        let password = req.body.password;
        const user = await AuthService.signUp(req.body);
        const token = await AuthService.login({username: user.username, password: req.body.password});
        res.json(util.SuccessResponse(token));
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const token = await AuthService.login(req.body);
        res.json(util.SuccessResponse(token));
    }
    catch (err) {
        console.log(err);
        return next(err);
    }
});

module.exports = router;
