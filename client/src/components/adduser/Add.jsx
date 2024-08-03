import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const base_url="https://crud-app-gahr.onrender.com"

  const users = {
    fname: "",
    phoneNumber: "",
    email: "",
    hobbies: ""
  };

  const [user, setUser] = useState(users);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(user.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }
    // Add more validation if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await axios.post(`${base_url}/create`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <Link to={"/"} className="text-blue-500 inline-block mb-4">Back</Link>
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="fname" className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              onChange={inputHandler}
              id="fname"
              name="fname"
              autoComplete="off"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium">Phone Number</label>
            <input
              type="text"
              onChange={inputHandler}
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              autoComplete="off"
              placeholder="Phone Number"
              maxLength="10"
              pattern="\d{10}"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              onChange={inputHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hobbies" className="block mb-1 text-sm font-medium">Hobbies</label>
            <input
              type="text"
              onChange={inputHandler}
              id="hobbies"
              name="hobbies"
              autoComplete="off"
              placeholder="Hobbies"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold p-3 rounded-md shadow-lg"
            >
              Save and Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
