// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from '../pages/Home/HomePage';
// import Inquiries from '../pages/Inquiries/Inquiries';
// import Reports from '../pages/Reports/Reports';
// import Users from '../pages/Users/Users';

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/users" element={<Users />} />
//       <Route path="/reports" element={<Reports />} />
//       <Route path="/trainers" element={<Inquiries />} />
//     </Routes>
//   );
// }


import { Routes, Route } from 'react-router-dom';
import routes from './routeConfig';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import UserLandingPage from '../pages/Landing/UserLandingPage';

const AppRoutes = () => {
  const userRole = useSelector((state) => state.auth.user?.role_id); // افترضنا إنه موجود بالـ Redux

  return (
    <Routes>
      
      {routes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <ProtectedRoute allowedRoles={route.roles} userRole={userRole}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="/unauthorized" element={<div>لا تملك صلاحية</div>} />
      <Route path="*" element={<div>الصفحة غير موجودة</div>} />
    </Routes>
  );
};

export default AppRoutes;

