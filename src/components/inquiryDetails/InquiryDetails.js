import React from 'react';

const InquiryDetails = () => {
  const data = {
    id: '01',
    title: 'هل يتم تفعيل تقييد البيانات تلقائيًا عند تفعيل الباقات الإضافية ضمن عرض رمضان؟',
    status: 'open',
    category: 'ADS',
    sender_name:"raneem",
    attachment: {
      fileName: 'mtn image',
      url: '/assets/img/mtn-logo.png', 
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'text-[var(--color-status-open)]';
      case 'pending':
        return 'text-[var(--color-status-pending)]';
      case 'closed':
        return 'text-[var(--color-status-closed)]';
      default:
        return '';
    }
  };

  const isImageFile = (fileName) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
  };

  return (
    <div className="bg-[var(--color-bg)] p-4 sm:p-6 rounded-xl shadow border border-[var(--color-border)] max-w-full sm:max-w-5xl mx-auto overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-[var(--color-text-main)]">Inquiry details</h2>
      <table className="w-full text-sm text-left rtl:text-right min-w-[400px]">
        <tbody>
          {[
            { label: 'id', value: data.id },
            { label: 'title', value: data.title },
            { label: 'status', value: data.status, className: getStatusColor(data.status) },
            { label: 'category', value: data.category },
            { label: 'sender_name', value: data.sender_name },
            {
              label: 'attachment',
              value: isImageFile(data.attachment.fileName) ? (
                <img
                  src={data.attachment.url}
                  alt={data.attachment.fileName}
                  className="max-w-xs sm:max-w-sm md:max-w-md rounded border border-[var(--color-border)]"
                />
              ) : (
                <a
                  href={data.attachment.url}
                  className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.attachment.fileName}
                </a>
              ),
            },
          ].map(({ label, value, className = '' }) => (
            <tr key={label} className="border-t border-[var(--color-border)] flex flex-col sm:table-row">
              <td className="py-2 sm:py-3 px-0 sm:px-3 font-medium text-[var(--color-text-muted)] w-full sm:w-1/4">{label}</td>
              <td className={`py-2 sm:py-3 px-0 sm:px-3 text-[var(--color-text-main)] ${className}`}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryDetails;
