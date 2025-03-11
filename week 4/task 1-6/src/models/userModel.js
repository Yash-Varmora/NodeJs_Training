export let users = [
    { id: 1, username: "admin", password: "admin", role: "admin" },
    { id: 2, username: "user", password: "user", role: "user" },
];

export const findUser = (username) => users.find((user) => user.username === username);
