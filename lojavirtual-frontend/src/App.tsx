import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './assets/components/layout/Navbar';
import { Sidebar } from './assets/components/layout/Sidebar';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login'; 

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;