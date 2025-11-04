import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsData, usersData] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/admin/users')
      ]);
      setAnalytics(analyticsData.data.data);
      setUsers(usersData.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      alert('User role updated successfully');
      loadData();
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      alert('User deleted successfully');
      loadData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{analytics?.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{analytics?.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{analytics?.publishedCourses}</h3>
            <p>Published Courses</p>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <h2>User Distribution</h2>
        <div className="role-distribution">
          {analytics?.usersByRole.map((item) => (
            <div key={item._id} className="role-item">
              <span className="role-name">{item._id}</span>
              <span className="role-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h2>Course Categories</h2>
        <div className="category-distribution">
          {analytics?.coursesByCategory.map((item) => (
            <div key={item._id} className="category-item">
              <span className="category-name">{item._id}</span>
              <span className="category-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="users-section">
        <h2>User Management</h2>
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Courses</h2>
        <div className="recent-courses">
          {analytics?.recentCourses.map((course) => (
            <div key={course._id} className="recent-course-card">
              <h3>{course.title}</h3>
              <p>Instructor: {course.instructor?.name}</p>
              <span className={`status ${course.published ? 'published' : 'draft'}`}>
                {course.published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
