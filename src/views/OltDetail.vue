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

 <div class="text-center">
                        <v-overlay  v-if="alert.value">
                <v-alert
                dark
                v-model="alert.value"
                border="left"
                elevation="3"
                colored-border
                icon="mdi-twitter"
                transition="slide-x-transition"
                style="text-align: center;"
                :color="alert.color"
        >
            {{alert.message}}
        </v-alert>
          </v-overlay>
                    </div>

                <v-flex sm12 style="overflow: auto">
                    <v-card>

                        <v-container class="grey lighten-5">
                             <v-list-group :value="list_group" prepend-icon="mdi-sitemap">
                                
                                     <template v-slot:activator >
                                      <v-list-item-title > 
                                           <div class="text-caption">
                                                <span class="white"> pon online status</span>
                                           </div>
                                          </v-list-item-title>
                                      </template>

                            <v-row no-gutters>

                                <v-col cols="12" sm="3" v-for="(c, index) in port_onu_count" :key="index">
                                    <v-card class="v-card__title font-weight-medium headline" hover data-aos="zoom-in" data-aos-easing="ease">
                                        <v-icon center :color="getColor(c.pon_status)">mdi-sitemap mdi-24px </v-icon> 
                                        <v-slider
                                                
                                                v-model="c.onu_count"
                                                :label="c.port_id"
                                                :thumb-color="PortOnuCount(c.onu_count)"
                                                :max="c.port_holding"
                                                thumb-label="always"
                                                readonly
                                                track-fill-color="green"
                                        >
                                        </v-slider> 

                                         <span class="text-caption"  v-if="c.port_tx_power">
                                            <v-icon :color="getColor(c.pon_status)">mdi-signal</v-icon>
                                            tx: {{c.port_tx_power}} 
                                             <v-icon :color="getColor(c.pon_status)">mdi-lightning-bolt-outline</v-icon>
                                            {{c.port_volt}}
                                         </span>

                                       
                                    </v-card>
                                </v-col>
                            </v-row>
                             </v-list-group>

                              <v-list-group :value="list_group" prepend-icon="mdi-monitor">
                                     <template v-slot:activator >
                                      <v-list-item-title> 
                                          <div class="text-caption">
                                                <span class="white"> ethernet online status</span>
                                           </div>
                                      </v-list-item-title>
                                     </template>
                            <v-row no-gutters>

                               <v-card class="v-card__title text-caption">
                                    <span class="text-caption headline"  outlined tile v-for="(eth, index) in eth_info" :key="index">
                                            <v-icon :color="getColor(eth.eth_status)">mdi-ethernet mdi-24px</v-icon>
                                        <span>{{eth.eth_name}}</span>
                                    </span>
                               </v-card>

                            </v-row>
                            </v-list-group>
                              
                                        
                                        <v-spacer v-if="tree">
                                           <v-chip class="text-caption"  color="blue-grey" label outlined >
                                             <span v-if="this.all_info">total onu: {{this.all_info.length}}</span>
                                             <span v-else></span>
                                           </v-chip>

                                           <v-chip class="text-caption"  color="green" label outlined >
                                             <span v-if="this.Test">online onu: {{this.Test}}</span>
                                             <span v-else></span>
                                           </v-chip>

                                            <v-chip class="text-caption"  color="blue-grey" label outlined >
                                             <span v-if="this.eth_info">total eth: {{this.eth_info.length}}</span>
                                             <span v-else></span>
                                           </v-chip>
                                        </v-spacer>
                                       

                             <v-container >
                            <v-row align="center" justify="space-around">

                                <v-btn block dark class="ma-2"  color="green" @click="GetTree()" v-if="!tree">
                                    tree update
                                     <v-icon center>mdi-share</v-icon>
                                </v-btn>
    
                            </v-row>
                             </v-container>

                        </v-container>


                        <v-card v-if="tree">
                            
                            <v-card-title>
                                 <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="port,mac-address,serial,signal,distance"
                                        single-line
                                        hide-details
                                ></v-text-field>

                                 <v-spacer></v-spacer>
                                
                                 <v-spacer>
                                      <v-btn block dark  color="green" @click="GetTree()" >
                                    tree update
                                     <v-icon center>mdi-share</v-icon>
                                </v-btn>
                                </v-spacer>
                               

                               
                            </v-card-title>
                            <v-data-table
                                    primary
                                    mobile-breakpoint="0"
                                    :headers="headers"
                                    :items="filteredItems"
                                    item-key="id"
                                    sort-by="up/down"
                                    :footer-props="footerProps"
                                    class="elevation-1"
                            >
    
                                <template v-slot:body="{ items }">
    
                                    <tbody>
                                    <tr v-for="(item,index) in items" :key="index">
                                        <td class="text-left">

                                        <v-dialog
                                        transition="dialog-top-transition"
                                        max-width="600">

                                    <template v-slot:activator="{ on, attrs }" >
                                        <v-btn class="text-caption" dark color="blue darken-1" v-bind="attrs" v-on="on" :disabled="item.onu_status === '2'">
                                          
                                            <v-icon>
                                                mdi-reload
                                            </v-icon>
                                             {{ item.port}}
                                        </v-btn>
                                    </template>
                                    <template v-slot:default="dialog">
                                        <v-card>
                                            <v-toolbar color="primary" dark>
                                                do you really want to reboot onu {{item.port}} {{item.onu_mac_serial}}?
                                            </v-toolbar>
                                            <v-card-actions class="justify-end">
                                                <v-btn text
                                                       @click="RebootOnu(item.id) , dialog.value = false"
                                                >
                                                    Reboot
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        text
                                                        @click="dialog.value = false"
                                                >Close
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                                           
                                            <v-dialog
                                        transition="dialog-top-transition"
                                        max-width="600"
                                >
                                    <template v-slot:activator="{ on, attrs }" >
                                        <v-btn class="text-caption" dark color="error" v-bind="attrs" v-on="on" >
                                            
                                           <v-icon>mdi-delete-forever</v-icon> 
                                           {{ item.port}}
                                        </v-btn>
                                    </template>
                                    <template v-slot:default="dialog">
                                        <v-card>
                                            <v-toolbar color="error" dark>
                                                do you really want to delete onu   {{item.port}} {{item.onu_mac_serial}}?
                                            </v-toolbar>
                                            <v-card-actions class="justify-end">
                                                <v-btn text @click="DeleteOnu(item.id) , dialog.value = false">
                                                     Delete
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                        text
                                                        @click="dialog.value = false"
                                                >Close
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>

                                            <v-btn class="text-caption" 
                                            :disabled="item.onu_status === '2'"
                                            @click="showOnuDetail(item.id)">
                                                
                                                <v-icon center>mdi-share</v-icon>
                                                {{ item.port}}
                                            </v-btn>
    
                                        </td>

                                        <td class="text-left text-caption">

                                                 <v-icon center :color="getColor(item.onu_status)"
                                                >mdi-router-wireless mdi-36px
                                                </v-icon>
                                                 <span>{{ item.onu_desc}}</span>
                                                 <br>
                                                 <v-icon>mdi-map-marker-distance</v-icon>
                                                 dist: <span v-if="item.onu_lenght !== '0'">{{ item.onu_lenght}} m</span>
                                                 <br>
                                                 <v-icon>mdi-signal</v-icon>
                                                 rx: <span v-html="getSignal(item.onu_signal)"></span>
                                                 <br>
                                                 <v-icon>mdi-alphabetical</v-icon>
                                                 mac/serial: <span> {{ item.onu_mac_serial}} </span>

                                             <v-spacer v-if="item.user_mac">
                                                <v-icon>mdi-cast</v-icon>
                                                user_mac:
                                             </v-spacer>
                                           <div style='overflow-y: auto; max-height: 80px;'> 
                                                  <span v-for="(um, index) in item.user_mac" :key="index">{{ um }}<br></span>
                                            </div> 
                                        </td>
                                  
                                    </tr>
    
                                    </tbody>
    
                                </template>
    
    
                            </v-data-table>
                        </v-card>

               <v-container >

                            
                             <v-list-group value="some_value" >
                                  <template v-slot:activator>
                                <v-list-item-title> 
                                    <div class="text-caption" >
                                        <span  v-for="(d, index) in base_info" :key="index" >{{d.desc}}</span>          
                                    </div>
                                   </v-list-item-title>
                                   </template>
                                
                                 <v-row no-gutters>
                                <v-col center cols="12" sm="2" v-for="(a, index) in base_info" :key="index">
                                    <v-card class="v-card__title text-caption" hover data-aos="zoom-in" data-aos-easing="ease">
                                        <h5>{{a.desc}}</h5>
                                        <h5>{{a.uptime}}</h5>
                                        <h5>{{a.cpu}}</h5>
                                        <h5>{{a.temp}}</h5>
                                        <h5>{{a.total_mem}}</h5>
                                        <h5>{{a.free_mem}}</h5>
                                    </v-card>
                                </v-col>
                                 </v-row>
                               </v-list-group>
                           
                            
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
let sound = new Audio(require('@/assets/mp3/twitter_whistle.mp3'))
    export default {
         data() {
            return {
                
                alert: {'value': false, 'color': '', 'message': ''},
                list_group: true,
                some_value: true,
                loading: false,
                interval: {},
                value: 0,
                loader: true,
                error: '',
                fab: false,
                search: '',
                deviceIp: '',
                tree: false,
                Test: '',
                footerProps: {'items-per-page-options': [150, 250, -1]},
                headers: [
                    {text: 'control/up/down', width: "50%", show: true, value: ''},
                    {text: 'info', width: "50%", show: true, value: ''},  
                ],
                ex3: {label: 'thumb-color', val: 50, color: 'red'},
                base_info: [],
                eth_info: [],
                port_onu_count: [],
                all_info: [],
               
            }
        
    },
     created() {
            this.deviceIp = this.getIpFromQuery()
            if (this.deviceIp !== "") {
                this.GetInfo();
            }},
     methods: {
         async GetInfo() {
              this.loading = true
                const response1 = await this.$api.auth.OltBase(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.base_info = response1.data.data

                const response2 = await this.$api.auth.OltEthName(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.eth_info = response2.data.data   
               

                const response3 = await this.$api.auth.OltOnuCount(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.port_onu_count = response3.data.data
                
                let test = parseInt(0);
                for (let i = 0; i < this.port_onu_count.length; i++) {
                  test = test + parseInt(this.port_onu_count[i].onu_count)
                  }
                  
                 this.Test = test
                 this.loading = false
            },

         async GetTree(){
            this.tree = true
            this.loading = true
              const response4 = await this.$api.auth.OltAll(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.all_info = response4.data.data
                this.list_group = false
                this.loading = false   
         },
         async DeleteOnu(OnuId) {
             const response5 = await this.$api.auth.OnuDelete(this.deviceIp, OnuId).catch(() => {
                    this.error = 'ERROR'
                })
                
              if (response5.status === 200) {
                        sound.play()
                        this.alert['value'] = true
                        this.alert['color'] = 'red'
                        this.alert['message'] = 'onu successfully deleted'
                        window.setInterval(() => {
                            this.alert['value'] = false;
                            console.log("hide alert after 5 seconds");
                        }, 5000)
                    }
         },
           async RebootOnu(OnuId) {
             const response8 = await this.$api.auth.OnuReboot(this.deviceIp, OnuId).catch(() => {
                    this.error = 'ERROR'
                })
                
              if (response8.status === 200) {
                        sound.play()
                        this.alert['value'] = true
                        this.alert['color'] = 'cyan'
                        this.alert['message'] = 'onu successfully rebooted'
                        window.setInterval(() => {
                            this.alert['value'] = false;
                            console.log("hide alert after 5 seconds");
                        }, 5000)
                    }
         },    
         showOnuDetail(OnuId) {
            
                this.$router.push({name: 'ont', query: {ip: this.deviceIp, onu: OnuId,}})
            },
            
            getColor(status) {
                if (status === '1' || status === 1) return 'green'
                else return 'error'
            },
            PortOnuCount(count) {
                if (count < '45' || count < 45) return 'green'
                if (count >= '45' && count <= '55' || count >= 45 && count <= 55) return 'orange'
                if (count >= '56' || count >= 56) return 'error'
                else return 'gray'
            },
            getSignal(signal) {
                if (signal !== '' && signal !== isNaN && signal <= '-24') {
                    return '<span style="color:darkgreen;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }

                if (signal !== '' && signal !== isNaN && signal >= '-24' && signal <= '-25') {
                    return '<span style="color:orange;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }
                if (signal !== '' && signal !== isNaN && signal > '-25') {
                    return '<span style="color:red;">' + parseInt(signal) / 10 + ' dbm' + '</span>'
                }
                return ''
            },
            getIpFromQuery() {
                console.log(this.$route);
                if (typeof this.$route.query.ip !== 'undefined') {
                    console.log(this.$route.query.ip)
                    return this.$route.query.ip;
                }
                return "";
            },
            setDeviceIp: function (ip) {
                console.log("New deviceIP setted: " + ip);
                this.deviceIp = ip;
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
                window.open('https://switcher.golden.net.ua/', "_self");
            },
                },
                 mounted() {
            this.interval = setInterval(() => {
                if (this.value === 100 && this.loading === false) {
                    return (this.loader = false && this.value === 0)
                }
                this.value += 1
            }, 600)
        },
        watch: {
            search: function () {
                let route = this.$route.path;
                console.log(route)
                if (route === '/') {
                    route = '/';
                    this.GetInfo()
                }

                console.log(route)
            },},
            computed: {
            filteredItems() {
                return this.all_info.filter((i) => {
                    return !this.search || (i.port + '||' + i.onu_mac_serial + '||' + i.user_mac + '||' + 
                           i.onu_signal + '||' + i.onu_lenght + '||' + i.onu_desc)
                        .toUpperCase().indexOf(this.search.toUpperCase()) !== -1
                })
            }}
    }
</script>
