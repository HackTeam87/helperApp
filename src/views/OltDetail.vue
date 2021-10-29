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


                <v-alert
                dark
                v-model="alert.value"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-twitter"
                transition="slide-x-transition"
                style="width: 60%;position: absolute;z-index: 999;text-align: center;"
                :color="alert.color"
        >
            {{alert.message}}
        </v-alert>

                <v-flex sm12 style="overflow: auto">
                    <v-card>

                        <v-container class="grey lighten-5">
                             <v-list-group :value="list_group" prepend-icon="mdi-sitemap">
                                     <template v-slot:activator >
                                      <v-list-item-title> <span>pon</span></v-list-item-title>
                                     </template>

                            <v-row no-gutters>

                                <v-col cols="12" sm="3" v-for="(c, index) in port_onu_count" :key="index">
                                    <v-card class="pa-2" outlined tile  >
                                        <v-icon center :color="getColor(c.pon_status)">mdi-sitemap mdi-24px </v-icon>
                                        <div class="text-caption">
                                           status online 
                                        </div>
                                        <v-slider
                                                v-model="c.onu_count"
                                                :label="c.port_id"
                                                :thumb-color="PortOnuCount(c.onu_count)"
                                                :max="c.port_holding"
                                                thumb-label="always"
                                                readonly
                                                track-fill-color="green"
                                               
                                        ></v-slider> 
                                    </v-card>
                                </v-col>
                            </v-row>
                             </v-list-group>

                              <v-list-group :value="list_group" prepend-icon="mdi-monitor">
                                     <template v-slot:activator >
                                      <v-list-item-title> <span>ethernet</span></v-list-item-title>
                                     </template>
                            <v-row no-gutters>

                                <v-col cols="12" sm="2" v-for="(eth, index) in eth_info" :key="index">
                                    <v-card class="pa-2" outlined tile>
                                            <v-icon :color="getColor(eth.eth_status)">mdi-ethernet mdi-24px</v-icon>
                                        {{eth.eth_name}}
                                    </v-card>
                                </v-col>

                            </v-row>
                            </v-list-group>



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
                                        label="port-id,mac-address,serial,signal,distance"
                                        single-line
                                        hide-details
                                ></v-text-field>

                                 
                                 <v-spacer></v-spacer>
                               <v-spacer>
                                     <v-chip class="ma-2"  color="blue-grey" label outlined >
                                          total onu: {{this.all_info.length}}
                                     </v-chip>
                                </v-spacer>
                                <v-spacer>
                                     <v-chip class="ma-2"  color="green" label outlined >
                                          online onu: {{this.Test}}
                                     </v-chip>
                                </v-spacer>
                                
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
                                            <v-btn class="ma-2" 
                                            :disabled="item.onu_status === '2'"
                                            @click="showOnuDetail(item.id)">
                                                <v-icon center :color="getColor(item.onu_status)"
                                                >mdi-router-wireless mdi-36px</v-icon>
                                                {{ item.port}}
                                                <v-icon center>mdi-share</v-icon>
                                            </v-btn>
    
                                        </td>
                                        <td class="text-left">
                                                 <span v-html="getSignal(item.onu_signal)"></span>
                                        </td>
                                        <td class="text-left"><span
                                                v-if="item.onu_lenght !== '0'">{{ item.onu_lenght}} m</span>
                                        </td>
                                        <td class="text-left">{{ item.onu_mac_serial}}</td>

                                        <td class="text-left">
                                            <div style='overflow-y: auto; max-height: 80px;'>
                                                <span v-for="(um, index) in item.user_mac" :key="index">{{ um }}<br></span>
                                            </div>  
                                          </td>

                                           
                                        <td class="text-left"><span>{{ item.onu_desc}}</span>
                                    </td>
                                        <td>
                                            <v-dialog
                                        transition="dialog-top-transition"
                                        max-width="600"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" v-bind="attrs" v-on="on">
                                            <v-icon>
                                                mdi-reload
                                            </v-icon>
                                            
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
                                        </td>
                                          
                                        <td>
    
    
                                            <v-dialog
                                            transition="dialog-top-transition"
                                            max-width="600"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn class="ma-2" color="error" v-bind="attrs" v-on="on" >
                                                <v-icon>mdi-delete-forever </v-icon>
                                            </v-btn>
                                        </template>
                                        <template v-slot:default="dialog">
                                            <v-card>
                                                <v-toolbar color="error" dark>
                                                    do you really want to delete onu   {{item.port}} {{item.onu_mac_serial}}?
                                                </v-toolbar>
                                                <v-card-actions class="justify-end">
                                                    <v-btn text
                                                           @click="DeleteOnu(item.id) , dialog.value = false"
                                                    >
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
                                    
    
                                        </td>
                                    
                                    </tr>
    
                                    </tbody>
    
                                </template>
    
    
                            </v-data-table>
                        </v-card>

               <v-container >

                            
                             <v-list-group :value="list_group" >
                                  <template v-slot:activator>
                                <v-list-item-title> <span>{{base_info[0]['desc']}}</span></v-list-item-title>
                                     </template>
                                
                                 <v-row no-gutters>
                                <v-col cols="12" sm="2" v-for="(a, index) in base_info" :key="index">
                                    <v-card class="pa-2" outlined tile>
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

                    <v-btn fab dark fixed bottom left color="green"
                           @click="BackToHome()">
                        <v-icon>mdi-arrow-collapse-left</v-icon>
                    </v-btn>

                    <v-btn v-scroll="onScroll" v-show="fab" fab
                           dark fixed bottom right color="green"
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
                    {text: 'up/down', width: "10%", show: true, value: ''},
                    {text: 'rx', width: "11%", show: true, value: ''},
                    {text: 'dist', width: "14%", show: true, value: ''},
                    {text: 'mac/serial', width: "10%", show: true, value: ''},
                    {text: 'user_mac', width: "10%", show: true, value: ''},
                    {text: 'desc', width: "25%", show: true, value: ''},
                    {text: 'reboot', width: "10%", show: true, value: ''},
                    {text: 'del', width: "10%", show: true, value: ''},
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
