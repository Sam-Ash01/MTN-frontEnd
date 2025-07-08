import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import Input from '../common/inputs/Input';
import Select from '../common/inputs/Select';

const UserEditModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
    section: '',
    position: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        section: user.section || '',
        position: user.position || '',
      });
    }
  }, [user]);

  const validateField = (field, value) => {
    if (!value) return 'Required';
    return '';
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, form[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = () => {
    const newErrors = {};
    const newTouched = {};

    for (const field in form) {
      newErrors[field] = validateField(field, form[field]);
      newTouched[field] = true;
    }

    setErrors(newErrors);
    setTouched(newTouched);

    if (Object.values(newErrors).every((e) => !e)) {
      onSubmit(form);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-[var(--color-white)] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Icon */}
        <div className="flex justify-center mt-5">
          <div className="w-10 h-10 rounded-full bg-[var(--color-status-open-bg)] flex items-center justify-center shadow-sm">
            <Pencil size={20} color="var(--color-secondary)" />
          </div>
        </div>

        {/* Inputs */}
        <div className="overflow-y-auto px-6 pt-4 pb-2 space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name && errors.name}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={touched.email && errors.email}
          />
          <Select
            label="Role"
            options={['Supervisor', 'Trainer', 'User']}
            value={form.role}
            onChange={(value) => handleChange('role', value)}
            onBlur={() => handleBlur('role')}
            error={touched.role && errors.role}
          />
          <Select
            label="Section"
            options={['Training', 'Support', 'Sales']}
            value={form.section}
            onChange={(value) => handleChange('section', value)}
            onBlur={() => handleBlur('section')}
            error={touched.section && errors.section}
          />
          <Input
            label="Position"
            value={form.position}
            onChange={(e) => handleChange('position', e.target.value)}
            onBlur={() => handleBlur('position')}
            error={touched.position && errors.position}
          />
        </div>

        {/* Footer buttons */}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
