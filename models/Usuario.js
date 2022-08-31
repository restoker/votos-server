import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// const { DataTypes } = sequelize;

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    apellidos: {
        type: String,
        required: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        default: '',
        // required: true,
    },
    confirmado: {
        type: Boolean,
        required: true,
        default: false
    }
});

UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

export default model('Usuario', UsuarioSchema);

// id: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//     unique: true,
// },
// nombre: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// apellidos: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// telefono: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
// },
// email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
// },
// password: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// isAmin: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
// },
// token: DataTypes.STRING,
// confirmado: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
// }