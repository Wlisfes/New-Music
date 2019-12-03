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
                path: 'login',
                name: 'Login',
                meta: {
                    title: '登录',
                    keepAlive: false
                },
                component: () => import('@views/Login/Login')
            }
        ]
    }
]

export default routes;