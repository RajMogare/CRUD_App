import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {
    const base_url="https://crud-app-gahr.onrender.com"
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method:"get",
                baseURL:`${base_url}/getall`,
            });
            setUsers(response.data);
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const deleteUser = async (userId) => {
        await axios.delete(`${base_url}/delete/${userId}`)
            .then((response) => {
                setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
                toast.success(response.data.msg, { position: "top-right" });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendMail = async () => {
        if (selectedUsers.length === 0) {
            toast.error("No users selected", { position: "top-right" });
            return;
        }

        const usersToSend = users.filter(user => selectedUsers.includes(user._id));

        const data = {
            users: usersToSend,
            recipient: "rajmogare444@gmail.com",
        };

        try {
            const response = await axios.post(`${base_url}/sendMail`, data);
            toast.success(response.data.msg, { position: "top-right" });
        } catch (error) {
            toast.error("Failed to send email", { position: "top-right" });
        }
    };

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
                <Link to={"/add"} className='text-white bg-purple-600 font-semibold shadow-lg rounded-md p-2 mb-2 sm:mb-0'>
                    Add User
                </Link>
                <button
                    onClick={sendMail}
                    className='bg-blue-600 text-white p-2 rounded-md'
                >
                    Send Email
                </button>
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full mt-6 border-collapse border border-gray-300'>
                    <thead>
                        <tr>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Select</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>ID</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Name</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Phone Number</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Email</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Hobbies</th>
                            <th className='bg-blue-900 text-white p-2 border border-gray-300'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id} className='text-center'>
                                    <td className='p-2 border border-gray-300'>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleCheckboxChange(user._id)}
                                        />
                                    </td>
                                    <td className='p-2 border border-gray-300'>{index + 1}</td>
                                    <td className='p-2 border border-gray-300'>{user.fname}</td>
                                    <td className='p-2 border border-gray-300'>{user.phoneNumber}</td>
                                    <td className='p-2 border border-gray-300'>{user.email}</td>
                                    <td className='p-2 border border-gray-300'>{user.hobbies}</td>
                                    <td className='p-2 border border-gray-300 flex justify-center'>
                                        <button
                                            className='bg-red-600 p-2 text-white rounded-md mr-2'
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <Link to={`/edit/${user._id}`} className='bg-green-600 p-2 text-white rounded-md'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
