import {request} from "./request";
import Vue from "vue";


export function removeZero(data) {
    if (data.charAt(0) === "0") {
        return data.charAt(1);
    } else {
        return data;
    }
}

export function timeData(d) {
    let formate_datetime;
    let array = d.split("T");
    let date = array[0];
    let time = array[1];
    let array_date = date.split("-");
    let array_time = time.split(":");
    let second = array_time[2].split(".")[0];
    formate_datetime = array_date[0] + "年" + removeZero(array_date[1]) + "月" + removeZero(array_date[2]) + "日 "
        + removeZero(array_time[0]) + "时" + removeZero(array_time[1]) + "分" + second + "秒";
    return formate_datetime;
}

function reremoveZero(data) {
    if (data.length === 1) {
        return data = '0' + data
    }
    return data
}

export function retimeData(d) {
    let formate_datetime;
    let array = d.split(" ");
    let date = array[0];
    let time = array[1];
    let array_date = date.split("/");
    let array_time = time.split(":");


    formate_datetime = array_date[0] + "-" + reremoveZero(array_date[1]) + "-" + reremoveZero(array_date[2]) + "T"
        + reremoveZero(array_time[0]) + ":" + reremoveZero(array_time[1]);
    return formate_datetime;

}

export function ifthen(res) {
    if (res.code < 300 && res.code >= 200) {
        return 1
    } else {
        return 0
    }
}

