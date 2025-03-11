import { getUsers, saveUsers } from "../services/userService.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../data/data.json");

export const getAllUsers = (req, res) => {
    const users = getUsers(filePath);
    res.json(users);
}

export const getUserById = (req, res) => {
    const users = getUsers(filePath);
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
}

export const createUser = (req, res) => {
    const users = getUsers(filePath);
    const newUser = req.body;
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    saveUsers(filePath, users);
    res.status(201).json(newUser);
}

export const updateUser = (req, res) => {
    const users = getUsers(filePath);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    saveUsers(filePath, users);
    res.json(updatedUser);
}

export const deleteUser = (req, res) => {
    const users = getUsers(filePath);
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    saveUsers(filePath, users);
    res.json({ message: "User deleted" });
}