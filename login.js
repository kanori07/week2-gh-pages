import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.3/vue.esm-browser.prod.min.js';

const loginAPI = `${url}/admin/signin`;
const user = {
  "username": "",
  "password": ""
}

const app = createApp({
  data() {
    return {
      url,
      user,
      message:''
    }
  },
  methods:{
    login(){
      console.log('login');
      axios.post(loginAPI,user)
        // 成功
        .then((res) => {
          console.log('成功');
        
          // expired 效期
          // token 金鑰
          // uid 資料庫的代號
          const { token , expired } = res.data;
          //加cookie 存取暫存資料（？
          document.cookie = `ireneVueToken=${token}; expires=${new Date(expired)};`;
          location.href = 'products.html';
        })
        // 失敗
        .catch((err) => {
        
          // console.dir(err);
          // 失敗顯示的訊息
          alert(err.response.data.message);
        })
    },
},
  // mounted,
})

app.mount('#app')