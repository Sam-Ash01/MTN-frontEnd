# MTN Syria - Trainer Tracking System (Frontend)

This is the **frontend** interface for the **Trainer Tracking System** developed for **MTN Syria**. The system is designed to streamline and manage inquiries sent to the training department by customer service employees, replacing the traditional email-based process.

---

## 🌟 Overview

The system allows employees to send structured inquiries under specific categories. These inquiries are assigned by supervisors to the appropriate trainers. Trainers can respond to the inquiries, track their statuses, and attach supporting documents if necessary.

The platform also supports evaluation of trainer responses, performance reporting based on KPIs, and internal tracking between departments — all wrapped within MTN’s visual identity and security requirements.

---

## 💻 Technologies Used

- **React.js** – for building the user interface
- **Tailwind CSS** – for styling with MTN's visual identity
- **React Router** – for page navigation
- **Responsive design** – works across devices

---

## 🔐 User Roles & Features

### 🔸 **User (Employee)**
- Submit inquiries under specific categories (can include manual references)
- View all submitted inquiries
- Re-open closed inquiries if the answer is unclear
- Save inquiries to favorites for quick access
- Rate trainer responses

### 🔸 **Trainer**
- Respond to assigned inquiries
  - Change status to `pending` if follow-up is needed
  - Mark as `closed` when answered
- Upload supporting attachments
- View personal performance reports and department-level statistics

### 🔸 **Supervisor**
- Create and assign categories to trainers
- Reassign inquiries
- Evaluate trainer responses
- Generate and export dynamic reports (Excel format)

### 🔸 **Manager**
- Add users and assign roles (e.g., Supervisor)
- Full control over trainer assignments
- Export Excel-based performance reports based on custom KPIs

### 🔸 **Assistant**
- Help respond to inquiries on behalf of trainers
- Reassign inquiries to other assistants if needed

---

## 📊 System Features

- Inquiry lifecycle tracking (`opened`, `pending`, `closed`)
- Email notifications for:
  - New inquiries
  - Trainer replies
  - Unattended inquiries
- Performance tracking:
  - Average response time (excluding weekends/holidays)
  - Average rating of trainer responses
- Security: automatic deletion of old closed inquiries (configurable by manager)
- MTN brand identity compliance

---

## 📱 Mobile Support

A dedicated mobile version is planned for:
- Trainers
- Supervisors
- Managers

---

## 🚀 Notes

- This repository contains the **frontend only**.
- Backend integration (authentication, database, email, etc.) is assumed to be managed separately.
- Project structure is modular and supports extension for new features.

---

## 📦 Getting Started

```bash
npm install
npm run start
