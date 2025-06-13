import React, { useState, useEffect } from "react";
import axios from "axios";

function State() {
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [editId, setEditId] = useState(null); // Track the ID being edited

  // Fetch all states
  const fetchStates = () => {
    axios
      .get("https://localhost:7038/api/States")
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error fetching states:", err));
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId === null) {
        // Add new state
        await axios.post("https://localhost:7038/api/States", formData);
        alert("State added successfully!");
      } else {
        // Update state
        await axios.put(`https://localhost:7038/api/States/${editId}`, {
          id: editId,
          ...formData,
        });
        alert("State updated successfully!");
      }

      setFormData({ name: "", code: "" });
      setEditId(null);
      fetchStates();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred. Check console.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this State?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7038/api/States/${id}`);
      alert("State deleted successfully!");
      fetchStates();
    } catch (error) {
      console.error("Error deleting state:", error);
    }
  };

  // Handle edit - populate form and set editId
  const handleEdit = (state) => {
    setFormData({ name: state.name, code: state.code });
    setEditId(state.id);
  };

  return (
    <div className="container col-md-4 mt-4">
      <h2>{editId === null ? "Add State" : "Edit State"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="row mb-2">
          <input
            type="text"
            name="name"
            placeholder="Enter State name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-2">
          <input
            type="text"
            name="code"
            placeholder="Enter State code"
            className="form-control"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <button type="submit" className="btn btn-primary">
            {editId === null ? "Add State" : "Update State"}
          </button>
        </div>
      </form>

      <h4 className="mt-4">State List</h4>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {states.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.code}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() =>
                    alert(`ID: ${s.id}\nName: ${s.name}\nCode: ${s.code}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default State;
