import express from 'express'
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const { request, response } = express;

const checkAuth = async (req = request, res = response, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jwt.verify(token, process.env.SECRETA);
            req.usuario = await Usuario.findById(decode.id).select('-password -token');
            return next();
        } catch (e) {
            console.log(e);
            return res.status(404).json({ ok: false, msg: 'Hubo un error' })
        }
    }
    if (!token) {
        const error = new Error('Token no valido');
        res.status(401).json({ ok: false, msg: error.message });
    }
    next();
}

export default checkAuth;