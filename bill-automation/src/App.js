import logo from "./logo.svg";
import "./App.css";
import Main from "./bill/Main";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./config/AuthContext";

import Bill from "./bill/Bill";
import GeneralList from "./bill/GeneralList";
import Login from "./bill/Login";
import ProtectedRoute from "./ProtectedRoute";
import GeneralBill from "./bill/GeneralBill";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["biller"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<Main />} />
            <Route path="bill/:id" element={<Bill />} />
          </Route>

          <Route path="/general/:sheetid/:mid" element={<GeneralList />} />
          <Route path="/g-bill/:sheetId/:id" element={<GeneralBill />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
