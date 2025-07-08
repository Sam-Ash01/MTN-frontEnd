import React, { useState } from 'react';
import FilterTabs from '../../components/common/filters/FilterTabs';
import DynamicTable from '../../components/common/tables/DynamicTable';
import Pagination from '../../components/common/pagination/Pagination';
import OutlineButton from '../../components/common/buttons/OutlineButton';
import FloatingActionButton from '../../components/common/buttons/FloatingActionButton';
import { StatusBadge } from '../../components/common/badges/StatusBadge';
import CategoryFormModal from '../../components/modals/CategoryFormModal';

const tabs = [
  'Categories',
  'Active Categories',
  'Unactive Categories',
  'Trashed Categories',
];

const categories = [
  { name: 'Electronics', status: 'Active' },
  { name: 'Clothing', status: 'Inactive' },
  { name: 'Books', status: 'Active' },
  { name: 'Sports', status: 'Inactive' },
  { name: 'Music', status: 'Active' },
  { name: 'Office', status: 'Inactive' },
];

const categoryStatusColors = {
  Active: { bg: 'var(--color-status-open-bg)', text: 'var(--color-status-open)' },
  Inactive: { bg: 'var(--color-status-pending-bg)', text: 'var(--color-status-pending)' },
};

const Categories = () => {
  const [selectedTab, setSelectedTab] = useState('Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddCategory = (formData) => {
    console.log('New Category:', formData);
    // Call API or update state here
  };

  const handleEdit = (category) => {
    console.log('Edit Category:', category);
    setSelectedCategory(category);
    setIsEditOpen(true);
  };

  const handleUpdateCategory = (updatedData) => {
    console.log('Updated Category:', updatedData);
    setIsEditOpen(false);
    // Call API or update state here
  };

  const handleChangeStatus = (category) => {
    console.log(
      `Changing status of ${category.name} from ${category.status} to ${category.status === 'Active' ? 'Inactive' : 'Active'}`
    );
    // Toggle logic here
  };

  const handleMoveToTrash = (category) => {
    console.log(`Moving ${category.name} to trash`);
    // Move to trash logic here
  };

  const filtered =
    selectedTab === 'Categories'
      ? categories
      : selectedTab === 'Active Categories'
        ? categories.filter((c) => c.status === 'Active')
        : selectedTab === 'Unactive Categories'
          ? categories.filter((c) => c.status === 'Inactive')
          : []; // Trashed Categories logic here if needed

  const pageSize = 5;
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { header: 'Category', accessor: 'name' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (val) => (
        <StatusBadge value={val} colorMap={categoryStatusColors} />
      ),
    },
    {
      header: 'Change Status',
      accessor: 'changeStatus',
      cell: (_, row) => (
        <OutlineButton
          title={row.status === 'Active' ? 'Deactivate' : 'Activate'}
          color="secondary"
          onClick={() => handleChangeStatus(row)}
        />
      ),
    },
    {
      header: 'Move to Trash',
      accessor: 'moveToTrash',
      cell: (_, row) => (
        <OutlineButton
          title="Move to Trash"
          color="danger"
          onClick={() => handleMoveToTrash(row)}
        />
      ),
    },
  ];

  return (
    <div className="px-6 pt-6">
      <h1 className="text-2xl font-bold mb-2 text-[var(--color-text-main)]">Categories</h1>

      <FilterTabs
        tabs={tabs}
        selected={selectedTab}
        onChange={(tab) => {
          setSelectedTab(tab);
          setCurrentPage(1);
        }}
      />

      <DynamicTable columns={columns} data={paginated} />

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / pageSize)}
        onPageChange={setCurrentPage}
      />

      <FloatingActionButton
        onClick={() => setIsModalOpen(true)}
        label="Add Category"
      />

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCategory}
      />
    </div>
  );
};

export default Categories;
