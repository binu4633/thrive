import express from "express";

import {
  createWorker,
  getWorkers,
  getWorker,
  createAttendence,
  activeWorker,
  blockWorker,
  deleteWorker,
  createWorkerAttendence,
  myScheduleDates,
  mySchedule,
  bookingWorkerHandler,
  undoBookingHandler
} from "../controller/workerController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createWorker",protect, createWorker);
router.get("/getWorkers", getWorkers);
router.patch("/activateWorker", activeWorker);
router.patch("/blockWorker", blockWorker);
router.delete("/deleteWorker", deleteWorker);
router.get("/getWorker/:id", getWorker);
router.post("/createAttendence", protect, createAttendence);
router.post("/createWorkerAttendence", protect, createWorkerAttendence);
router.get('/myScheduleDates',protect,myScheduleDates);
router.get('/mySchedule/:id',protect,mySchedule);
router.post('/workerBook',protect,bookingWorkerHandler);
router.post('/undoBooking',protect,undoBookingHandler);

export default router;
