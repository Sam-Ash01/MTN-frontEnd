import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import Input from '../common/inputs/Input';
import Select from '../common/inputs/Select';

const SectionFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    division: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    if (!value || value.trim() === '') {
      return 'Required';
    }
    return '';
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    const newTouched = {};
    Object.keys(form).forEach((field) => {
      newErrors[field] = validateField(field, form[field]);
      newTouched[field] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    if (Object.values(newErrors).every((e) => !e)) {
      onSubmit(form);
      onClose();
      setForm({ name: '', division: '' }); // reset after submission
      setErrors({});
      setTouched({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-[var(--color-white)] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Icon */}
        <div className="flex justify-center mt-5">
          <div className="w-10 h-10 rounded-full bg-[var(--color-status-open-bg)] flex items-center justify-center shadow-sm">
            <LayoutDashboard size={20} color="var(--color-secondary)" />
          </div>
        </div>

        {/* Form fields */}
        <div className="overflow-y-auto px-6 pt-4 pb-2 space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name && errors.name}
          />
          <Select
            label="Division"
            options={['Development', 'Business', 'Creative', 'Administration']}
            value={form.division}
            onChange={(value) => handleChange('division', value)}
            onBlur={() => handleBlur('division')}
            error={touched.division && errors.division}
          />
        </div>

        {/* Sticky footer */}
        <div className="px-6 py-4 mt-auto border-t border-[var(--color-border)] bg-[var(--color-white)] rounded-b-2xl">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-main)]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full py-2 rounded-lg text-[var(--color-white)] bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] shadow transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFormModal;
