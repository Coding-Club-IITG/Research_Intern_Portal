import mongoose from "mongoose";

const typeOfUser = {
    STUDENT: 'student',
    RECRUITER: 'recruiter',
    ADMIN: 'admin'
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    typeOfUser: {
        type: String,
        enum: Object.values(typeOfUser),
        default: typeOfUser.STUDENT,
    },
    connection_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'typeOfUser',
    }
});

export const User = mongoose.model('User', UserSchema);