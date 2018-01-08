<template>
  <!--data.goodsImg data.goodsName data.price data.showPrice data.detail-->
  <detail-page :data="data" :click="buy">
  </detail-page>
</template>
<script>
  import DetailPage from "views/components/detailPage";
  import ComboApi from 'api/comboApi';
  import {mapState} from "vuex";
  export default {
    components: {
      DetailPage
    },
    data(){
      return {
        packageId: this.$route.query.packageId,
        type: "package",
        data:{}
      }
    },
    computed:{
      ...mapState('common/', ['userInfo'])
    },
    methods: {
      async fetchData(){
        let res = await  ComboApi.getPackageDetail(this.packageId, this.type);
        if (res && res.data) {
            let rd =res.data;
             this.data ={
               goodsImg:rd.imgs[0],
               goodsName:rd.name,
               price:rd.price,
               detail:rd.converKnows,
             }
        }
      },
      async buy(){
          this.$vux.loading.show();
          let res ;
          try{
            res = await  ComboApi.createOrder(`${this.packageId}:1`,this.userInfo.bindmobile);
          }catch (e){
              this.$util.showRequestErro(e)
          }
          if(res&&res.data){
              this.$router.push({name:'ConfirmPackageOrder',query:{
                  orderId:res.data.packageId,
                  packageId:this.packageId
              }})
          }
          this.$vux.loading.hide();
      }
    }
  }
</script>
<style lang="less">
</style>
