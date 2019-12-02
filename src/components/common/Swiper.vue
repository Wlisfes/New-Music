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
                                    <img class="picUrl" src={k.picUrl} />
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
    .picUrl {
        width: 100%;
        display: block;
        border-radius: 8px;
        cursor: pointer;
    }
}
</style>