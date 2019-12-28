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
                    title: '歌单详情'
                },
                component: () => import('@views/Sonplay/Sonplay'),
                children: [
                    {
                        path: '/sonplay/:id/player',
                        name: 'Player',
                        meta: {
                            title: '播放器'
                        },
                        component: () => import('@views/Player/Player')
                    }
                ]
            },
            {
                path: '/singer/:id',
                name: 'Singer',
                meta: {
                    title: '歌手详情'
                },
                component: () => import('@views/Singer/Singer'),
                children: [
                    {
                        path: '/singer/:id/player',
                        name: 'Player',
                        meta: {
                            title: '播放器'
                        },
                        component: () => import('@views/Player/Player')
                    }
                ]
            },
            {
                path: '/ranking',
                name: 'Ranking',
                meta: {
                    title: '排行榜'
                },
                component: () => import('@views/Ranking/Ranking'),
                children: [
                    {
                        path: '/ranking/player',
                        name: 'Player',
                        meta: {
                            title: '播放器'
                        },
                        component: () => import('@views/Player/Player')
                    },
                    {
                        path: '/ranking/sonplay/:id',
                        name: 'Sonplay',
                        meta: {
                            title: '排行榜'
                        },
                        component: () => import('@views/Ranking/Sonplay'),
                        children: [
                            {
                                path: '/ranking/sonplay/:id/player',
                                name: 'Player',
                                meta: {
                                    title: '播放器'
                                },
                                component: () => import('@views/Player/Player')
                            }
                        ]
                    },
                ]
            }
        ]
    }
]

export default routes;