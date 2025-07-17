import mongoose from "mongoose";

async function connectDb(url: string) {
    await mongoose.connect(url);
    console.log('connected to database');
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    balance: Number
})

const User = mongoose.model('user', userSchema);
const Account = mongoose.model('account', accountSchema);

export {connectDb, User, Account};



