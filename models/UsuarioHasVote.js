import mongoose from 'mongoose'

const { Schema, model } = mongoose;


const UsuarioHasVoteSchema = new Schema({
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    candidatoId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidato',
        required: true
    }
})

export default model('UsuarioHasVote', UsuarioHasVoteSchema);