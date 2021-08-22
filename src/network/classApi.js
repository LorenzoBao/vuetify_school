import {request} from "./request";

export function updateClassListFromApi(item,cid) {
    return request({
        url:'/class/update',
        method:'post',
        data:{
            name:item.name,
            cid:cid,
            pid:item.pid
        }
    })
}
export function addClassListFromApi(item,cid) {
    return request({
        url:'/class/add',
        method:'post',
        data:
            {
                name:item.name,
                cid:cid,
                pid:item.pid
            }

    })
}
export function deleteClassListFromApi(item) {
    return request({
        url:'/class/delete/'+item.pid,
        method:'delete',


    })
}
export function getClassTableFromApi(pid,start,end) {
    return request({
        url:'/absent/range/class/'+pid,
        method:'get',
        params:{
            startDate:start,
            endDate:end
        }

    })
}

export function getClassFromApi(val) {
    return  request({

        url:'/class/getClassList',
        method:'get',
        params:{
            cid:val
        }

    })
}