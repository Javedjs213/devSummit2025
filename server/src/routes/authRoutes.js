import express from 'express';
import { login, logout, signup } from '../controllers/authSimple.js';
// import { authenticateUser } from '../middlewares/isAuthenticated.js';

const authRoutes = express.Router();

authRoutes.post('/singup', signup);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);
// authRoutes.get('/iam',authenticateUser , iam);

export default authRoutes;


