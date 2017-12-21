import axios from 'axios'
import Vue from 'vue'
let BASE_URL = _BASE_URL ? _BASE_URL : '';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      'content-type':'application/json;charset=UTF-8',
      'accept':'application/json; version=1'
    }
  })

  instance.interceptors.request.use(config => {
    return config;
});

instance.interceptors.response.use(response=>{
     let data = response.data
    if(data.ret){
      return data.result
    }else{
      return Promise.reject(data);
    }
  },error=>{
    _vue.$message.error(`网络异常:${error.response.status}`);
  });

export default instance