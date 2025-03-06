import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import Dashboard from "../app/pages/Admin/dashboard";
import AddWallpaper from "../app/pages/Admin/addWallpaper";
import Login from "../Login";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addwallpaper"
          element={
            <PrivateRoute>
              <AddWallpaper />
            </PrivateRoute>
          }
        />
      </Router>
    </BrowserRouter>
  );
}

export default Routes;
