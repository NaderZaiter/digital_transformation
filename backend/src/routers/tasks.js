import {test} from '../controllers/tasks';

const checkAuthMiddleware = require("../middleware/check-auth");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /test
 *  get:
 *  summary: Search user en DDBB
 */



router.get('/test', checkAuthMiddleware.checkAuth, test);
export default router;