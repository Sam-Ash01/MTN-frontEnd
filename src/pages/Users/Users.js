import React, { useState } from 'react';
import FilterTabs from '../../components/common/filters/FilterTabs';
import DynamicTable from '../../components/common/tables/DynamicTable';
import Pagination from '../../components/common/pagination/Pagination';
import OutlineButton from '../../components/common/buttons/OutlineButton';
import { StatusBadge } from '../../components/common/badges/StatusBadge';
import FAB from '../../components/common/buttons/FAB';
import CreateUserModal from '../../components/modals/createUserModal/CreateUserModal';
import EditUserModal from '../../components/modals/editUserModal/EditUserModal';



const tabs = ['All users', 'Supervisors', 'Trainers', 'Users', 'Blocked Users'];

const users = [
  {
    name: 'Raneem',
    email: 'raneem@gmail.com',
    role: 'Supervisor',
    position: 'Team Lead',
    status: 'Active',
  },
  {
    name: 'Salma',
    email: 'salma@gmail.com',
    role: 'Trainer',
    position: 'Training Officer',
    status: 'Active',
  },
  {
    name: 'Nour',
    email: 'nour@gmail.com',
    role: 'Trainer',
    position: 'HR Trainer',
    status: 'Inactive',
  },
  {
    name: 'Solaf',
    email: 'solaf@gmail.com',
    role: 'User',
    position: 'Support',
    status: 'Active',
  },
  {
    name: 'Alaa',
    email: 'alaa@gmail.com',
    role: 'Supervisor',
    position: 'Operations Manager',
    status: 'Suspended',
  },
  {
    name: 'Mhd',
    email: 'mhd@gmail.com',
    role: 'User',
    position: 'Customer Agent',
    status: 'Active',
  },
  {
    name: 'Lina',
    email: 'lina@gmail.com',
    role: 'User',
    position: 'Intern',
    status: 'Inactive',
  },
];

const userStatusColors = {
  Active: { bg: 'var(--color-status-open-bg)', text: 'var(--color-status-open)' },
  Suspended: { bg: 'var(--color-status-closed-bg)', text: 'var(--color-status-closed)' },
  Inactive: { bg: 'var(--color-status-pending-bg)', text: 'var(--color-status-pending)' },
};

const UsersPage = () => {
  const [selectedTab, setSelectedTab] = useState('All users');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered =
    selectedTab === 'All users'
      ? users
      : selectedTab === 'Blocked Users'
        ? users.filter((u) => u.status === 'Blocked' || u.status === 'Inactive')
        : users.filter((u) => u.role === selectedTab.slice(0, -1));
  const pageSize = 5;
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRowClick = (row) => {
    window.location.href = `/users/${row.name.toLowerCase()}`;
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleBlockToggle = (row) => {
    console.log(
      `${row.name} is now ${row.status === 'Inactive' ? 'Active' : 'Inactive'}`
    );
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Role',
      accessor: 'role',
      cell: (val) => (
        <span
          style={{
            color:
              val === 'Supervisor'
                ? 'var(--color-secondary)'
                : val === 'Trainer'
                  ? 'var(--color-danger)'
                  : val === 'User'
                    ? 'var(--color-primary)'
                    : 'var(--color-warning)',
          }}
          className="font-medium"
        >
          {val}
        </span>

      ),
    },
    { header: 'Position', accessor: 'position' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (val) => (
        <StatusBadge value={val} colorMap={userStatusColors} />
      ),
    },
    {
      header: 'Edit',
      accessor: 'edit',
      cell: (_, row) => (
        <OutlineButton
          title="Edit"
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(row);
          }}
        />
      ),
    },
    {
      header: 'Block/Unblock',
      accessor: 'block',
      cell: (_, row) => (
        <OutlineButton
          title={
            row.status === 'Inactive' || row.status === 'Suspended'
              ? 'Unblock'
              : 'Block'
          }
          color="danger"
          onClick={() => handleBlockToggle(row)}
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-[var(--color-text-main)]">Users</h1>

      <FilterTabs
        tabs={tabs}
        selected={selectedTab}
        onChange={(tab) => {
          setSelectedTab(tab);
          setCurrentPage(1);
        }}
      />
      <DynamicTable
        columns={columns}
        data={paginated}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / pageSize)}
        onPageChange={setCurrentPage}
      />

      <FAB onClick={() => setIsModalOpen(true)} />

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(newUser) => {
          console.log('User created:', newUser);
          setIsModalOpen(false);
        }}
      />

      <EditUserModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        userData={selectedUser}
        onUpdate={(updatedUser) => {
          console.log('Updated user:', updatedUser);
          setEditModalOpen(false);
          // يمكنك تحديث الحالة لاحقًا لإعادة تحميل الجدول
        }}
      />

    </div>
  );
};

export default UsersPage;