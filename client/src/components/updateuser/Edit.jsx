import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const base_url="https://crud-app-gahr.onrender.com"

  const users = {
    fname: "",
    phoneNumber: "",
    email: "",
    hobbies: ""
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${base_url}/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`${base_url}/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <Link to={"/"} className="text-blue-500 mb-4 inline-block">
          Back
        </Link>
        <h3 className="text-xl font-semibold mb-4">Update User</h3>

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="fname" className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              value={user.fname}
              onChange={inputChangeHandler}
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
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={inputChangeHandler}
              id="phoneNumber"
              autoComplete="off"
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={inputChangeHandler}
              id="email"
              autoComplete="off"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hobbies" className="block mb-1 text-sm font-medium">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              value={user.hobbies}
              onChange={inputChangeHandler}
              id="hobbies"
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
