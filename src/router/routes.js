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
            }
        ]
    }
]


export default routes;