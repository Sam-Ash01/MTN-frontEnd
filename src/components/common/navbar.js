import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">MTN Tracker</div>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Inquiries</a></li>
          <li><a href="#" className="hover:underline">Reports</a></li>
          <li><a href="#" className="hover:underline">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
