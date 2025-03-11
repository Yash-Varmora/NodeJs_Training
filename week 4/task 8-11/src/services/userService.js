import fs from "fs";

export const getUsers = (filePath) => {
    if(!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath,JSON.stringify([]))
    }
    const data = fs.readFileSync(filePath, "utf-8");
    
    return JSON.parse(data);
}

export const saveUsers = (filePath, users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null,2));
}