import express from 'express'
import {  createJob, updateJobById, deleteJob,getJob, getJobById, getJobbyfilter, applyforjob} from '../controllers/jobs.js'

const jobRouter = express.Router()

jobRouter.get('/', getJob);
jobRouter.get('/:id', getJobById);
jobRouter.post('/', createJob);
jobRouter.put('/:id', updateJobById);
jobRouter.delete('/:id', deleteJob);
jobRouter.post('/filter', getJobbyfilter);
jobRouter.post('/applyforjob', applyforjob);

export default jobRouter;