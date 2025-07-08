import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../../constants/constants';
import { useSelector } from 'react-redux';


const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const token = useSelector((state) => state.auth.user.token);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        section_id: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Token:", token);

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
            const response = await axios.post(`${API_BASE_URL}/api/add_user`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            toast.success(response.data.message || 'User created successfully');
            onCreate?.(response.data);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || 'Failed to create user. Try again.'
            );
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-[var(--color-bg)] p-6 rounded-lg w-full max-w-md md:max-w-lg lg:max-w-xl relative">
                <div className="flex justify-center -mt-16 mb-6">
                    <div className="bg-blue-100 p-4 rounded-full border-4 border-[var(--color-bg)] shadow-md">
                        <FaUserPlus className="text-[var(--color-secondary)] text-2xl" />
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
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                    />

                    <div className="relative">
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                        />
                        <div
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] cursor-pointer"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            name="password_confirmation"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                        />
                        <div
                            onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] cursor-pointer"
                        >
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>

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
                            className="w-full sm:w-1/2 border border-[var(--color-text-muted)] text-[var(--color-text-main)] py-2 rounded hover:bg-[var(--color-text-muted)] transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 bg-[var(--color-secondary)] text-white py-2 rounded hover:bg-[var(--color-secondary-hover)] transition"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;
