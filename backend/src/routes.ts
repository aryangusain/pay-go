import { Request, Response, Router } from "express";
import { validateUser } from "./zod-schema";
import z from "zod";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { Account, User } from "./db";
import { authMiddleware } from "./middleware";
import mongoose from "mongoose";

const userRouter = Router();
const accountRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
    const { success, error } = validateUser.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: error.issues[0].message
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const hashedPassword = await hash(req.body.password, 5);

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1000 + Math.floor(Math.random()* 10000) 
    })

    res.status(200).json({
        message: "User signed up successfully",
    })
});

userRouter.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        //@ts-ignore
        if(user && await compare(password, user.password)) {
            //@ts-ignore
            const token = jwt.sign({userId: user._id, firstName: user.firstName}, process.env.JWT_SECRET as string);
            res.status(200).json({message: 'user signed in successfully', token});
        }
        else {
            res.status(411).json({message: 'invalid email or password'});
        }
    }
    catch(error) {
        console.log(error);
        res.status(411).json({message: 'some error occured', error});
    }
});

userRouter.get('/bulk', async (req: Request, res: Response) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            //@ts-ignore
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id
        }))
    })
})

accountRouter.get('/balance', authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const account = await Account.findOne({userId: req.user?.userId});

    res.status(200).json({
        balance: account?.balance
    })

})

accountRouter.post('/transfer', authMiddleware, async(req: Request, res: Response) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    //@ts-ignore
    const account = await Account.findOne({ userId: req.user.userId }).session(session);

    //@ts-ignore
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    //@ts-ignore
    await Account.updateOne({ userId: req.user.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    res.json({
        message: "Transfer successful"
    });
})

export { userRouter, accountRouter };