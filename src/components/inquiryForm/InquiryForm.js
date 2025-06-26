import React, { useState } from 'react';

const InquiryForm = () => {
    const [answer, setAnswer] = useState('');
    const [inquiryStatus, setInquiryStatus] = useState('');
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [showForm, setShowForm] = useState(true);

    const handleStatusChange = (e) => setInquiryStatus(e.target.value);

    const handleTrainerChange = (e) => {
        setSelectedTrainer(e.target.value);
        setShowForm(!e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ answer, inquiryStatus, selectedTrainer });
    };

    const resetForm = () => {
        setSelectedTrainer('');
        setShowForm(true);
    };

    return (
        <div className="bg-[var(--color-bg)] p-4 sm:p-6 rounded-xl shadow border border-[var(--color-border)] max-w-full sm:max-w-5xl mx-auto overflow-x-auto">
            {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-[var(--color-text-main)]">
                        Your answer
                    </h2>

                    <div className="text-sm text-[var(--color-text-main)]">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <label htmlFor="trainer-select" className="whitespace-nowrap">
                                Follow up to:
                            </label>
                            <div className="relative w-full sm:w-auto">
                                <select
                                    id="trainer-select"
                                    value={selectedTrainer}
                                    onChange={handleTrainerChange}
                                    className="w-full sm:w-60 appearance-none pl-3 pr-8 py-2 border border-[var(--color-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] bg-white text-[var(--color-text-main)]"
                                >

                                    <option value="">Select a trainer</option>
                                    <option value="trainer1">[Trainer1]</option>
                                    <option value="trainer2">[Trainer2]</option>
                                    <option value="trainer3">[Trainer3]</option>
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--color-text-main)]">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="answer" className="block text-sm font-medium text-[var(--color-text-main)] mb-1">
                            Enter your answer..
                        </label>
                        <textarea
                            id="answer"
                            rows={4}
                            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring--[var(--color-secondary)] focus:border-[var(--color-secondary)]"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0">
                            <p className="text-sm font-medium text-[var(--color-text-main)] whitespace-nowrap">Inquiry status:</p>

                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="closed"
                                        checked={inquiryStatus === 'closed'}
                                        onChange={handleStatusChange}
                                        className="h-4 w-4 accent-[var(--color-secondary)] focus:ring-[var(--color-secondary)] border-[var(--color-border)] rounded"
                                    />
                                    <span className="text-sm text-[var(--color-text-main)]">Closed</span>
                                </label>

                                <label className="inline-flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="pending"
                                        checked={inquiryStatus === 'pending'}
                                        onChange={handleStatusChange}
                                        className="h-4 w-4 accent-[var(--color-secondary)] focus:ring-[var(--color-secondary)] border-[var(--color-border)] rounded"
                                    />

                                    <span className="text-sm text-[var(--color-text-main)]">Pending</span>
                                </label>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-md hover:bg-[var(--color-secondary-hover)]"
                        >
                            Send
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <p className="mb-4 text-[var(--color-text-main)]">You've selected: {selectedTrainer}</p>
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-[var(--color-border)] text-[var(--color-cancel-back-btn-txt)] rounded-md hover:bg-[var(--color-cancel-back-btn-hover)]"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-md hover:bg-[var(--color-secondary-hover)] focus:outline-none"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InquiryForm;
