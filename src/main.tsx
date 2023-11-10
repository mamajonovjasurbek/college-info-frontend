import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './pages/root.tsx';
import Home, {loader as homeLoader} from './pages/home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Auth } from './pages/auth.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
                loader : homeLoader
            },
        ],
    },

    {
        path: '/login',
        element: <Auth />,
    },
]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>,
);
