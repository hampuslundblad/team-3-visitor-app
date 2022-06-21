import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Confirmation from './views/Confirmation.vue'
import Activity from './views/Activity.vue'
import RidePage from './views/RidePage.vue'
import RestaurantsPage from './views/RestaurantsPage.vue'
import GamesPage from './views/GamesPage.vue'
import TicketsPage from './views/TicketsPage'
import DealsPage from './views/DealsPage'
import Deal from './views/Deal.vue'
import ConfirmationDeal from './views/ConfirmationDeal'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                breadcrumb: 'Home'
            }
        },
        {
            path: '/confirmation/:id',
            name: 'confirmation',
            component: Confirmation
        },
        {
            path: '/confirmationDeal/:id',
            name: 'confirmationDeal',
            component: ConfirmationDeal
        },
        {
            path: '/activity/:id',
            name: 'activity',
            component: Activity
        },
        {
            path: '/rides',
            name: 'rides',
            component: RidePage,
            meta: {
                breadcrumb: {
                    label: 'Rides',
                    parent: 'home'
                }
            }
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: RestaurantsPage,
            meta: {
                breadcrumb: {
                    label: 'Restaurants',
                    parent: 'home'
                }
            }
        },
        {
            path: '/games',
            name: 'games',
            component: GamesPage,
            meta: {
                breadcrumb: {
                    label: 'Games',
                    parent: 'home'
                }
            }
        },
        {
            path: '/tickets',
            name: 'tickets',
            component: TicketsPage,
            meta: {
                breadcrumb: {
                    label: 'Tickets',
                    parent: 'home'
                }
            }
        },
        {
            path: '/deals',
            name: 'deals',
            component: DealsPage,
            meta: {
                breadcrumb: {
                    label: 'Deals',
                    parent: 'home'
                }
            }
        },
        {
            path: '/deals/:id',
            name: 'deal',
            component: Deal
        }
    ],
    props: true
})
