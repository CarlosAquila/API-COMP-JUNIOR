import { Router } from 'express';
import { LoanTypeController } from '../controllers/loanTypeController';
import { permissionMiddleware } from '../middlewares/accessControlMiddleware';

const loanTypeController = new LoanTypeController();
const loanTypeRoutes = Router();

loanTypeRoutes.post('/', permissionMiddleware(['create loanType']), loanTypeController.createLoanType);

loanTypeRoutes.use(permissionMiddleware(['read loanType']));

loanTypeRoutes.get('/', loanTypeController.getLoanTypes);
loanTypeRoutes.get('/:id', loanTypeController.getLoanTypeById);
loanTypeRoutes.get('/name/:name', loanTypeController.getLoanTypeByName);

loanTypeRoutes.put('/update/:id', permissionMiddleware(['update loanType']), loanTypeController.updateLoanTypeById);
loanTypeRoutes.delete('/delete/:id', permissionMiddleware(['delete loanType']), loanTypeController.deleteLoanTypeById);

export { loanTypeRoutes };