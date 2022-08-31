import jwt from 'jsonwebtoken';

const generarJWT = (data) => {
    const token = jwt.sign({ ...data }, process.env.SECRETA, {
        expiresIn: '1d'
    });

    return token;
}

export {
    generarJWT
}