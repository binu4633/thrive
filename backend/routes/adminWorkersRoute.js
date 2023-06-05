import express from "express";

import {
  getWorkers,
  getWorkersScheduleDates,
  scheduleById,
  deleteSlot
} from "../controller/adminController1.js";
import {
  getMemberRequest,
  acceptMemberRequest,
  rejectMemberRequest,
  userActivate,
  userBlock,
  userDelete,
  expiredDates
} from "../controller/adminController.js";
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router();

router.route("/getWorkers").get(protect,getWorkers);
router.get("/getWorkerScheduleDates/:id", getWorkersScheduleDates);
router.get("/getWorkerSchedule/:id", scheduleById);
router.get("/getMemberRequest", getMemberRequest);
router.post("/acceptMemberRequest", protect, acceptMemberRequest);
router.post("/rejectMemberRequest",protect, rejectMemberRequest);
router.post("/userActivate",protect, userActivate);
router.post("/userBlock",protect, userBlock);
router.post("/userDelete",protect, userDelete);
router.get('/getExpiredDates', expiredDates);
router.delete('/deleteSlot/:id',deleteSlot)
export default router;
