import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book',
  component: () => (
    <ProtectedRoute>
      <BookingPage />
    </ProtectedRoute>
  ),
});

const bookingConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking-confirmation/$bookingId',
  component: BookingConfirmationPage,
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/bookings',
  component: () => (
    <ProtectedRoute>
      <AdminBookingsPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  bookingRoute,
  bookingConfirmationRoute,
  adminBookingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

