// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosInstance'; // Adjust path as per your project structure
import ProfileCard from './ProfileCard';
import '../styles/profileCard.css'; // Import your custom CSS for profile card and pagination styling
import Swal from 'sweetalert2';
import LogoutButton from './Auth/LogoutButton';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const countPerPage = 4; // Number of users per page

    useEffect(() => {
        fetchUsers(currentPage, countPerPage);
    }, [currentPage]); // Only re-fetch users when currentPage changes

    const fetchUsers = async (page, limit) => {
        try {
            const response = await axiosInstance.get(`/api/admin/users?page=${page}&limit=${limit}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAccept = async (userId) => {
        try {
            await axiosInstance.put(`/api/admin/approve/${userId}`);
            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'User approved successfully',
            });
            // setUsers(users.filter(user => user._id !== userId));
            fetchUsers(currentPage, countPerPage);
        } catch (error) {
            console.error('Error accepting user:', error);
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
            confirmButtonText: "Yes, delete it!"
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
            <h2>Admin Dashboard</h2>
            {/* <button className="logout-button">Logout</button> */}
            <LogoutButton className="logout-button" />
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
    );
};

export default AdminDashboard;