import Vue from 'vue'
import MintUI from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)
const dev = true
const apiUrl = dev ? "https://api.sir66.com" : ""
axios.defaults.baseURL = apiUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
function myPost(url, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: data,
      transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }).then(function (response) {
      resolve(response)
    }).catch(function (err) {
      reject(err)
    })
  })
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
Vue.prototype.myPost = myPost
console.log(getQueryVariable('userCode'))
if(getQueryVariable('userCode')) {
  Vue.prototype.userCode = getQueryVariable('userCode')
} else {
  Vue.prototype.userCode = 'U1509287756714'
}


new Vue({
  el: '#app',
  render: h => h(App)
})
