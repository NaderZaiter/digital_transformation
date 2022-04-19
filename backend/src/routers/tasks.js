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
 *  put:
 *  summary: Add user to DDBB
 */
 router.put('/register', checkAuthMiddleware.checkAuth, controller.register);
/**
 * @swagger
 * /addBudget
 *  put:
 *  summary: Add budget to DDBB
 */
 router.put('/addBudget', checkAuthMiddleware.checkAuth, controller.addBudget);
 /**
 * @swagger
 * /addBudget
 *  post:
 *  summary: Search budget from DDBB
 */
 router.post('/getBudget', checkAuthMiddleware.checkAuth, controller.getBudget);
 /**
 * @swagger
 * /deleteBudget
 *  post:
 *  summary: Delete budget from DDBB
 */
   router.post('/deleteBudget', checkAuthMiddleware.checkAuth, controller.deleteBudget);
 /**
 * @swagger
 * /getBudgetClient
 *  post:
 *  summary: Gets budget's client
 */
  router.post('/getBudgetClient', checkAuthMiddleware.checkAuth, controller.getBudgetClient);
  /**
 * @swagger
 * /getBudgetTasks
 *  post:
 *  summary: Gets budget's tasks
 */
   router.post('/getBudgetTasks', checkAuthMiddleware.checkAuth, controller.getBudgetTasks);
/**
 * @swagger
 * /modifyBudget
 *  put:
 *  summary: Modify budget from DDBB
 */
 router.put('/modifyBudget', checkAuthMiddleware.checkAuth, controller.modifyBudget);
export default router;