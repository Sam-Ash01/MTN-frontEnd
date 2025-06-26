import React from 'react'
import { useSelector } from 'react-redux';

const Reports = () => {
  const { role_id } = useSelector((state) => state.auth.user);

  return <div>{role_id === 1 ? 'عرض تقارير المدرب' : 'عرض تقارير أخرى'}</div>;
}

export default Reports
