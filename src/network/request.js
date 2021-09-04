import axios from "axios";
import $store from "../store";
import {ifthen} from "./FN";
//Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2MTg5NjYzMDA1MjIsImV4cCI6MTYyNjE2NjMwMH0.kVkswRnol9Sjr_gtBfDIDeMJ79WU2sXj_ICDMKnY0sQwQmF_VmZWow7QJSxhaoRud5qluOxC9wE1xHimb_-1uw
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({

      baseURL: 'http://110.40.251.92:8080',


      timeout: 1000
  })




  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {

    // 1.比如config中的一些信息不符合服务器的要求
     // config["headers"]={'Authorization': $store.state.token}
      config["headers"]={'Authorization': $store.state.token}

     // header:{'Authorization': ()=>{return this.$store.state.token},
      console.log("请求体拦截");

      console.log(config);
    // 2.比如每次发送网络请求时, 都希望在界面中显示一个请求的图标
    //console.log(config);
    // 3.某些网络请求(比如登录(token)), 必须携带一些特殊的信息
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
      console.log("响应体拦截");
      console.log(res);

      return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
