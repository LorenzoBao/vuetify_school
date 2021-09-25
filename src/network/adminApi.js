import {request} from "./request";

export function deleteAdminListFromApi(item) {
    return request({
        url: '/admin/delete/' + item.username,
        method: 'delete',


    })
}

export function addAdminListFromApi(item) {
    return request({
        url: '/admin/add',
        method: 'post',
        data:
            {
                username: item.username,
                password: item.password,
                pid: item.pid,
                remark: item.remark,
                type: item.type,
                enable: item.enable,
            }

    })
}

export function updateAdminListFromApi(item) {
    return request({
        url: '/admin/update',
        method: 'post',
        data: {
            enable: item.enable,
            pid: item.pid,
            remark: item.remark,
            type: item.type,
            username: item.username,
        }
    })
}

export function getAdminFromApi() {
    return request({
        url: '/admin/getUserList',
        method: 'get',
    })
}

export function updateAdminPasswordFromApi(username, oldPaw, newPaw) {
    return request({
        url: '/admin/revise',
        method: 'post',
        data: {
            username: username,
            oldPassword: oldPaw,
            newPassword: newPaw

        }
    })
}

// export function updateAdminInfoFromApi(items) {
//     console.log(items);
//     return request({
//         url:'/admin/update',
//         method:'post',
//         data:{
//             enable:1,
//             pid:items.pid,
//             remark:items.remark,
//             type:items.type,
//             username:items.username,
//
//
//         }
//     })
// }
export function addImage(image, username) {
    return request({

        url: '/source/img/upload',
        method: 'post',
        data: {
            file: image,
            username: username

        }
    })
}

export function getImage(username) {
    return request({

        url: '/source/img/' + username,
        method: 'get',

    })
}

export function getAdminInfo() {
    return request({

        url: '/admin/info',
        method: 'get',

    })
}

export function reAdminPaw(username) {
    return request({

        url: '/admin/reset/' + username,
        method: 'post',

    })
}



