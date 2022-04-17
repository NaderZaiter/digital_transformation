const checkAuthMiddleware = require("../middleware/check-auth");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks")
/**
 * @swagger
 * /login
 *  post:
 *  summary: Search user en DDBB for login
 */
router.post('/login', checkAuthMiddleware.checkAuth, controller.login);
/**
 * @swagger
 * /register
 *  post:
 *  summary: Add user to DDBB
 */
 router.put('/register', checkAuthMiddleware.checkAuth, controller.register);


export default router;