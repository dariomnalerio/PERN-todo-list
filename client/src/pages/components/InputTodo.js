import { useState } from "react";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default behavior of the browser
    try {
      const body = { description }; // This is the same as {description: description}
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Tells the server that the body is a JSON string
        body: JSON.stringify(body), // Converts the body object to a JSON string
      });

      setDescription(""); // Clears the input field

      window.location = "/"; // Refreshes the page after the POST request is sent
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-5xl text-center my-10">Pern Todo List</h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary max-w-xs w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary ml-5 rel">Add</button>
      </form>
    </div>
  );
}
