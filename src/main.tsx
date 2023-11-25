import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './pages/root.tsx';
import Home from './pages/home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from './pages/auth.tsx';
import Admin from './pages/admin.tsx';
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
        ],
    },

    {
        path: '/',
        element: <Auth />,
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
        <RouterProvider router={router} />
    </QueryClientProvider>,
);
