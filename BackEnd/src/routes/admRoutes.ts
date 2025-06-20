import express from 'express'
import { getAll } from '../controllers/admController'

const router = express.Router();

router.get('/adm', getAll)

export default router;