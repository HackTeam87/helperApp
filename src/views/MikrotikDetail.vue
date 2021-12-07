<template>
    <div>
 <v-container>
      
   <v-row  no-gutters v-for="(i, index) in base_info" :key="index">
                      <v-col cols12 sm12>
                     <v-list-group :value="false" prepend-icon="mdi-router-network">

                                 <template v-slot:activator>
                                <v-list-item-title> <span>{{i.indentity}}</span></v-list-item-title>
                                     </template>
      
                  
                        <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                           
                            <v-row >
                                <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.name }}</span>
                                </v-chip>
                                <v-chip class="text-caption ma-2" label color="rgb(50, 205, 50, 0.7)" text-color="white">
                                    <span>{{ i.location }}</span>
                                </v-chip>
                                <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.uptime }}</span>
                                </v-chip>
                                <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.cpu }}</span>
                                </v-chip>
                                <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.temperature }}</span>
                                </v-chip>
                                  <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.memory_total }}</span>
                                </v-chip>
                                  <v-chip class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.memory_used }}</span>
                                </v-chip>
                               
                                  <v-chip class="text-caption ma-2" label color="rgb(50, 205, 50, 0.7)" text-color="white">
                                    <span>{{ i.soft }}</span>
                                </v-chip>
                            </v-row>
                        </v-card>
                  
                      </v-list-group>
                        </v-col>
                </v-row>

                 <v-row  no-gutters >
                      <v-col cols12 sm12>

                          <v-list-group :value="false" prepend-icon="mdi-access-point-network">

                                 <template v-slot:activator>
                                <v-list-item-title> <span>Interface or Vlan</span></v-list-item-title>
                                     </template>
                   
                        <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                            <v-row >
                                <v-chip v-for="v in detail_info" :key="v.id" class="text-caption ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ v.vlan }}</span>
                                </v-chip>
                            </v-row>
                        </v-card>
                    </v-list-group>
                    
                        </v-col>
                </v-row>



                
  </v-container>
  <v-container>
    <v-card >

                       <v-card-title class="text-caption">
                                <span class="colors-blue">D-Dynamic</span>
                                 <v-spacer></v-spacer>
                                <span class="colors-violet">R-Radius</span>
                                 <v-spacer></v-spacer>
                                <span class="colors-black">B-Blocked</span>
                                 <v-spacer></v-spacer>
                                <span class="colors-gray">X-Disabled</span>
                                 <v-spacer></v-spacer>
                                <span class="colors-black">S-Static</span>
                                <v-spacer></v-spacer>
                                <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="ip,mac-address,host,comment"
                                        single-line
                                        hide-details
                                ></v-text-field>
                            </v-card-title>
                           
                            <v-data-table
                                    primary
                                    mobile-breakpoint="0"
                                    :headers="headers"
                                    :items="filteredItems"
                                    item-key="id"
                                    sort-by="active-address"
                                    class="elevation-1"
                                    :footer-props="footerProps"
                            >
    
                                <template v-slot:body="{ items }">
    
                                    <tbody>
                                    <tr v-for="(item,index) in items" :key="index">

                                        <td class="text-caption text-left">
                                            <v-icon>mdi-information-variant</v-icon>

                                            <span v-if="item['dynamic'] === 'true'" class="colors-blue">D</span>
                                             <span v-else class="colors-black">S</span>
                                             <span v-if="item['radius'] === 'true'" class="colors-violet">R</span>
                                             <span v-if="item['blocked'] === 'true'" class="colors-black">B</span>
                                             <span v-if="item['disabled'] === 'true'" class="colors-gray">X</span>
                                             status: 
                                            <span v-if="item['status'] === 'bound'" class="colors-green"> {{ item['status'] }}</span>
                                            <span v-else class="colors-red"> {{ item['status'] }}</span>
                                        </td>
                                        <td class=" text-caption text-left">
                                            <v-icon>mdi-lan-connect</v-icon>
                                            host-name: {{ item['host-name'] }}
                                            <br>
                                            <v-icon>mdi-numeric</v-icon>
                                            address: 
                                            {{ item['address'] }}
                                             <br> 
                                            <v-icon>mdi-alphabetical</v-icon>
                                            mac-address: 
                                            {{ item['mac-address'] }}
                                            <br>
                                            <v-icon>mdi-server-network</v-icon>
                                            server: {{ item['server'] }}
                                            <br>
                                            <v-icon>mdi-content-paste</v-icon>
                                              comment: {{ item['comment'] }}
                                            <br>
                                        </td>

                                        <td class=" text-caption text-left">
                                             <v-icon>mdi-format-list-checks</v-icon>
                                            address-lists: {{ item['address-lists'] }}
                                             <br>
                                            <v-icon>mdi-numeric</v-icon>
                                            active-address: 
                                            {{ item['active-address'] }}
                                            <br> 
                                             <v-icon>mdi-alphabetical</v-icon>
                                            active-mac-address: 
                                            {{ item['active-mac-address'] }}
                                            <br>
                                            <v-icon>mdi-account-search</v-icon>
                                            last-seen: {{ item['last-seen'] }}
                                            <br>
                                            <v-icon>mdi-rotate-right</v-icon>
                                            expires-after: {{ item['expires-after'] }}
                                            <br>
                                            <v-icon>mdi-flag-outline</v-icon>
                                            dhcp-option: {{ item['dhcp-option'] }}
                                        </td>
                                   
                                       
                                    </tr>
                                </tbody>
                            </template>
    
    
                            </v-data-table>
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
         </v-container>
    </div>
