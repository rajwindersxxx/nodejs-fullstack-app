import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import JobListing from "./pages/JobListing";
import PostJob from "./pages/PostJob";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import { ModalProvider } from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./components/ProtectedRoute";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="flex h-screen flex-col">
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <BrowserRouter>
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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ModalProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
