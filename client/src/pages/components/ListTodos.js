import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

export default function ListTodos() {
  // Delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      // This will update the todos state variable to exclude the deleted todo (the todo with the id that was passed to the function
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const [todos, setTodos] = useState([]); // todos is the state variable, setTodos is the function that updates the state variable

  const getTodos = async () => {
    // This function will be called when the component loads
    try {
      const response = await fetch("http://localhost:5000/todos"); // GET request to the server
      const jsonData = await response.json(); // Converts the response body to a JSON object

      setTodos(jsonData); // Sets todos to the JSON object (the todos retrieved from the server)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []); // The empty array ensures that the function is only called once

  return (
    <div className="flex justify-center">
      <div className="w-1/2 p-5 bg-base-200 mt-20 mx-10 ">
        <table className="table table-zebra w-full table-normal">
          {/* head */}
          <thead>
            <tr>
              <th className="w-fit">Description</th>
              <th className="w-1/4">Edit</th>
              <th className="w-1/4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                    <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-error"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
