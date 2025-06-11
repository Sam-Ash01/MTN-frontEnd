import React, { useState } from 'react';
import { FaStar, FaReply, FaQuestion } from 'react-icons/fa';
import { FiChevronDown } from "react-icons/fi";
import StatCard from '../../components/common/cards/StatCard';
import FilterTabs from '../../components/common/filters/FilterTabs';
import DynamicTable from '../../components/common/tables/DynamicTable';

const dummyData = [
  {
    id: '01',
    title: 'هل يتم تفعيل..',
    status: 'Open',
    trainer: 'Raneem',
    category: 'ADS',
  },
  {
    id: '02',
    title: 'هل يتم تفعيل..',
    status: 'Closed',
    trainer: 'Nour',
    category: 'MTN Speed',
  },
  {
    id: '03',
    title: 'هل يتم تفعيل..',
    status: 'Pending',
    trainer: 'Mhd',
    category: 'TV',
  },
];

const statusColors = {
  Open: {
    bg: 'var(--color-status-open-bg)',
    text: 'var(--color-status-open)'
  },
  Closed: {
    bg: 'var(--color-status-closed-bg)',
    text: 'var(--color-status-closed)'
  },
  Pending: {
    bg: 'var(--color-status-pending-bg)',
    text: 'var(--color-status-pending)'
  },
};

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('All Inquiries');

  const filteredData =
    selectedTab === 'All Inquiries'
      ? dummyData
      : dummyData.filter((item) => item.status === selectedTab);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => (
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: statusColors[value]?.bg,
            color: statusColors[value]?.text
          }}
        >
          {value}
        </span>
      ),
    },
    { header: 'Trainer Name', accessor: 'trainer' },
    { header: 'Category', accessor: 'category' },
    {
      header: 'Reassign',
      accessor: 'reassign',
      cell: (_, row) => {
        const isClosed = row.status === 'Closed';

        return (
          <div className="relative w-full">
            <select
              disabled={isClosed}
              className={`appearance-none w-full pl-4 py-1.5 pr-0 rounded-full text-sm border border-[var(--color-border)] text-[var(--color-text-main)] bg-[var(--color-bg)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-primary)] ${isClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
            >
              <option>Reassign</option>
              <option>Trainer 1</option>
              <option>Trainer 2</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-main)]">
              <FiChevronDown className="w-4 h-4" />
            </div>
          </div>
        );
      },
    },

    {
      header: 'Delete',
      accessor: 'delete',
      cell: () => (
        <button
          className="px-3 py-1 rounded-full text-sm"
          style={{
            border: '1px solid var(--color-danger)',
            color: 'var(--color-danger)',
            backgroundColor: 'transparent'
          }}
        >
          Move to trash
        </button>
      ),
    },
  ];

  return (
    <div className="p-6" >
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-main)' }}>
        Home
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Open answered"
          count={12750}
          icon={FaQuestion}
          iconColorVar="--color-primary"
        />
        <StatCard
          title="Closed answered"
          count={5600}
          icon={FaQuestion}
          iconColorVar="--color-secondary"
        />
        <StatCard
          title="Response rate"
          count={3460}
          icon={FaReply}
          iconColorVar="--color-danger"
        />
        <StatCard
          title="Average rating"
          count={7920}
          icon={FaStar}
          iconColorVar="--color-primary"
        />
      </div>

      {/* Filters */}
      <FilterTabs
        tabs={['All Inquiries', 'Open', 'Closed', 'Pending']}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      {/* Table */}
      <DynamicTable columns={columns} data={filteredData} />
    </div>
  );
}

export default HomePage;