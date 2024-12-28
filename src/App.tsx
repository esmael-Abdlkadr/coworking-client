import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { toastOption, queryClient } from "./config/config";
import Layout from "./pages/Layout";
import Spinner from "./components/Spinner";
import AuthPage from "./pages/AuthPage";
import OTPPage from "./pages/otpVerification";

import BookingTable from "./components/dashbaord/BookingTable";
import NewBookingForm from "./components/dashbaord/NewBooking";
import ProtectedRoute from "./utils/ProtectedRoute";
// lazy load the components
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const SubscriptionPlans = lazy(() => import("./pages/Pricing"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const OurTeams = lazy(() => import("./pages/OurTeams"));
const Events = lazy(() => import("./pages/Events"));
const DashboardLayout = lazy(() => import("./pages/DahbaordLayout"));
const BookingDetail = lazy(
  () => import("./components/dashbaord/BookingDetail")
);
const NotFound = lazy(() => import("./404"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {/* auth routes */}
            <Route path="/verify-otp" element={<OTPPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/signin"
              element={<Navigate to={"/auth?mode=signin"} replace />}
            />
            <Route
              path="/signup"
              element={<Navigate to={"/auth?mode=signup"} replace />}
            />
            {/* dashbaord */}
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<BookingTable />} />
                <Route path="bookings" element={<BookingTable />} />
                <Route path="booking/new" element={<NewBookingForm />} />
                <Route path="booking/:id" element={<BookingDetail />} />
              </Route>
            </Route>

            {/* public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="blogs/:slug" element={<BlogDetail />} />
              <Route path="/pricing" element={<SubscriptionPlans />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/our-team" element={<OurTeams />} />
              <Route path="/events" element={<Events />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={toastOption}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
