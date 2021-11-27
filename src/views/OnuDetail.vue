<template>
    <div>
 <v-main>
            <v-container>

                <div class="preloader" v-if="loading">
                    <div class="text-center">
                        <v-overlay v-if="loader">
                            <v-progress-circular
                                    :rotate="90"
                                    :size="120"
                                    :width="15"
                                    :value="value"
                                    color="white"
                            >
                                {{ value }}
                            </v-progress-circular>
                        </v-overlay>
                    </div>
                </div>



                <v-row  no-gutters v-for="(i, index) in onu_info" :key="index">
                      <v-col cols12 sm12>
                     <v-list-group :value="true" prepend-icon="mdi-monitor">

                                 <template v-slot:activator>
                                <v-list-item-title> <span>{{i.port}}</span></v-list-item-title>
                                     </template>
      
                  
                        <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                            <v-row align="center" justify="space-between" >
                                <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                                    <span>vendor: {{ i.vendor }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                                    <span>model: {{ i.model }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                                    <span>ver_soft: {{ i.ver_soft }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="blue-grey darken-4" text-color="white">
                                    <span>ver_hard: {{ i.ver_hard }}</span>
                                </v-chip>
                            </v-row>
                        </v-card>
                  
                      </v-list-group>
                        </v-col>
                </v-row>

                <v-flex sm12 style="overflow: auto">

                    <v-card>
                        <v-container hover data-aos="zoom-in" data-aos-easing="ease">

                            <v-row no-gutters>
                                <v-col cols="12" sm="12">
                                    <v-card class="pa-2" outlined tile>
                                        <v-container>
                                            <v-row>
                                               
                                                    <v-data-table
                                                            mobile-breakpoint="0"
                                                            :headers="headers1"
                                                            :items="onu_info"
                                                            :hide-default-footer="true">

                                                        <template v-slot:body="{ items }">

                                                            <tbody>
                                                            <tr v-for="(item,index) in items" :key="index">
                                                                <td class="text-left">
                                                                   

                                                                     <div class="text-caption" style='overflow-y: auto; max-height: 200px;'>
                                                                      <span v-for="(sts, index) in item.status_wan" :key="index">
                                                                         <v-icon :color="getColor(sts)">mdi-ethernet mdi-36px</v-icon>
                                                                         <h5 v-if="sts==='1'" >UP</h5>
                                                                         <h5 v-else-if="sts==='2'">DOWN</h5>      
                                                                      </span>
                                                                          
                                                                    </div>
                                                               
                                                                </td>
                                                           
                                                                 <td>
                                                                     <div class="text-caption" style='overflow-y: auto; max-height: 200px;'>
                                                                     <span v-for="(m, index) in item.mac_ip" :key="index">
                                                                          eth:({{ m.port }}) 
                                                                            {{ m.mac }}
                                                                           <a style="color:steelblue;">{{m.ip }}</a>
                                                                           <br> 
                                                                     </span>
                                                                     
                                                                     </div>
                                                                 </td>

                                                                 <td>
                                                                      <v-list dense>
                                                            <v-list-item-group color="primary">
                                                            <v-list-item v-for="(i, index) in onu_info" :key="index">
                                                                <v-list-item-content>
                                                                     <v-list-item-title>
                                                                         <v-icon center color="green">mdi-router-wireless mdi-36px</v-icon>
                                                                         <span>{{i.desc}}</span>
                                                                    </v-list-item-title>
                                                                    <v-list-item-title>
                                                                        <v-icon>mdi-signal</v-icon>
                                                                        rx: <span v-html="getSignal(i.signal_rx)"/>
                                                                    </v-list-item-title>
                                                                    <v-list-item-title>
                                                                        <v-icon>mdi-signal</v-icon>
                                                                        <span>tx: {{i.signal_tx}}</span>
                                                                    </v-list-item-title>
                                                                    <v-list-item-title>
                                                                        <v-icon>mdi-map-marker-distance</v-icon>
                                                                        <span>distace: {{i.distance}} m</span>
                                                                    </v-list-item-title>
                                                                    <v-list-item-title>
                                                                         <v-icon>mdi-lightning-bolt-outline</v-icon>
                                                                        volt: {{i.volt}}
                                                                    </v-list-item-title>
                                                                     <v-list-item-title>
                                                                         <v-icon>mdi-coolant-temperature</v-icon>
                                                                         temp: {{i.temp}}
                                                                    </v-list-item-title>
                                                                    <v-list-item-title>
                                                                        <v-icon>mdi-clipboard-edit-outline</v-icon>
                                                                        <span>{{i.log}}</span>
                                                                    </v-list-item-title>
                                                                </v-list-item-content>
                                                            </v-list-item>
                                                        </v-list-item-group>
                                                    </v-list>
                                                    </td>
                                                            </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-data-table>
                                               
                                            </v-row>
                                        </v-container>


                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>


                    <v-btn fab dark fixed bottom left color="rgb(50, 205, 50, 0.7)"
                           @click="BackToHome()">
                        <v-icon>mdi-arrow-collapse-left</v-icon>
                    </v-btn>

                    <v-btn v-scroll="onScroll" v-show="fab" fab
                           dark fixed bottom right color="rgb(50, 205, 50, 0.7)"
                           @click="toTop">
                        <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>

                </v-flex>


            </v-container>

        </v-main>
    </div>
</template>

<script>
   
    export default {
        data() {
            return {
                alert: {'value': false, 'color': '', 'message': ''},
                headers1: [
                    {text: 'Status-Eth', width: '18%'},
                    {text: 'Port/Mac-Address/Ip/Vid', width: '42%'},
                    {text: 'Info', width: '40%'},
                ],
                // headers2: [
                //     {text: 'Mac-Address info', width: '40%'},
                // ],
               
                loading: false,
                interval: {},
                value: 0,
                loader: true,
                error: '',
                fab: false,
                deviceIp: '',
                OnuId: '',
                onu_info: [],
            }
        },
        created() {
            this.deviceIp = this.getIpFromQuery()
            this.OnuId = this.getOnuIdFromQuery()
            if (this.deviceIp !== "") {
                this.GetInfo();
            }
        },
         methods: {
               async GetInfo() {
                this.loading = true
                if (this.deviceIp !== '') {

                    const response6 = await this.$api.auth.OnuInfo(this.deviceIp,this.OnuId).catch(() => {
                    this.error = 'ERROR'
                })
                this.onu_info = response6.data.data
                console.log(this.onu_info)
                
                }
                this.loading = false
                },

            

            getIpFromQuery() {
                console.log(this.$route);
                if (typeof this.$route.query.ip !== 'undefined') {
                    return this.$route.query.ip;
                }
                return "";
            },
            getOnuIdFromQuery() {
                if (typeof this.$route.query.onu !== 'undefined') {
                    return this.$route.query.onu;
                }
                return "";
            },
            setDeviceIp: function (ip) {
                console.log("New deviceIP setted: " + ip);
                this.deviceIp = ip;
            },
             getColor(status) {
                if (status === '1' || status === 1) return 'green'
                else return 'error'
            },
            PortOnuCount(count) {
                if (count < '45' || count < 45) return 'green'
                if (count >= '45' && count <= '55' || count >= 45 && count <= 55) return 'orange'
                if (count > '56' || count < 56) return 'error'
                else return 'gray'
            },
            getSignal(signal) {
                if (signal !== '' && signal <= '-24') {
                    return '<span style="color:darkgreen;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }
                if (signal !== '' && signal >= '-24' && signal <= '-25') {
                    return '<span style="color:orange;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }
                if (signal !== '' && signal > '-25') {
                    return '<span style="color:red;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }
                return '<span style="color:gray;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
            },
            onScroll(e) {
                if (typeof window === 'undefined') return
                const top = window.pageYOffset || e.target.scrollTop || 0
                this.fab = top > 20
            },
            toTop() {
                this.$vuetify.goTo(0)
            },
            BackToHome() {
                this.$router.push({name: 'home'})
            },
         },
         mounted() {
            this.interval = setInterval(() => {
                if (this.value === 100 && this.loading === false) {
                    return (this.loader = false)
                }
                this.value += 1
            }, 600)
        },
         watch: {
            search: function () {
                let route = this.$route.path;
                if (route === '/detail/') {
                    route = '/detail/';
                    this.GetInfo()
                }

                console.log(route)
            },
        },
    }
</script>

