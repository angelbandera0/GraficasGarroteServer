var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Graficas Garrote' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesión' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registrarse' });
});

router.get('/add_album', function(req, res, next) {
  res.render('client/add_album', { title: 'Crear Nuevo Album' });
});


module.exports = router;
