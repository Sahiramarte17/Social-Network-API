//import { Router } from 'express';
const { Router } = require('express');
//import apiRoutes from './api/index.js';
const apiRoutes = require( './api/index.js');


const router = Router();

router.use('/api', apiRoutes);

// export default router;

module.exports = router

