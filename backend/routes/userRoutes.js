import express from "express";
import {workersForBooking,getBookingSchedule,bookingUserHandler,googleAuth,addMemberRequest,expiryCheck} from '../controller/userController.js'
import {searchUser} from '../controller/adminController.js';
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router();


router.get('/bookingWorker',workersForBooking);
router.get('/bookingSchedule/:id',getBookingSchedule);
router.post('/book',protect,bookingUserHandler);
router.post('/googleAuth',googleAuth);
router.post('/searchUser', searchUser);
router.post('/addMemberRequset',protect,addMemberRequest)
router.get('/expiryCheck',protect,expiryCheck)


export default router;