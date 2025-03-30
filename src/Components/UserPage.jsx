import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserForm from "./CreateUserForm";
import "../styles/UserPage.css";

const UserPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  // Fetch todos from the API
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/todos/all/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the access token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data); // Assuming the response is an array of todos
    } catch (err) {
      setError("Error fetching todos. Please try again.");
      console.error(err);
    }
  };

  // Call the fetchTodos function when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 header">
        <h2>User Dashboard</h2>
        <div className="d-flex align-items-center">
          <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}>Create Todo</button>
          <div className="position-relative">
            <button
              className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setShowMenu(!showMenu)}
            >
              P
            </button>
            {showMenu && (
              <div className="position-absolute bg-white text-dark p-2 rounded shadow" style={{ right: 0, top: "45px" }}>
                <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <p>Welcome to the User Dashboard!</p>
        {error && <p className="text-danger">{error}</p>}
        {showForm && <CreateUserForm onClose={() => setShowForm(false)} />}

        {/* Display Todos in Scrollable Table */}
        <div className="mt-4 table-container">
          <h4>Your Todos</h4>
          {todos.length > 0 ? (
            <div className="table-responsive scrollable-table">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.priority}</td>
                      <td>{todo.complete.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No todos available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
