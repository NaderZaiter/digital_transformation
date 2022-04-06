import {Router} from 'express';
import {getBudgets} from '../controllers/tasks'

const router = Router();

/**
 * @swagger
 * /register
 *  put:
 *  summary: Add user data to DDBB
 */
router.put('/register');

router.put('/addBudget');

router.post('/login');

router.post('/modifyBudget/:id')

router.get('/budget/:id');

router.get('/budgetClients/:cif');

router.get('/budgetCategory/:category', getBudgets);

router.get('/imagesRightsBudget/:id');

router.get('/imagesRightsClient/:cif');

router.get('/imagesRightsCategory/:category');

router.get('/getCollaborator/:id');

router.get('/getCollaboratorBudget/:id');

router.get('/getCollaboratorCategory/:category');

export default router;