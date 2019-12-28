<script>
import { Swipe,SwipeItem } from 'vant';
export default {
    name: 'van-Swiper',
    props: {
        banner: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return (
            <div class="van-Swiper">
                <Swipe autoplay={5000} loop={false} indicator-color="white" width={300} initial-swipe={1}>
                    {this.banner.map((k, index) => {
                        return (
                            <SwipeItem key={index}>
                                <div style="padding: 0 10px;">
                                    <img class="picUrl" src={this.utils.https(`${k.coverImgUrl}?param=400y400`)} />
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

<style lang="less" scoped>
.picUrl {
    width: 100%;
    display: block;
    border-radius: 8px;
    cursor: pointer;
}
</style>