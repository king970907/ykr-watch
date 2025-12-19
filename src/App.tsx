import Header from "./components/common/Header";
import Content from "./components/common/Content";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import GuestRoute from "./components/GuestRoute";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { ThemeProvider } from "./context/theme.context";

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      {/* Content */}
      <Content />
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/index"
              element={
                <PrivateRoute>
                  <AppContent />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route path="*" element={<Navigate to="/index" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
