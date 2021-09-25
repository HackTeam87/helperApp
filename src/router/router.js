import Vue from 'vue';
import VueRouter from 'vue-router';
import OltDetail from '../views/OltDetail';
import OnuDetail from '../views/OnuDetail';
import MikrotikDetail from '../views/MikrotikDetail';


Vue.use(VueRouter);

const routes = [

    {
        name: 'home',
        path: '/',
        component: OltDetail,
        props: true,
    },
    {
        name: 'ont',
        path: '/detail/',
        component: OnuDetail,
        props: true
    },
    {
        name: 'mikrotik',
        path: '/mikrotik/detail/',
        component: MikrotikDetail,
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    // base: 'localhost:8080',
    base: '/',
    routes
});

export default router;