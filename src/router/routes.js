import Home from '@views/Home/Home';

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '首页'
        },
        component: Home,
        children: [
            {
                path: '/login',
                name: 'Login',
                meta: {
                    title: '登录',
                    keepAlive: false
                },
                component: () => import('@views/Login/Login')
            },
            {
                path: '/sonplay/:id',
                name: 'Sonplay',
                meta: {
                    keepAlive: true
                },
                component: () => import('@views/Sonplay/Sonplay')
            },
        ]
    }
]

export default routes;