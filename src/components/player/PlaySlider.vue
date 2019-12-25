<template>
    <div class="PlaySlider">
        <Cutover :curre="currentTime"></Cutover>
        <div style="flex: 1;">
            <Slider
                v-model="value"
                :max="duraTion"
                :min="0"
                active-color="#ee0a24"
                inactive-color="rgba(255,255,255,.5)"
                @drag-start="handelstart"
                @drag-end="handelend"
                @change="handelchange"
            >
                <div slot="button" class="van-custom-container">
                    <div class="van-custom"></div>    
                </div> 
            </Slider>
        </div>
        <Cutover :curre="duraTion"></Cutover>
    </div>
</template>
 
<script>
import { mapState } from 'vuex';
import { Slider } from 'vant';

const Cutover = {
    name: 'Cutover',
    props: {
        curre: Number
    },
    methods: {
        cutover(curre) {
            if(curre < 1) {
                return '00:00'
            }
            if(Math.floor(curre / 60) >= 10) {
                return Math.floor(curre / 60) + ":" + (curre % 60 / 100).toFixed(2).slice(-2)
            }
            else {
                return '0' + Math.floor(curre / 60) + ":" + (curre % 60 / 100).toFixed(2).slice(-2)
            }
        }
    },
    render() {
        return <div class="van-time">{this.cutover(this.curre)}</div>
    }
}
export default {
    name: 'PlaySlider',
    components: { Slider,Cutover },
    computed: {
        ...mapState({
            audio: state => state.howler.audio,
            duraTion: state => state.howler.duraTion,
            currentTime: state => state.howler.currentTime,
            drag: state => state.howler.drag
        }),
    },
    data () {
        return {
            value: this.currentTime
        }
    },
    methods: {
        //拖动开始
        handelstart() {
            this.$store.commit('howler/setDrag', true)
        },
        //拖动结束
        handelend(e) {
            this.$store.commit('howler/setDrag', false)
        },
        //设置拖动的进度
        handelchange(e) {
            this.audio.currentTime = e
        }
    },
    watch: {
        currentTime: {
            handler(newVal) {
                if(!this.drag) {
                    this.value = newVal
                }
            }
        }
    }
}
</script>

<style lang="less">
.PlaySlider {
    margin: 0 0 40px;
    display: flex;
    align-items: center;
    z-index: 159;
    .van-time {
        width: 32px;
        text-align: center;
        font-size: 10px;
        color: #ffffff;
        margin: 0 10px;
    }
    .van-custom-container {
        padding: 10px;
        .van-custom {
            width: 10px;
            height: 10px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 1px 2px rgba(0,0,0,.5);
        }
    }
    .van-active {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 2px rgba(0,0,0,.5);
    }
}
</style>