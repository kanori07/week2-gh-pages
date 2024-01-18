// 產品資料格式

// products: [
//     {
//       category: "甜甜圈",
//       content: "尺寸：14x14cm",
//       description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
//       id: "-L9tH8jxVb2Ka_DYPwng",
//       is_enabled: 1,
//       origin_price: 150,
//       price: 99,
//       title: "草莓莓果夾心圈",
//       unit: "個",
//       num: 10,
//       imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//       imagesUrl: [
//         "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
//         "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//       ]
//     },
//     {
//       category: "蛋糕",
//       content: "尺寸：6寸",
//       description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
//       id: "-McJ-VvcwfN1_Ye_NtVA",
//       is_enabled: 16,
//       origin_price: 1000,
//       price: 900,
//       title: "蜂蜜檸檬蛋糕",
//       unit: "個",
//       num: 1,
//       imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
//       imagesUrl: [
//         "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
//       ]
//     },
//     {
//       category: "蛋糕",
//       content: "尺寸：6寸",
//       description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
//       id: "-McJ-VyqaFlLzUMmpPpm",
//       is_enabled: 1,
//       origin_price: 700,
//       price: 600,
//       title: "暗黑千層",
//       unit: "個",
//       num: 15,
//       imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//       imagesUrl: [
//         "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
//         "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
//       ]
//     }
//   ]

  import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.3/vue.esm-browser.prod.min.js'
  const productsAPI = `${url}/api/${path}/products/all`;
  const checkAPI = `${url}/api/user/check`;
  
  // 產品資料格式
  
  const app = createApp({
    data() {
      return {
        temp:{}, 
        products:[],
      }
    },
    methods:{
      getProducts(){
        // 取得產品列表
        axios.get(productsAPI)
        .then((res) => {
            this.products = res.data.products;
        })
      }
    },
    mounted(){
      
      //再加入cookie存取
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)ireneVueToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
      );
      axios.defaults.headers.common['Authorization'] = token;
      axios.post(checkAPI)
      // 驗證登入
        .then((res) => {
            console.log('驗證成功');
            this.getProducts();
        })
        .catch((err) => {
          // 驗證失敗 alert
          alert(err.data.message);
          // 跳至登入頁面
          location.href = 'login.html';
        })
    },
  })
  
  app.mount('#app')