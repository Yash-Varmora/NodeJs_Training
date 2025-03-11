import express from 'express';

const app = express();

app.set("view engine", "ejs");
// app.set("views","pub")
app.use(express.urlencoded({ extended: true }));

let todos = ["todo1", "todo2", "todo3"];

app.get("/", (req, res) => {
    res.render("index", { todos })
});

app.post("/add", (req, res) => {
    const newTodo = req.body.todo.trim()
    todos.push(newTodo)
    res.redirect("/")
})

app.listen(3000, () => { 
    console.log("Server is running on port 3000")
})