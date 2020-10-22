const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/role');
const Role = require('../lib/role');

router.get('/all', [auth, authorize([Role.admin])], userCtrl.getUsers);
router.post('/create', userCtrl.createUser);
router.get('/:id', [auth, authorize([Role.admin, Role.user])], userCtrl.getUser);
router.put('/:id', [auth, authorize([Role.admin, Role.user])], userCtrl.editUser);
router.delete('/:id',[auth, authorize([Role.admin])], userCtrl.deleteUser);

module.exports = router;