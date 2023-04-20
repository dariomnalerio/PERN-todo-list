const express = require("express"); // Import express
const cors = require("cors"); // Import cors
const pool = require("./db"); // Import pool, which is the connection to the database

const app = express(); // Create express app (server)

//middleware
app.use(cors()); // Allows us to make requests from our front end to our back end
app.use(express.json()); // Gives access to req.body

// ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body; // {description} is destructuring, which is the same as const description = req.body.description
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", // RETURNING * returns all the columns in the table, which is the same as SELECT * FROM todo
      [description]
    ); // $1 is a placeholder for the description variable

    res.json(newTodo.rows[0]); // We want the first item in the array, which is the new todo that was created
  } catch (err) {
    console.error(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows); // Get all the rows from the table
  } catch (err) {
    console.log(err.message);
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    ); // $1 is the description, $2 is the id

    res.json("Todo was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
})


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
