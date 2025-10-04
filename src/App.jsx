import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import Home from './pages/Home'; 
import AuthorMaterial from "./pages/AuthorMaterial"; 
import MaterialDetails from "./pages/MaterialDetails";
import NewAuthor from './pages/NewAuthor'; // Equivalent to newPlace.ejs
import NewMaterial from './pages/NewMaterial';
import EditMaterial from './pages/EditListing'; // Equivalent to editDetails.ejs
import Login from './pages/Login'; // Equivalent to login.ejs
import Signup from './pages/Signup'; // Equivalent to signup.ejs
import VerifyEmail from './pages/VerifyEmail.jsx'; // Equivalent to verifyStatus.ejs
import ForgotPassword from './pages/ForgotPassword'; // Equivalent to forgotPass.ejs
import ResetPassword from './pages/ResetPassword'; // Equivalent to verifyPass.ejs
import Feedback from './pages/Feedback'; // Equivalent to feedback.ejs
import ConfirmDelete from './components/ConfirmDelete';
import ErrorPage from './components/ErrorPage'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { AuthProvider } from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute'; // For protecting routes
import DeleteAuthor from './components/DeleteAuthor';
import WelcomeOverlay from './pages/Welcome';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
        <Navbar /> 
        <main className="container"> 
          <Routes>
             <Route path="/" element={
          <>
            <Home />
            <WelcomeOverlay />
          </>
        }
      />
            <Route path="/classrooms" element={<Home/>} />
            <Route path="/classrooms/:id" element={<AuthorMaterial/>} />
            <Route path="/material/:id" element={<MaterialDetails/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/classrooms/new" element={<ProtectedRoute><NewAuthor /></ProtectedRoute>} />
            <Route path="/material/new/:id" element={<ProtectedRoute><NewMaterial/></ProtectedRoute>} />
            <Route path="/material/:id/edit" element={<ProtectedRoute><EditMaterial /></ProtectedRoute>} />
            <Route path="/material/:id/delete" element={<ProtectedRoute><ConfirmDelete /></ProtectedRoute>} />
            <Route path="/author/:id/delete" element={<ProtectedRoute><DeleteAuthor /></ProtectedRoute>} />
            <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
            <Route path="*" element={<ErrorPage message="Page Not Found" />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
   </ QueryClientProvider>
  );
}

export default App;