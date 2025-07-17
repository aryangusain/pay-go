import express, { Request, Response }  from "express";
import cors from 'cors';
import { connectDb } from "./db";
import { accountRouter, userRouter } from "./routes";
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);


async function main() {
    await connectDb(process.env.DATABASE_URI as string);

    app.listen(port, () => {
        console.log(`server is running at port ${port}`)
    })
}

main();