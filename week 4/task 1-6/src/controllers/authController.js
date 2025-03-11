import jwt from "jsonwebtoken"
import { findUser, users } from "../models/userModel.js"
import CustomError from "../utils/CustomError.js"

export const signup = (req, res, next) => {
    try {

        const { username, password, role } = req.body

        if (!username || !password || !role) {
            throw new CustomError("Username, password, and role are required", 400)
        }

        const user = findUser(username)
        if (user) {
            throw new CustomError("User already exists", 409)
        }
        const newUser = {
            id: users.length + 1,
            username,
            password,
            role
        }
        users.push(newUser)

        res.json({ success: true, message: "User created successfully" })
    } catch (error) {
        next(error);
    }
}

export const signin = (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = findUser(username)
        if (!user) {
            throw new CustomError("User not found", 404)
        }
        if (user.password !== password) {
            throw new CustomError("Invalid password", 401)
        }
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        res.json({ success: true, message: "Login successful", token })
    } catch (error) {
        next(error);
    }
}