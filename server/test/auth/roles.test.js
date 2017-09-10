import express from 'systemic-express/express';
import request from 'request-promise';
import errors from 'request-promise/errors';
import session from 'express-session';
import roles from '../../lib/components/auth/roles';

describe.skip('Roles', () => {

    const port = 13003;
    let server;

    beforeAll(done => {
      startServer(done);
    });

    afterAll(done => {
      stopServer(done);
    });

    it('should allow unauthenticated users when the role is granted to everyone', async () => {
      const res = await request({
        url: `http://localhost:${port}/public`,
        resolveWithFullResponse: true,
      });
      expect(res.statusCode).toBe(204);
    });

    it('should allow authenticated users when the role is granted to everyone', async () => {
      const res = await request({
        url: `http://localhost:${port}/public/chuck`,
        resolveWithFullResponse: true,
      });
      expect(res.statusCode).toBe(204);
    });

    it('should allow authenticated users with the specified role', async () => {
      const res = await request({
        url: `http://localhost:${port}/private/chuck`,
        resolveWithFullResponse: true,
      });
      expect(res.statusCode).toBe(204);
    });

    it('should forbid authenticated users without the specified role', async () => {
      expect.assertions(1);
      await request({
        url: `http://localhost:${port}/private/chad`,
        resolveWithFullResponse: true,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(403);
      });
    });

    it('should redirect unauthenticated users without the specified role', async () => {
      expect.assertions(2);
      await request({
        url: `http://localhost:${port}/private`,
        resolveWithFullResponse: true,
        followRedirect: false,
      }).catch(errors.StatusCodeError, (reason) => {
        expect(reason.statusCode).toBe(302);
        expect(reason.response.headers.location).toBe('/auth/test');
      });
    });

    function startServer(cb) {
      const app = express();
      app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, }));
      app.locals.loginUrl = '/auth/test';
      server = app.listen(port, err => {
        if (err) return cb(err);
        const config = { guest: ['*',], member: ['chuck',], };
        roles().start({ config, app, }, err => {
          if (err) return cb(err);
          app.use((req, res, next) => {
            res.locals.logger = { info: () => {}, };
            next();
          });
          app.get('/public', app.locals.hasRole('guest'), (req, res) => res.status(204).send());
          app.get('/public/:user', login, app.locals.hasRole('guest'), (req, res) => res.status(204).send());
          app.get('/private', app.locals.hasRole('member'), (req, res) => res.status(204).send());
          app.get('/private/:user', login, app.locals.hasRole('member'), (req, res) => res.status(204).send());
          app.use((err, req, res, next) => res.status(err.output.statusCode).send());
          cb();
        });
      });
    }

    function login(req, res, next) {
      req.user = { id: req.params.user, };
      next();
    }

    function stopServer(cb) {
      if (!server) return cb();
      server.close(cb);
    }
});
