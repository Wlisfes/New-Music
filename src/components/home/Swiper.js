
import { Swipe, SwipeItem } from 'vant';
import style from '@less/home/Swiper.module.less';
export default {
    name: 'Swiper',
    props: {
        banner: {
            type: Array,
            default: () => []
        },
        top: {
            type: Number,
            default: 0
        }
    },
    render() {
        return (
            <div class={style.Swiper} style={{ marginTop: `${this.top}px` }}>
                <Swipe autoplay={5000}>
                    {
                        this.banner.map(k => {
                            return (
                                <SwipeItem key={k.id}>
                                    <img class={style.banner} src={this.utils.replaceHttps(k.picUrl)} />
                                </SwipeItem>
                            )
                        })
                    }
                </Swipe>
            </div>
        )
    }
}