<template>
    <div class="PlaySlider">
        <div class="van-time">{{ activeValue }}</div>
        <div style="flex: 1;">
            <Slider
                v-model="value"
                :max="max"
                :min="min"
                active-color="#ee0a24"
                inactive-color="rgba(255,255,255,.5)"
                @drag-start="handelstart"
                @drag-end="handelend"
            >
                <div slot="button" class="van-custom"></div>
            </Slider>
        </div>
        <div class="van-time">04:32</div>
    </div>
</template>
 
<script>
import { Slider } from 'vant';
export default {
    name: 'PlaySlider',
    components: {
        Slider
    },
    computed: {
        activeValue() {
            const value = this.value
            if(value < 1) {
                return '00:00'
            }
            if (Math.floor(value/60) >= 10) {
                return Math.floor(value/60)+":"+(value%60/100).toFixed(2).slice(-2)
            } else {
                return '0' + Math.floor(value/60)+":"+(value%60/100).toFixed(2).slice(-2)
            }
        },
        // maxValue() {
        //     var val = parseInt(this.max.toString().slice(0,3))
        //     if (Math.floor(val/60) >= 10) {
        //         return Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
        //     } else {
        //         return '0' + Math.floor(val/60)+":"+(val%60/100).toFixed(2).slice(-2)
        //     }
        // }
    },
    data () {
        return {
            drag: false,
            value: 50,
            max: 240,
            min: 0
        }
    },
    methods: {
        //拖动开始
        handelstart() {
            this.drag = true
        },
        //拖动结束
        handelend() {
            this.drag = false
        }
    },
    // render() {
    //     return (
    //         <div class="PlaySlider">
    //             <div class="van-time">00:00</div>
    //             <div style={{flex: 1}}>
    //                 <Slider
    //                     value={this.value}
    //                     active-color="#ee0a24"
    //                     bar-height={this.drag ? '4px' : '2px'}
    //                     inactive-color="rgba(255,255,255,.5)"
    //                     onDrag-start={this.handelstart}
    //                     onDrag-end={this.handelend}
    //                     onChange={value => {this.value = value}}
    //                 >
    //                     <div slot="button" class="van-custom"></div>
    //                 </Slider>
    //             </div>
    //             <div class="van-time">04:32</div>
    //         </div>
    //     )
    // }
}
</script>

<style lang="less">
.PlaySlider {
    margin: 0 0 40px;
    display: flex;
    align-items: center;
    .van-time {
        font-size: 10px;
        color: #ffffff;
        margin: 0 10px;
    }
    .van-custom {
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 2px rgba(0,0,0,.5);
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