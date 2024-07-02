import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/',

                element: <Navigate to='home'></Navigate>,
            },
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'user',
                Component: User,
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component: PageOne,
                    },
                ],
            },
        ],
    },
]

export default createBrowserRouter(routes)
