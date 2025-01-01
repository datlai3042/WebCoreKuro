import { Router } from "express";
import routerAuthentication from "./authentication";

const router = Router()
router.use('/v1/api/auth', routerAuthentication)


export default router