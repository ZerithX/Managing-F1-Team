import express  from 'express';
import { 
    
    getAllDriversController, 
    getDriverByIdController,
    getAllTeamPrincipalsController,
    getTeamPrincipalByIdController,    
    filterDriversController,
    filterTeamPrincipalsController,
    addDriverController,
    addTeamPrincipalController,
    updateDriverController,
    updateTeamPrincipalController,
    earnedDriverPointsController,
    penaltyDriverPointsController,
    deleteDriverController,
    deleteTeamPrincipalController
} from '../controllers/controller.js';

const router = express.Router();

router.get("/drivers/filter", filterDriversController);
router.get("/drivers", getAllDriversController);
router.get("/drivers/:id", getDriverByIdController);

router.get("/teamprincipals/filter", filterTeamPrincipalsController);
router.get("/teamprincipals", getAllTeamPrincipalsController);
router.get("/teamprincipals/:id", getTeamPrincipalByIdController);

router.post('/drivers', addDriverController);
router.post('/teamprincipals', addTeamPrincipalController);

router.patch('/drivers/:id', updateDriverController);
router.patch("/drivers/:id/points/add", earnedDriverPointsController);
router.patch("/drivers/:id/points/subtract", penaltyDriverPointsController);
router.patch('/teamprincipals/:id', updateTeamPrincipalController);
router.delete('/drivers/:id', deleteDriverController);
router.delete('/teamprincipals/:id', deleteTeamPrincipalController);

export default router;