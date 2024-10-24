const { Router } = require('express');
const  userRoutes = require( './userRoutes.js');
const thoughtRoutes = require( './thoughtRoutes.js');

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export default router;
module.exports = router