import {request} from "./request";

export function getcollegeFromApi() {
    return request({
        url: '/college/getCollegeList/100/1',
        method: 'get',

    })

}

export function addCollegeFromApi(cid, name) {
    return request({
        url: '/college/add',
        method: 'post',
        data: [
            {
                cid,
                name
            },
        ]


    })
}

export function deleteCollegeFromApi(item) {
    return request({
        url: '/college/delete/' + item.cid,
        method: 'delete',


    })
}

export function updateCollegeFromApi(cid, name) {
    return request({
        url: '/college/update',
        method: 'post',
        data: {
            cid,
            name
        }


    })
}
