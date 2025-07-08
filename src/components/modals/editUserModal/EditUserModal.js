import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi';
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../constants/constants';
import { useSelector } from 'react-redux';

const EditUserModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const token = useSelector((state) => state.auth.user.token);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role_id: '',
    section_id: '',
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || '',
        email: userData.email || '',
        role_id: userData.role_id?.toString() || '',
        section_id: userData.section_id?.toString() || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You are not authorized to perform this action.');
      return;
    }

    const payload = {
      ...form,
      role_id: parseInt(form.role_id),
      section_id: parseInt(form.section_id),
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userData.id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message || 'User updated successfully');
      onUpdate?.(response.data);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update user.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[var(--color-bg)] p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="flex justify-center -mt-16 mb-6">
          <div className="bg-blue-100 p-4 rounded-full border-4 border-[var(--color-bg)] shadow-md">
            <FaUserEdit className="text-[var(--color-secondary)] text-2xl" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] text-2xl"
        >
          <IoClose />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <div className="relative">
                                  <select
                                      name="role_id"
                                      value={form.role_id}
                                      onChange={handleChange}
                                      required
                                      className="w-full border border-gray-300 p-3 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                                  >
                                      <option value="">Select Role</option>
                                      <option value="2">Supervisor</option>
                                      <option value="3">Trainer</option>
                                      <option value="4">User</option>
          
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--color-text-muted)]">
                                      <FiChevronDown className="text-lg" />
                                  </div>
                              </div>
          
                              <div className="relative">
                                  <select
                                      name="section_id"
                                      value={form.section_id}
                                      onChange={handleChange}
                                      required
                                      className="w-full border [var(--color-text-muted)] p-3 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                                  >
                                      <option value="">Select Section</option>
                                      <option value="1">HR</option>
                                      <option value="2">Training</option>
                                      <option value="3">Development</option>
          
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--color-text-muted)]">
                                      <FiChevronDown className="text-lg" />
                                  </div>
                              </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 border border-[var(--color-text-muted)] text-[var(--color-text-main)] hover:bg-[var(--color-text-muted)] py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
