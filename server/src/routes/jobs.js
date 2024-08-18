import express from 'express'
import {  createJob, updateJobById, deleteJob,getJob, getJobById } from '../controllers/jobs.js'

const jobRouter = express.Router()

jobRouter.get('/', getJob);
jobRouter.get('/:id', getJobById);
jobRouter.post('/', createJob);
jobRouter.put('/:id', updateJobById);
jobRouter.delete('/:id', deleteJob);

export default jobRouter;