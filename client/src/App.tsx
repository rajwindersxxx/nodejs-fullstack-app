import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import JobListing from "./pages/JobListing";
import PostJob from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import { ModalProvider } from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import ApplicantsListPage from "./pages/ApplicantsListPage";
import Footer from "./components/ui/Footer";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <BrowserRouter >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ModalProvider>
              <Header />
              <div className="flex-1 p-4">
                <Routes>
                  <Route index path="/" element={<JobListing />} />
                  <Route
                    path="/post"
                    element={
                      <ProtectedRoute>
                        <PostJob />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/post/:id"
                    element={
                      <ProtectedRoute>
                        <ApplicantsListPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
              </div>
              <Footer />
            </ModalProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
