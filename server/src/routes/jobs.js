import express from 'express'
// import { getRecruiterById, getRecruiters, updateRecruiter, deleteRecruiter } from '../controllers/recruiter.js'
import { createJob, deleteById, getJob, getJobById } from '../controllers/jobs.js';


const jobRouter = express.Router()

jobRouter.get('/:id',getJobById);
jobRouter.get('/',getJob );
jobRouter.post('/',createJob );

jobRouter.delete('/:id', deleteById);




 export default jobRouter;