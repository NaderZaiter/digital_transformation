const checkAuthMiddleware = require("../middleware/check-auth");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks")
/**
 * @swagger
 * /test
 *  get:
 *  summary: Search user en DDBB
 */



router.post('/login', checkAuthMiddleware.checkAuth, controller.login);
export default router;