import React, { useState } from "react";

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(form);
    setEdit(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6 text-giigli-blue">Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          {edit ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <div className="p-2 bg-gray-50 rounded">{user.name}</div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          {edit ? (
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <div className="p-2 bg-gray-50 rounded">{user.email}</div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          {edit ? (
            <>
              <button
                onClick={handleSave}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEdit(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
