import { Router } from 'express';
import {
    csrfProtection,
    login,
    obtenerPerfilUsuario,
    registro,
} from '../controllers/usuariosController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = Router();
// /api/usuarios

router
    .post('/', login)
    .post('/registro', registro)
    .get('/getCSRFToken', csrfProtection)
    .get('/perfil', checkAuth, obtenerPerfilUsuario)

export default router;