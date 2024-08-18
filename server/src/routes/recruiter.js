import express from 'express'
import { getRecruiterById, getRecruiters, updateRecruiter, deleteRecruiter } from '../controllers/recruiter.js'

const router = express.Router()

router.get('/:id', getRecruiterById);
router.get('/', getRecruiters);
router.put('/:id', updateRecruiter);
router.delete('/:id', deleteRecruiter);

export default router;