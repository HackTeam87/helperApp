<template>
    <div>
 <v-container>
   <v-row  no-gutters v-for="(i, index) in base_info" :key="index">
                      <v-col cols12 sm12>
                     <v-list-group :value="true" prepend-icon="mdi-router-network">

                                 <template v-slot:activator>
                                <v-list-item-title> <span>{{i.indentity}}</span></v-list-item-title>
                                     </template>
      
                  
                        <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                            <v-row >
                                <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.name }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.location }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.uptime }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.cpu }}</span>
                                </v-chip>
                                <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.temperature }}</span>
                                </v-chip>
                                  <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.memory_total }}</span>
                                </v-chip>
                                  <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.memory_used }}</span>
                                </v-chip>
                               
                                  <v-chip class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ i.soft }}</span>
                                </v-chip>
                            </v-row>
                        </v-card>
                  
                      </v-list-group>
                        </v-col>
                </v-row>

                 <v-row  no-gutters >
                      <v-col cols12 sm12>

                          <v-list-group :value="true" prepend-icon="mdi-access-point-network">

                                 <template v-slot:activator>
                                <v-list-item-title> <span>Interface or Vlan</span></v-list-item-title>
                                     </template>
                   
                        <v-card class="pa-2" outlined tile hover data-aos="zoom-in" data-aos-easing="ease">
                            <v-row >
                                <v-chip v-for="v in detail_info" :key="v.id" class="ma-2" label color="teal darken-4" text-color="white">
                                    <span>{{ v.vlan }}</span>
                                </v-chip>
                            </v-row>
                        </v-card>
                    </v-list-group>
                    
                        </v-col>
                </v-row>
  </v-container>
    </div>
</template>

<script>
  export default {
    data() {
            return {
    search: '',
    deviceIp: '',
    base_info: [],
    detail_info: [],
    }
    },

     created() {
            this.deviceIp = this.getIpFromQuery()
            if (this.deviceIp !== "") {
                this.GetInfo();
                this.GetInfoDetail();
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
           
  }
</script>

