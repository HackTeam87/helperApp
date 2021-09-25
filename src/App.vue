<template>
    <v-app>
        <v-main>
            <keep-alive>
                <router-view v-if="this.$route.name === 'home'"></router-view>
            </keep-alive>
            <router-view v-if="this.$route.name !== 'home'"></router-view>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data: () => ({}),
    }
</script>

<style>
    
    .v-progress-circular {
        margin: 1rem;
    }
</style>