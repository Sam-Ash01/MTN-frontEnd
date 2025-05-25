import React,{ useState }  from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaChartBar, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';

const navItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Users', icon: <FaUsers />, path: '/users' },
    { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
    { label: 'Trainers', icon: <FaChalkboardTeacher />, path: '/trainers' },
    { label: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
];

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        
        <div className="h-full bg-[var(--color-bg)] border-r w-16 sm:w-60  py-8 shadow-md transition-all duration-300">
            <nav className="space-y-2">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-base font-medium transition-all duration-200 pl-3 sm:pl-6 pr-3 sm:pr-4 py-2 w-full ${
                                isActive
                                    ? 'text-[var(--color-primary)] border-l-4 border-[var(--color-primary)] bg-yellow-50'
                                    : 'text-[var(--color-text-muted)] border-l-4 border-transparent hover:text-[var(--color-dark-gray)] hover:bg-[var(--color-light-gray)]'
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
