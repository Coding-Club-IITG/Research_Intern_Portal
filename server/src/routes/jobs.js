import express from 'express'
// import { getRecruiterById, getRecruiters, updateRecruiter, deleteRecruiter } from '../controllers/recruiter.js'
import { createJob, deleteById, getJob, getJobById,applyForJob,getJobByfilter } from '../controllers/jobs.js';


const jobRouter = express.Router()

jobRouter.get('/:id',getJobById);
jobRouter.get('/',getJob );
jobRouter.post('/',createJob );
jobRouter.post('/apply', applyForJob);
jobRouter.post('/filter',getJobByfilter );

jobRouter.delete('/:id', deleteById);




 export default jobRouter;