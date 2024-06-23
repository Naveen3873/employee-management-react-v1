// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosInstance'; // Adjust path as per your project structure
import ProfileCard from './ProfileCard';
import '../styles/profileCard.css'; // Import your custom CSS for profile card and pagination styling
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Loader from './Loader';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const countPerPage = 6; // Number of users per page

    useEffect(() => {
        fetchUsers(currentPage, countPerPage);
    }, [currentPage]); // Only re-fetch users when currentPage changes

    const fetchUsers = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/admin/users?page=${page}&limit=${limit}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            // console.log(error.response);
            if(error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'No Permission for access this page',
                });
            }
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleAccept = async (userId) => {
        setLoading(true);
        try {
            await axiosInstance.put(`/api/admin/approve/${userId}`);
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'User approved successfully',
            });
            // setUsers(users.filter(user => user._id !== userId));
            fetchUsers(currentPage, countPerPage);

        } catch (error) {
            console.error('Error accepting user:', error);
            setLoading(false);
        }
    };

    const handleReject = async (userId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reject the user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/api/admin/reject/${userId}`);
                    Swal.fire({
                      title: "Rejected!",
                      text: "The user has been rejected.",
                      icon: "success"
                    });
                    // setUsers(users.filter(user => user._id !== userId));
                    fetchUsers(currentPage, countPerPage);
                } catch (error) {
                    console.error('Error rejecting user:', error);
                }
            }
          });
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Navbar />
            {loading ? <Loader /> :
            <div>
                <h2 className="text-primary pt-2">Admin Dashboard</h2>
                <div className="user-list">
                    {users.map(user => (
                        <ProfileCard key={user._id} user={user} onAccept={handleAccept} onReject={handleReject} />
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => goToPage(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </div> 
            }
        </div>
    );
};

export default AdminDashboard;