import { Schema, model } from 'mongoose'


const CandidatoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        lowercase: true,
    },
    partido: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    imagen: {
        type: String,
        required: true,
        lowercase: true,
    },
    votos: {
        type: Number,
        default: 0,
    }
});


CandidatoSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


export default model('Usuario', CandidatoSchema);
