// import React, { useEffect, useState } from "react";
// import Login from "../Login";
// import axios from "axios";
// import Dashboard from "./Dashboard";

// const ProtectedRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) return;
//         await axios.get(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIsAuthenticated(true);
//       } catch (error) {
//         localStorage.removeItem("authToken");
//         setIsAuthenticated(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (!isAuthenticated) {
//     return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
//   }

//   return <Dashboard />;
// };

// export default ProtectedRoute;
