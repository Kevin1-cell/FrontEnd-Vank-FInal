import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import toast, { Toaster } from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import './index.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClienteHome from "./pages/ClienteHome";
import ProveedorHome from "./pages/ProveedorHome";
import VendedorHome from "./pages/VendedorHome";

function App() {
  return (
    <>\
    <Toaster/>
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirigir '/' a '/login' */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas según rol */}
          <Route element={<ProtectedRoute allowedRoles={["cliente"]} />}>
            <Route path="/cliente/home" element={<ClienteHome />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["proveedor"]} />}>
            <Route path="/proveedor/home" element={<ProveedorHome />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["vendedor"]} />}>
            <Route path="/vendedor/home" element={<VendedorHome />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );
  
}

export default App;