</template>

<script>
  export default {
    data() {
            return {
    footerProps: {'items-per-page-options': [300, 500, -1]},
    search: '',
    fab: false,
    deviceIp: '',
    base_info: [],
    detail_info: [],
    api_info: [],
    headers: [      
                    {text: 'flags', width: "20%", show: true, value: ''},
                    {text: 'info', width: "40%", show: true, value: ''},
                    {text: 'other', width: "40%", show: true, value: ''},
                    
                    //  {text: 'active-address', width: "6%", show: true, value: ''},
                    // {text: 'active-client-id', width: "6%", show: true, value: ''},
                    // {text: 'active-mac-address', width: "6%", show: true, value: ''},
                    // {text: 'active-server', width: "6%", show: true, value: ''},
                    // {text: 'client-id', width: "6%", show: true, value: ''},
                                   
                    
    ]
    }
    },

     created() {
            this.deviceIp = this.getIpFromQuery()
            if (this.deviceIp !== "") {
                this.GetInfo();
                this.GetInfoDetail();
                this.GetInfoApi();
            }},
       methods: {
            async GetInfo() {
              
                const response1 = await this.$api.auth.MikrotikBase(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.base_info = response1.data.data
            },

             async GetInfoDetail() {
              
                const response2 = await this.$api.auth.MikrotikDetail(this.deviceIp).catch(() => {
                    this.error = 'ERROR'
                })
                this.detail_info = response2.data.data
            },

             async GetInfoApi() {
              
                const response3 = await this.$api.auth.MikrotikApi(this.deviceIp, '/ip/dhcp-server/lease/').catch(() => {
                    this.error = 'ERROR'
                })
                this.api_info = response3.data.data
                // console.log(this.api_info)
                // for (const [key, value] of Object.entries(this.api_info[0])) {
                //     console.log(`${key}`)
                //     this.headers.push({'text': `${key}`})
                //      console.log(this.headers);
                //     }
                
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
                window.open('https://switcher.golden.net.ua/mikrotik/', "_self");
            },

            setFlags: function (d) {
                if (d === '10000000') return '<span style="color: darkgreen">10-Full</span>';
                if (d === '100000000') return '<span style="color: darkgreen">100-Full</span>';
                if (d === '1000000000') return '<span style="color: darkgreen">1G-Full</span>';
                if (d === '4294967295') return '<span style="color: darkgreen">10G-Full</span>';
                if (d === '0') return '<span style="color: darkgray; font-weight: bold">Down</span>';

                return d;
            },
       },

        watch: {
            search: function () {
                let route = this.$route.path;
                console.log(route)
                if (route === '/mikrotik/detail/') {
                    route = '/mikrotik/detail/';
                    this.GetInfo()
                }

                console.log(route)
            },},

             computed: {
            filteredItems() {
                return this.api_info.filter((i) => {
                    return !this.search || (i['address'] + '||' + i['mac-address'] + '||' + i['host-name'] + '||' + i['comment'])
                        .toUpperCase().indexOf(this.search.toUpperCase()) !== -1
                })
            }}
           
  }
</script>

<style scoped>

    .no-dispays {
        display: none;
    }

    .colors-black {
        color: #2b2b2b;
    }

    .colors-red {
        color: red;
    }

    .colors-gray {
        color: gray;
    }

    .colors-blue {
        color: dodgerblue;


    }

    .colors-violet {
        color: blueviolet;


    }

    .colors-green {
        color: green;


    }
</style>


