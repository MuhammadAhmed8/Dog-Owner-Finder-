const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

exports.register = catchAsync(async(req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

exports.login = catchAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

exports.logout = catchAsync(async(req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

exports.refreshTokens = catchAsync(async(req, res) => {

    const tokens = await authService.refreshAuth(req.body.refreshToken);

    res.send({...tokens });
});

exports.forgotPassword = catchAsync(async(req, res) => {

    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);

    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

    res.status(httpStatus.NO_CONTENT).send();
});

exports.resetPassword = catchAsync(async(req, res) => {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
});
