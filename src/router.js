const authRouter = require('./api/auth/index');
const usersRouter = require('./api/users/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require('./swagger-output.json');


function routes(app) {
    app.use('/auth', authRouter);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use('/users', usersRouter);
}

module.exports = routes;