import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './pages/root.tsx';
import Home from './pages/home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from './pages/auth.tsx';
import Admin from './pages/admin.tsx';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { NotFound } from './pages/notFound.tsx';
import ProfilePage from './pages/profile.tsx';
export const router = createBrowserRouter([
    {
        path: '/home',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },

            {
                path: 'admin',
                element: <Admin />,
            },
            {
                path : ":id",
                element : <ProfilePage/>
            }
        ],
    },

    {
        path: '/',
        element: <Auth />,
    },
    {
        path  : "*",
        element: <NotFound/>
    },
]);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 5 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
        </LocalizationProvider>
    </QueryClientProvider>,
);
