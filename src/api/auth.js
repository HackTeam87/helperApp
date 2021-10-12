export default function (instance) {
    return {
        MikrotikBase(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/mikrotik/api/mikrotik/base?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/mikrotik/api/mikrotik/base?ip=' + link)
            }
        },
        MikrotikDetail(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/mikrotik/api/mikrotik/detail?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/mikrotik/api/mikrotik/detail?ip=' + link)
            }
        },
        MikrotikApi(ip, command) {
            if (ip != undefined) {
                return instance.get('/mikrotik/api/mikrotik/api?ip=' + ip + '&command=' + command)
            } else {
                return instance.get('/mikrotik/api/mikrotik/api?ip=' + ip)
            }
        },
        OltBase(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/api/olt/base?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/api/olt/base?ip=' + link)
            }
        },
        OltEthName(link, Interface) {
            if (Interface != undefined) {
                return instance.get('/api/olt/eth/name?ip=' + link + '&interface=' + Interface)
            } else {
                return instance.get('/api/olt/eth/name?ip=' + link)
            }

        },
        OltOnuCount(link) {
            return instance.get('/api/olt/onu/count?ip=' + link)
        },
        OltAll(link) {
            return instance.get('/api/olt/all?ip=' + link)
        },
        OnuInfo(link, OnuId) {
            return instance.get('/api/onu/info?ip=' + link + '&OnuId=' + OnuId)
        },
        OnuReboot(link, OnuId) {
            return instance.get('/api/onu/reboot?ip=' + link + '&OnuId=' + OnuId)
        },
        OnuDelete(link, OnuId) {
            return instance.get('/api/onu/delete?ip=' + link + '&OnuId=' + OnuId)
        },
    }
}