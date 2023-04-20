import { useState } from "react";

export default function EditTodo({ todo }) {
  const [description, setDescription] = useState(todo.description); // Sets the initial value of the input field to the description of the todo passed to the component

  // Edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT", // PUT request to the server
          headers: { "Content-Type": "application/json" }, // Tells the server that the body is a JSON string
          body: JSON.stringify(body), // Converts the body object to a JSON string
        }
      );
      window.location = "/"; // Refreshes the page after the PUT request is sent
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <a href={`#id${todo.todo_id}`} className="btn btn-success">
        {" "}
        {/* The href attribute is the same as the id attribute */}
        Edit
      </a>
      <div className="modal" id={`id${todo.todo_id}`}>
        {" "}
        {/* The id attribute is the same as the href attribute */}
        <div className="modal-box">
          <h3 className="text-2xl font-medium mb-5">Edit Todo</h3>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="input input-bordered input-primary max-w-xs w-full"
          ></input>
          <div className="modal-action">
            <a
              href="#"
              className="btn btn-success"
              onClick={(e) => updateDescription(e)}
            >
              Edit
            </a>
            <a href="#" className="btn btn-error"
            onClick={() => setDescription(todo.description)}> {/* Sets the input field back to the original description */}
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
