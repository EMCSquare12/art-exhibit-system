import express from 'express';
import { createExhibit, getExhibits, getExhibitById, updateExhibit, deleteExhibit } from '../controllers/exhibitController.js';

const router = express.Router();

router.route('/')
  .get(getExhibits)
  .post(createExhibit);

router.route('/:id')
  .get(getExhibitById)
  .put(updateExhibit)
  .delete(deleteExhibit);

  export default router;