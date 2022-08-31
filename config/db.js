// import mongoose from 'mongoose';

// const mongooConnection = {
//     isConnected: 0
// }

// export const connectarDB = async () => {


//     if (mongooConnection.isConnected) {
//         console.log('Ya estabamos conectados');
//         return;
//     }

//     if (mongoose.connections.length > 0) {
//         mongooConnection.isConnected = mongoose.connections[0].readyState;

//         if (mongooConnection.isConnected === 1) {
//             console.log('usando conexión anterior');
//             return;
//         }
//         await mongoose.disconnect();
//     }

//     // try {
//     //     await connect(process.env.MONGO_URI);
//     //     console.log('Mongo Atlas esta conectado'.blue);
//     // } catch (e) {
//     //     console.log(e);
//     //     throw new Error('Error en la base de datos - vea logs');
//     // }
//     await mongoose.connect(process.env.MONGO_URI || '');
//     mongooConnection.isConnected = 1;
//     console.log('Conectado a Mongo Atlas'.blue);

// }

// export const desconnectarDB = async () => {

//     if (process.env.NODE_ENV === 'development') return;

//     if (mongooConnection.isConnected === 0) return;

//     await mongoose.disconnect();
//     console.log('Desconectado de MongoDB');
// }

import mongoose from 'mongoose'
import _ from 'colors'


const conectarDb = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo Db Atlas is ready!!!'.blue);
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs'.red);
    }


}

export default conectarDb;