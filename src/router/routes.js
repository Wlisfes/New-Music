import Home from '@views/home/Home';

const routes = [
    {
        path: "/",
        name: 'Home',
        meta: {},
        component: Home,
        children: [
            {
                path: "/search",
                name: 'Search',
                meta: {},
                component: () => import('@views/search/Search')
            },
            {
                path: "/playDetails",
                name: 'PlayDetails',
                meta: {},
                component: () => import('@views/playDetails/PlayDetails')
            }
        ]
    }
]


export default routes;