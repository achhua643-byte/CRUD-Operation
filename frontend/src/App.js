import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://127.0.0.1:8000/students/";

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`${API}update/${editingId}/`, form);
    } else {
      await axios.post(`${API}create/`, form);
    }
    setForm({ name: "", age: "", email: "" });
    setEditingId(null);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}delete/${id}/`);
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
  };

  return (
    <div className="container">
      <h2>Django + React CRUD</h2>

      <input placeholder='Name' value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder='Age' value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })} />

      <input placeholder='Email' value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} />

      <button
        className={editingId ? "update-btn" : "add-btn"}
        onClick={handleSubmit}
      >
        {editingId ? "Update" : "Add"}
      </button>

      <h3>Student List</h3>

      {students.map((s) => (
        <div className="student-item" key={s.id}>
          <span><h4>Name: {s.name}</h4> <p>Age: {s.age} </p> <p>Email: {s.email}</p></span>

          <div>
            <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
