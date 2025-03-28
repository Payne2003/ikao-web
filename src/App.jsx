/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { routes } from './routes'
// import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  
  return (
    // <AuthProvider>
    <Router>
      <Routes>
        {routes.map((item, index) => {
          const Page = item.component
          const Layout = item.layout || React.Fragment // Nếu không có layout thì dùng Fragment

          return (
            <Route
              key={index}
              path={item.path}
              element={<Layout>{item.children ? <Outlet /> : <Page />}</Layout>}
            >
              {/* Route con (nếu có) */}
              {item.children &&
                item.children.map((child, childIndex) => {
                  const ChildPage = child.component
                  return <Route key={childIndex} path={child.path} element={<ChildPage />} />
                })}
            </Route>
          )
        })}
      </Routes>
    </Router>
    // </AuthProvider>
  )
}
export default App
// import InputComponent from '@/components/common/Input/InputComponent';

// const App = () => {
//   const validateEmail = (value) => {
//     if (!value) return 'Email is required';
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(value)) return 'Invalid email format';
//     return '';
//   };

//   const validatePhoneNumber = (value) => {
//     if (!value) return 'Phone number is required';
//     const phonePattern = /^\d{10}$/; // Kiểm tra số điện thoại 10 chữ số
//     if (!phonePattern.test(value)) return 'Invalid phone number';
//     return '';
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Input Component Demo</h1>
//       <InputComponent
//         type="email"
//         label="Email"
//         placeholder="Enter your email"
//         validate={validateEmail}
//         onChange={(value) => console.log('Email:', value)}
//       />
//       <InputComponent
//         type="text"
//         label="Username"
//         placeholder="Enter your username"
//         required
//         onChange={(value) => console.log('Username:', value)}
//       />
//       <InputComponent
//         type="text"
//         label="Phone Number"
//         placeholder="Enter your phone number"
//         validate={validatePhoneNumber}
//         onChange={(value) => console.log('Phone Number:', value)}
//       />
//       <InputComponent
//         type="password"
//         label="Password"
//         placeholder="Enter your password"
//         onChange={(value) => console.log('Password:', value)}
//       />
//       <InputComponent
//         type="textarea"
//         label="Description"
//         placeholder="Enter a description"
//         onChange={(value) => console.log('Description:', value)}
//       />
//       <InputComponent
//         type="search"
//         label="Search"
//         placeholder="Search..."
//         icon={<span role="img" aria-label="search">🔍</span>}
//         onChange={(value) => console.log('Search:', value)}
//       />
//     </div>
//   );
// };

// export default App;
