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
                path: '/player',
                name: 'Player',
                meta: {
                    keepAlive: true,
                    title: '播放器'
                },
                component: () => import('@views/Player/Player')
            },
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
                    keepAlive: true,
                    title: '歌单详情'
                },
                component: () => import('@views/Sonplay/Sonplay'),
                children: [
                    {
                        path: '/sonplay/player',
                        name: 'Player',
                        meta: {
                            keepAlive: true,
                            title: '播放器'
                        },
                        component: () => import('@views/Player/Player')
                    }
                ]
            },
        ]
    }
]

export default routes;