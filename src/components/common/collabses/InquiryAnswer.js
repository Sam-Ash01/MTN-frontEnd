import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StatusBadge } from '../badges/StatusBadge';

const ticketStatusColors = {
  Open: { bg: 'var(--color-status-open-bg)', text: 'var(--color-status-open)' },
  Closed: { bg: 'var(--color-status-closed-bg)', text: 'var(--color-status-closed)' },
  Pending: { bg: 'var(--color-status-pending-bg)', text: 'var(--color-status-pending)' },
};

const InquiryAnswer = ({ question, answer, status, expanded, onToggle }) => {
  return (
    <div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-semibold text-[var(--color-text-main)]">{question}</h3>
        <div className="flex items-center gap-2">
          <StatusBadge value={status} colorMap={ticketStatusColors} />
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {expanded && (
        <p className="mt-2 text-[var(--color-text-main)] text-base leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

export default InquiryAnswer;
