const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const petRoute = require('./pet.route');
const messagingRoute = require('./messaging.route');
const adoptionRoute = require('./adoption.route');
const config = require('../../config/config');
const { messagingController } = require('../../controllers');

const router = express.Router();

const defaultRoutes = [{
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/pets',
        route: petRoute
    },
    {
        path: '/adopt',
        route: adoptionRoute
    },

    {
        path: '/message',
        route: messagingRoute
    }
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
