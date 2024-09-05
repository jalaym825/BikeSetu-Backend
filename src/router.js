const authRouter = require('./api/auth/index');
const usersRouter = require('./api/users/index');
const manufacturerRouter = require('./api/manufacturer/index');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/manufacturer', manufacturerRouter);
}

module.exports = routes;
