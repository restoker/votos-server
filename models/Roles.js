import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const RolesSchema = new Schema({
    nombre: {
        type: String,
        default: 'cliente',
        lowercase: true,
        trim: true,
        enum: ['cliente', 'boss']
    },

});

export default model('Role', RolesSchema);