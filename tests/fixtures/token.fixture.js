const moment = require('moment');
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');
const { userOne, admin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);
const managePetAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDczMzJhMDhkNzA1ZDE4OTBhNjhkMzAiLCJpYXQiOjE2MTgxNjMzMDcsImV4cCI6MjE3NjE4MTYzMzA3LCJ0eXBlIjoiYWNjZXNzIn0.Fbguctg64xOUsOcovjfNmqtVGH8bpxAfrPRmK-gBSi8"


module.exports = {
    userOneAccessToken,
    adminAccessToken,
    managePetAccessToken,
    succ
};








succ = 401