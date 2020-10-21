const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/role');
const Role = require('../lib/role');

router.get('/all', [auth, authorize([Role.admin])], userCtrl.getUsers);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;