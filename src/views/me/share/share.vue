<template>
  <page :headerTitle="`邀请好友`">
    <div slot="contain">
        <div class='content'>
          <img :src="require('assets/images/me/bag.png')" class='bag-icon'>
          <p v-if="titleConfig">{{titleConfig}}</p>
          <p v-if="subtitleConfig" class='f20'>{{subtitleConfig}}</p>
          <p class='s-button khaki mt20' @click="showDialogStyle = true">立即邀请</p>
        </div>
      <div class='warn' v-if="ruleConfig">
        <div class='title'></div>
        <div class='body'>{{ruleConfig}}</div>
      </div>

      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: 'auto', 'background-color': 'transparent'}">
        <div class="dialog">
            <div class="bg body">
              <img class="code" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514203011952&di=f382d7d2131f6277edb1cb8ef7b58ee5&imgtype=0&src=http%3A%2F%2Fsrc.house.sina.com.cn%2Fimp%2Fimp%2Fdeal%2F86%2F68%2F4%2Fe51eac8a98c2bd65c6b68bae86c_p1_mk1_wm35.gif">
              <p>扫二维码向朋友分享</p>
              <div class="type">
                <div class="item" @click="ShareQQ"> <i class="wx"></i> <p>微信</p> </div>
                <div class="item" @click="friendArea"> <i class="friends"></i> <p>朋友圈</p> </div>
                <div class="item"> <i class="qq"></i> <p>QQ</p> </div>
                <div class="item"> <i class="sina"></i> <p>新浪</p> </div>
                <div class="item"> <i class="link"></i> <p>复制邀请链接</p> </div>
              </div>
            </div>
            <div class="bg foot">
              <x-button @click.native="showDialogStyle=false">取消</x-button>
            </div>
        </div>
      </x-dialog>
    </div>
  </page>
</template>
<script>
import { XDialog } from 'vux'
import theatreApi from "api/theatreApi";
export default {
  data(){
    return{
      showDialogStyle: false,
      titleConfig: '',
      subtitleConfig: '',
      ruleConfig: ''
    }
  },
  components:{XDialog},
  methods:{
    fetchData(){
      theatreApi.getMiscConfig('invite_reg_title').then(res=>{
          if (res.data && res.data.length > 0) {
            this.titleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      theatreApi.getMiscConfig('invite_reg_subtitle').then(res=>{
          if (res.data && res.data.length > 0) {
            this.subtitleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
      theatreApi.getMiscConfig('invite_reg_rule').then(res=>{
          if (res.data && res.data.length > 0) {
            this.ruleConfig = res.data[0].miscVal
          }
        },error => { console.log(error); })
    },
    ShareQQ(){
      alert('分享QQ')
      wx.onMenuShareQQ({
        title: '这是一个测试的标题', // 分享标题
        desc: '这个是分享奥朋友圈的描述信息', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功');
        },
        cancel: function () {
          alert('你没有分享');
        // 用户取消分享后执行的回调函数
        }
      });
    },
    friendArea(){
      alert('分享朋友圈')
      wx.onMenuShareAppMessage({
        title: '这是一个测试的标题',
        desc: '这个是分享奥朋友圈的描述信息',
        link: 'http://www.baidu.com',
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png',
        trigger: function (res) {
          // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
          // alert('用户点击发送给朋友');
        },
        success: function (res) {
            alert('分享成功');
        },
        cancel: function (res) {
          alert('你没有分享');
        },
        fail: function (res) {
          alert(JSON.stringify(res));
        }
      });
      // alert('已注册获取“发送给朋友”状态事件');
    }
  }
}
</script>


  
<style lang="less" scoped>
.content{margin: 75px 3px;display: flex;flex-direction: column;align-items: center; text-align: center;font-size: 16px;
  .s-button{padding: 4px 10px;}
}
.bag-icon{width: 64px;height: 100px;margin-bottom:10px;}

.warn .title{height: 46px;width: 100%;background-size: 100%100%; background-image: url('../../../assets/images/me/share_title_bg.png')}
.warn .body{margin: 15px;}

.dialog{margin: 0 20px;
  .body{margin-bottom: 10px;padding:20px 0;
    .code{width: 100px;height: 100px;}
    .type{display: flex;flex-wrap: wrap;padding: 20px 20px 0;    width: -webkit-fill-available;
      .item{width: 33%;text-align: center;margin-bottom: 10px;
        i{width:44px;height: 44px;display: inline-block;background-size: 100%100%; 
          &.wx{background-image: url('../../../assets/images/me/wx.png');}
          &.friends{background-image: url('../../../assets/images/me/friends.png');}
          &.qq{background-image: url('../../../assets/images/me/qq.png');}
          &.sina{background-image: url('../../../assets/images/me/sina.png');}
          &.link{background-image: url('../../../assets/images/me/link.png');}
        }
      }
    }
  }
  .bg{background: #ffffff;border-radius: 4px;}
}

</style>
