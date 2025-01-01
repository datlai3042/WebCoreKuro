import { Router } from "express";

const routerAuthentication = Router()
routerAuthentication.post('/register', (req, res, next) => { })
routerAuthentication.post('/login', (req, res, next) => { })
routerAuthentication.post('/logout', (req, res, next) => { })
routerAuthentication.get('/refresh-token', (req, res, next) => { })

export default routerAuthentication