import mongoose from "mongoose";
const registroAccessoAdminSchema = mongoose.Schema({
    adminUsername: {
        type: String,
        required: true,
    },
    accessTime: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
})

export const RegistroAccessoAdmin = mongoose.model("registroAccessoAdmin", registroAccessoAdminSchema)