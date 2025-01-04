import { Router } from "express";
import routerAuthentication from "./authentication";
import routerTask from "./tasks";

const router = Router()
router.use('/v1/api/auth', routerAuthentication)
router.use('/v1/api/tasks', routerTask)


export default router