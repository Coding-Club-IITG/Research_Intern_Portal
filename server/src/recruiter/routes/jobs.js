import express from 'express'
// import { getRecruiterById, getRecruiters, updateRecruiter, deleteRecruiter } from '../controllers/recruiter.js'
import { createJob, deleteById, getJob, getJobById,applyForJob,getJobByfilter,updateJob } from '../controllers/jobs.js';


const jobRouter = express.Router()

jobRouter.get('/:id',getJobById);
jobRouter.get('/',getJob );
jobRouter.post('/',createJob );
jobRouter.post('/apply', applyForJob);
jobRouter.post('/filter',getJobByfilter );
jobRouter.put('/update/:job_id/:prof_id' , updateJob)

jobRouter.delete('/:id', deleteById);




 export default jobRouter;