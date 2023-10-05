import { Router } from "express";
import handlerWrapper from "../middlewares/handlerWrapper";
import * as userModel from "../model/user";
import { User } from "../model/user";
import CustomError from "../utils/customError";
import { comparePassword, encryptPassword } from "../utils/encryptPassword";
import { CustomResponse } from "../utils/customResponse";

const router = Router();

router.get("/login", handlerWrapper(async (req, res) => {
    const query = req.query as unknown as User;

    if (!query.email || !query.password)
        throw new CustomError(401, "Email and password are required");

    const matchedUser = await userModel.findByEmail(query.email);

    if (matchedUser.length == 0)
        throw new CustomError(404, `Can't find user with email ${query.email}`);

    const passwordMatched = await comparePassword(query.password, matchedUser[0].password);
    // Check if password matches
    if (!passwordMatched)
        throw new CustomError(401, "Incorrect Password");

    const customResponse = new CustomResponse(
        200,
        "Ok",
        matchedUser
    );

    res.status(customResponse.statusCode).json(customResponse);
}));

router.post("/register", handlerWrapper(async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body as User;

    if (!firstname || !lastname || !email || !password)
        throw new CustomError(400, "Firstname, Lastname, Email and Password are required");

    const matchedUser = await userModel.findByEmail(email);

    if (matchedUser.length > 0)
        throw new CustomError(409, "Email already taken");

    // Encrypt password
    const encryptedPassword = await encryptPassword(password);
    const newUser: User = {
        firstname,
        lastname,
        email,
        password: encryptedPassword
    };
    const customResponse = new CustomResponse(201,
        "Registration successful",
        newUser);

    // Insert ang data sa database
    userModel.insert(newUser);

    res.status(customResponse.statusCode).json(customResponse);
}));

router.patch("/update/:id", handlerWrapper(async (req, res) => {
    const { firstname, lastname } = req.body as User;
    const id = req.params.id;

    await userModel.updateById(id, { firstname, lastname });

    const user = await userModel.findById(id);
    const customResponse = new CustomResponse(
        200,
        "User successfully updated",
        user
    );

    res.status(customResponse.statusCode).json(customResponse);
}));

router.delete("/remove/:id");

export default router;