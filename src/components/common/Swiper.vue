/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:04:39 
 * @Last Modified by:  情雨随风 
 * @Last Modified time: 2019-12-04 23:04:39 
 * @Description: 首页轮播组件
 */

<script>
import { Swipe,SwipeItem } from 'vant';
export default {
    name: 'Swiper',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return (
            <div class="Swiper">
                <Swipe autoplay={5000} indicator-color="white" stop-propagation={false}>
                    {this.data.map((k, index) => {
                        return (
                            <SwipeItem key={index}>
                                <div style="padding: 0 10px;">
                                    <img class="picUrl" src={this.utils.https(k.picUrl)} />
                                </div>
                            </SwipeItem>
                        )
                    })}
                </Swipe>
            </div>
        )
    }
}
</script>

<style lang="less">
.Swiper {
    margin-top: 20px;
    .picUrl {
        width: 100%;
        display: block;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>