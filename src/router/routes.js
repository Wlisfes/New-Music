import Home from '@views/home/Home';

const routes = [
    {
        path: "/",
        name: 'Home',
        meta: {
            
        },
        component: Home,
        children: [
            {
                path: "/search",
                name: 'Search',
                meta: {
                    transitionName: 'search-open'
                },
                component: () => import('@views/search/Search')
            },
            {
                path: "/playDetails",
                name: 'PlayDetails',
                meta: {
                    transitionName: 'right-open'
                },
                props: (route) => ({ query: route.query }),
                component: () => import('@views/playDetails/PlayDetails')
            }
        ]
    }
]


export default routes;