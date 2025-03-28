// import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// eslint-disable-next-line react/prop-types
// const AdminRoute = ({ children }) => {
//   const token = localStorage.getItem("accessToken");

// //   if (!token) return <Navigate to="/login" />;

//   try {
//     const user = jwtDecode(token);
//     return user.role === "admin" ? children : <Navigate to="/" />;
//   // eslint-disable-next-line no-unused-vars
//   } catch (error) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" />;
//   }
// };

// export default AdminRoute;
