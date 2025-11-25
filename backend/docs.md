
# Islamic Academy Backend

## Installation Steps

### 1. Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Create .env file
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/islamic-academy
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### 4. Start the server
```bash
npm run dev
```

The server will run on http://localhost:8000

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Shuyukh
- GET /api/shuyukh - Get all shuyukh
- GET /api/shuyukh/:id - Get single sheikh
- POST /api/shuyukh - Create sheikh (Admin)
- PUT /api/shuyukh/:id - Update sheikh (Admin)
- DELETE /api/shuyukh/:id - Delete sheikh (Admin)

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get single course
- POST /api/courses - Create course (Admin)
- PUT /api/courses/:id - Update course (Admin)
- DELETE /api/courses/:id - Delete course (Admin)

### Lessons
- GET /api/lessons/course/:courseId - Get course lessons
- GET /api/lessons/:id - Get single lesson
- POST /api/lessons - Create lesson (Admin)
- PUT /api/lessons/:id - Update lesson (Admin)
- DELETE /api/lessons/:id - Delete lesson (Admin)

### Admin
- GET /api/admin/stats - Get dashboard statistics
- GET /api/admin/users - Get all users
- PUT /api/admin/users/:id/role - Update user role
- DELETE /api/admin/users/:id - Delete user

## Default Admin Account
After registering your first user, you need to manually change the role to 'admin' in MongoDB:

1. Open MongoDB Compass or use mongo shell
2. Find your user in the 'users' collection
3. Change the 'role' field from 'user' to 'admin'

Or use this command in mongo shell:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```


// ========================================
// 📁 frontend/README.md - Installation Guide
// ========================================

# Islamic Academy Frontend

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Install Additional Packages
```bash
npm install react-router-dom axios
```

### 3. Start the development server
```bash
npm start
```

The app will run on http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── HomePage.css
│   │   ├── ShuyukhPage.js
│   │   ├── SheikhProfile.js
│   │   ├── CoursesPage.js
│   │   ├── CoursesPage.css
│   │   ├── CourseDetails.js
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── Auth.css
│   │   └── admin/
│   │       ├── Dashboard.js
│   │       ├── AdminDashboard.css
│   │       ├── AdminHome.js
│   │       ├── ManageShuyukh.js
│   │       ├── ManageCourses.js
│   │       └── ManageUsers.js
│   ├── App.js
│   └── index.css
```

## Features Implemented

✅ User Authentication (Register/Login)
✅ Home Page with Featured Courses
✅ Shuyukh List and Profiles
✅ Courses List and Details
✅ Admin Dashboard
✅ Manage Shuyukh (CRUD)
✅ Manage Courses (CRUD)
✅ Manage Users
✅ Protected Routes

## Next Steps (Scale Later)

- [ ] Add Lessons viewer
- [ ] Add Progress tracking
- [ ] Add Certificates
- [ ] Add Live streaming
- [ ] Add Media library
- [ ] Add Blog
- [ ] Add Comments & Reviews
- [ ] Add Notifications
- [ ] Add Search & Filters
- [ ] Add User Dashboard

## Important Notes

1. Make sure backend is running on http://localhost:5000
2. Create at least one admin user to access admin panel
3. Use Arabic fonts: Tajawal or Cairo
4. All forms have validation
5. Mobile responsive design included