import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Guests from "./pages/Guests";
import Booking from "./pages/Booking";
import CheckIn from "./pages/checkin";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Account from "./pages/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:id" element={<Booking />} />
              <Route path="checkin/:id" element={<CheckIn />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="guests" element={<Guests />} />
              <Route path="users" element={<Users />} />
              <Route path="accounts" element={<Account />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
