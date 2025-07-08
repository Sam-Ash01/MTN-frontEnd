import React, { useState } from 'react';
import DynamicTable from '../../components/common/tables/DynamicTable';
import Pagination from '../../components/common/pagination/Pagination';
import OutlineButton from '../../components/common/buttons/OutlineButton';
import FilterTabs from '../../components/common/filters/FilterTabs';
import InquiryAnswer from '../../components/common/collabses/InquiryAnswer';
import RatingStars from '../../components/common/ratings/RatingStars';
import { UserCircle } from 'lucide-react';
import FloatingActionButton from '../../components/common/buttons/FloatingActionButton';
import SectionFormModal from '../../components/modals/SectionFormModal';

const dummySections = [
  { id: 1, name: 'Frontend', division: 'Development', usersCount: 12 },
  { id: 2, name: 'Backend', division: 'Development', usersCount: 8 },
  { id: 3, name: 'Marketing', division: 'Business', usersCount: 5 },
  { id: 4, name: 'HR', division: 'Administration', usersCount: 3 },
  { id: 5, name: 'Design', division: 'Creative', usersCount: 7 },
  { id: 6, name: 'QA', division: 'Development', usersCount: 4 },
];

const dummyInquiries = [
  { id: 1, question: 'How to submit reports?', answer: 'Use the reporting tool in your dashboard.', rating: 4, status: 'Open' },
  { id: 2, question: 'What is the design guideline?', answer: 'Check the design system documentation.', rating: 3, status: 'Closed' },
];

const dummyUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Sara' },
];

const Sections = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState(null);
  const [filterTab, setFilterTab] = useState('Sections');
  const [detailTab, setDetailTab] = useState('Inquiries'); // 🆕 for toggling
  const [inquiryRatings, setInquiryRatings] = useState(
    Object.fromEntries(dummyInquiries.map((inq) => [inq.id, inq.rating]))
  );
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleRatingChange = (id, newRating) => {
    setInquiryRatings((prev) => ({ ...prev, [id]: newRating }));
  };

  const toggleAnswer = (id) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMoveToTrash = (id) => {
    console.log(`Move section ${id} to trash`);
  };

  const handleUntrash = (id) => {
    console.log(`Untrash section ${id}`);
  };

  const handleAddSection = (newSection) => {
    console.log('Add section', newSection);
    // You can push to state or call your API here
  };

  const pageSize = 5;
  const filteredSections = dummySections.filter(() => filterTab === 'Sections');
  const sectionPage = filteredSections.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { header: 'Section', accessor: 'name' },
    { header: 'Division', accessor: 'division' },
    { header: 'Users', accessor: 'usersCount' },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) =>
        filterTab === 'Sections' ? (
          <OutlineButton
            title="Delete"
            color="danger"
            onClick={() => handleMoveToTrash(row.id)}
          />
        ) : (
          <OutlineButton
            title="Untrash"
            color="secondary"
            onClick={() => handleUntrash(row.id)}
          />
        ),
    },
  ];

  return (
    <div className="px-6 pt-6 overflow-hidden" dir="ltr">
      <h1 className="text-2xl font-bold text-[var(--color-text-main)] mb-4">
        Sections Overview
      </h1>

      <FilterTabs
        tabs={['Sections', 'Trashed Sections']}
        selected={filterTab}
        onChange={setFilterTab}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Right Table */}
        <div className="flex flex-col max-h-[calc(100vh-180px)] overflow-auto rounded-2xl">
          <DynamicTable
            columns={columns}
            data={sectionPage}
            onRowClick={setSelectedSection}
            rowClassName="hover:bg-[var(--color-white)] cursor-pointer transition duration-200 rounded"
          />
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredSections.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Left: Toggle between Inquiries & Users */}
        <div className="bg-[var(--color-white)] rounded-2xl shadow-md flex flex-col max-h-[calc(100vh-240px)]">
          {selectedSection ? (
            <>
              <div className="sticky top-0 z-10 bg-[var(--color-white)] px-6 pt-4 border-b rounded-t-2xl border-[var(--color-border)]">
                <h2 className="text-xl font-semibold text-[var(--color-text-main)]">
                  {selectedSection.name}'s Details
                </h2>
                <FilterTabs
                  tabs={['Inquiries', 'Users']}
                  selected={detailTab}
                  onChange={setDetailTab}
                />
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {detailTab === 'Inquiries' ? (
                  dummyInquiries.length > 0 ? (
                    dummyInquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="border border-[var(--color-border)] rounded-xl p-4 bg-[var(--color-bg)]"
                      >
                        <InquiryAnswer
                          question={inquiry.question}
                          answer={inquiry.answer}
                          status={inquiry.status}
                          expanded={expandedAnswers[inquiry.id]}
                          onToggle={() => toggleAnswer(inquiry.id)}
                        />
                        {expandedAnswers[inquiry.id] && (
                          <div className="mt-2">
                            <span className="text-[var(--color-text-muted)] mr-2">
                              Rate this answer:
                            </span>
                            <RatingStars
                              value={inquiryRatings[inquiry.id]}
                              onChange={(val) => handleRatingChange(inquiry.id, val)}
                              color="var(--color-primary)"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-[var(--color-text-secondary)]">
                      No inquiries for this section yet.
                    </p>
                  )
                ) : (
                  <>
                    <ul className="space-y-2">
                      {dummyUsers.map((user) => (
                        <li
                          key={user.id}
                          className="px-4 py-2 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
                        >
                          {user.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-[var(--color-text-muted)] py-12 flex flex-col items-center justify-center h-full">
              <UserCircle size={42} className="mb-2 text-[var(--color-text-muted)]" />
              <p className="text-lg">Select a section to view details</p>
              <p className="text-sm mt-1">Click on any section row</p>
            </div>
          )}
        </div>
      </div>

      <FloatingActionButton
        onClick={() => setIsModalOpen(true)}
        label="Add Section"
      />

      <SectionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSection}
      />

    </div>
  );
};

export default Sections;
