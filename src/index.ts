import express from "express";
import userRouter from "./routes/user";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const PORT = 5000;


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/user", userRouter);
app.use(errorHandler);

app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`));