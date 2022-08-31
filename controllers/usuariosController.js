import express from 'express'
import bcrypt from 'bcryptjs'
import Usuario from '../models/Usuario.js';

const { genSalt } = bcrypt;
const { request, response } = express;

export const registro = async (req = request, res = response) => {
    console.log(req.body);
    const { nombre, apellidos, email, telefono, password, usuario } = req.body;
    const RegexNombres = /^[a-zñáéíóú A-ZÑÁÉÍÓÚ]+$/;

    if (!RegexNombres.test(nombre))
        return res.status(400).send({ ok: false, error: 'Nombres inválidos, no se permiten caracteres especiales' });

    if (!RegexNombres.test(apellidos))
        return res.status(400).send({ ok: false, error: 'Apellidos inválidos, no se permiten caracteres especiales' });

    const emailRegexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegexCorreo.test(email))
        return res.status(400).send({ ok: false, error: 'El correo enviado no posee lo requisitos mínimos' });

    // validate only gmail hotmail or yahoo
    const check_email = '[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)';
    const patt = new RegExp(check_email);
    const result = patt.test(email);
    if (!result) {
        //errors.push({msg: "You can't use that email to register"});
        res.status(403).json({ ok: false, msg: 'Debe ingresar un email valido' });
    }

    try {
        const emailExiste = await Usuario.findOne({ email });
        if (emailExiste) {
            return res.status(400).json({ ok: false, msg: 'El email ya esta registrado' });
        }

        const usernameExiste = await Usuario.findOne({ usuario });
        if (usernameExiste) {
            return res.status(400).json({ ok: false, msg: 'El nombre de usuario ya esta registrado' })
        }
        // crear una instancia de usuario
        const cliente = new Usuario(req.body);
        // generar token para la confiramcion
        // generar el salt para hashear el password
        const salt = await genSalt(10);
        // encriptar el password
        const encripPassword = await bcrypt.hash(password, salt);
        // almacenar el password encriptado en la instancia de usuario
        cliente.password = encripPassword;
        // almacernar  usuario en la base de datos
        await cliente.save();
        // envair respuesta correcta
        return res.status(201).json({ ok: true, msg: 'registro exitoso, se envio un formulario de virificacion a tu correo' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

export const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    if (!email) return res.status(403).json({ ok: false, msg: 'Operación invalida' });
    if (!password) return res.status(403).json({ ok: false, msg: 'Operación invalida' });
    // console.log(req.body);
    try {
        // verificiar si el usuario existe

        // console.log(usuario);
        // crear el token de autenticacion

        // almacenar en un cookie
        // res.cookie('_token', token, {
        //     httpOnly: true,
        //     // secure: true, //para certiciados SSH,
        //     // sameSite: true
        //     // maxAge: 60 * 60 * 1000, //1 hora
        // })

        return res.status(201).json({ ok: true, msg: 'login exitoso' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

export const obtenerPerfilUsuario = async (req = request, res = response) => {
    const { usuario } = req;
    try {
        const cliente = Usuario.findById();
        return res.status(200).json({ ok: true, msg: ' exitoso', data: usuario });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};


export const csrfProtection = async (req = request, res = response) => {
    // console.log(req.csrfToken());
    const token = req.csrfToken();
    console.log(req.ip);
    try {
        // res.cookie('csrf-token', token);
        res.status(201).json({ ok: true, msg: token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};

export const plantilla = async (req = request, res = response) => {
    try {
        return res.status(201).json({ ok: true, msg: ' exitoso' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ ok: false, msg: 'Error en el servidor' });
    }
};