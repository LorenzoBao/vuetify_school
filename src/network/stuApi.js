import {request} from "./request";
import {retimeData} from "./FN";


export function addStuListFromApi(item,pid) {
    console.log(item);
    return request({
        url:'/students/add',
        method:'post',
        data:[
            {
            name:item.name,
            pid:pid,
            remarks:item.remarks,
            sid:item.sid,
            // image:item.image,
             }
        ]
    })
}
export function updateStuListFromApi(item,pid) {
    return request({
        url:'/students/update',
        method:'post',
        data:{
            newname:item.name,
            pid:pid,
            remarks:item.remarks,
            sid:item.sid,
        }
    })
}
export function deleteStuListFromApi(item) {
    return request({
        url:'/students/delete/',
        method:'delete',
        params:{
            sid:item.sid
        }
    })
}


export function getStuFromApi(val) {
    return request({
        url:'/students/getStudentList',
        method:'get',

        params:{
            pid:val
        }
    })
}


export function getStuTableFromApi(sid,start,end) {
    return request({
        url:'/absent/range/student/'+sid,
        method:'get',
        params:{
            startDate:start,
            endDate:end
        }
    })
}

export function deleteStuFromApi(items) {
    return request({
        url:'/absent/delete',
        method:'delete',

        params:{
            date:items.oldTime,
            sid:items.sid
        }
    })
}
export function addStuFromApi(val,time) {
    return request({
        url:'/absent/add',
        method:'post',
        data:[
            {
                course:val.course,
                sid:val.number,
                date:time,
                reason:val.LorT,
                remarks:val.describe
            }

        ]
    })
}
export function updateStuFromApi(items) {
    return request({
        url:'/absent/update',
        method:'post',
        data: {
            course: items.course,
            date: items.oldTime,
            reason: items.LorT,
            remarks: items.describe,
            sid: items.number
        }
    })
}
export function exportTableFromApi(val,start,end,id) {
    console.log(id);
    return request({
        url:'/execl/export/'+val,
        method:'get',
        responseType: "blob",
        params:{
            start,
            end,
            id
        }
    })
}