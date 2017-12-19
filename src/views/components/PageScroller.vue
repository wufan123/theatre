<template>
    <scroller lock-x scrollbar-y :bounce='true' :height='height' :usePullup='usePullup' :usePulldown='usePulldown' @on-pullup-loading='getMore' @on-pulldown-loading='refresh' :pullup-config='pullUpConfig' :pulldown-config='pullDownConfig' v-model='status' ref='scroller'>
        <div>
            <slot></slot>
            <div class="f14 color04 mt5" v-show='showNoMore' flex='dir:top cross:center'>{{noMoreText}}
                <div class="line5"></div>
            </div>
            <div class="no-record" v-show='showNoRecord&&noRecordText' flex='dir:top cross:center main:center'>
                <div class="img" v-if='noRecordImage'></div>
                <div class="f14 color04 mt10">{{noRecordText}}</div>
            </div>
        </div>
    </scroller>
</template>
<script>
import { Scroller } from 'vux'
export default {
    props: {
        api: Function,
        initQuery: {
            type: Boolean,
            default: false
        },
        height: String,
        pageSize: {
            type: Number,
            default: 10
        },
        usePullup: {
            type: Boolean,
            default: true
        },
        usePulldown: {
            type: Boolean,
            default: false
        },
        noMoreText: {
            type: String,
            default: '没有更多'
        },
        noRecordText: {
            type: String,
            default: '没有相关记录'
        },
        noRecordImage: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Scroller
    },
    data() {
        return {
            status: {
                pullupStatus: '',
                pulldownStatus: ''
            },
            showNoMore: false,
            showNoRecord: false,
            page: {
                number: 0,
                totalPages: 0,
                totalElements: -1,
                size: 10
            },
            pullUpConfig: {
                content: '上拉可以刷新',
                pullUpHeight: 60,
                height: 40,
                autoRefresh: false,
                downContent: '上拉可以刷新',
                upContent: '松开立即刷新',
                loadingContent: '加载中...',
                clsPrefix: 'xxs-plugin-pullup-'
            },
            pullDownConfig: {
                content: '下拉可以刷新',
                pullUpHeight: 60,
                height: 40,
                autoRefresh: false,
                downContent: '下拉可以刷新',
                upContent: '松开立即刷新',
                loadingContent: '加载中...',
                clsPrefix: 'xxs-plugin-pullup-'
            }
        }
    },
    watch: {
        page: {
            handler: function (val, oldVal) {
                this.showNoRecord = val.totalElements <= 0
                if (val.number >= val.totalPages - 1) {
                    this.usePullup && (this.status.pullupStatus = 'disabled')
                } else {
                    this.usePullup && (this.status.pullupStatus = 'default')
                }
                this.showNoMore = this.status.pullupStatus == 'disabled' && !this.showNoRecord
                this.usePulldown && (this.status.pulldownStatus = 'default')
                this.resize()
            },

            deep: true
        }
    },
    methods: {
        resize() {
            this.$refs.scroller && this.$nextTick(() => {
                this.$refs.scroller.reset()
            })
        },
        renderPage(page) {
            this.page = page
        },
        reset() {
            this.page.number = 0
            this.page.totalPages = 0
            this.page.totalElements = -1
            this.$refs.scroller && this.$refs.scroller._xscroll && this.$refs.scroller.reset({
                top: 0
            })
            return this.getDataByPage(this.page.number)
        },
        getMore() {
            this.getDataByPage(++this.page.number)
        },
        refresh() {

            return this.getDataByPage(0)
        },
        getDataByPage(page) {
            page = page != undefined ? page : this.page.number
            return this.api(page, this.page.size).then(res => {
                this.renderPage(res.page)
            })
        }
    },
    mounted() {
        this.resize()
    },
    created() {
        this.page.size = this.pageSize
        this.initQuery && this.getDataByPage(this.page.number)
    }
}
</script>
<style lang="less" >
@import '../../style/base-variables';
.xxs-plugin-pullup-container {
    color: @font-color;
    font-size: 14px;
    line-height: 40px;
}

.no-record {
    margin-top: 10px;
    width: 100%;
    height: 500px;
    .img {
        background-image: url('../../assets/images/member_icon.png');
        background-position: center bottom;
        background-size: 100% 100%;
        height: 76px;
        width: 86px;
        margin-bottom: 20px;
        background-repeat: no-repeat;
    }
}
</style>