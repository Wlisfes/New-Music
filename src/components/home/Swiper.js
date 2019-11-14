
import { Swipe, SwipeItem } from 'vant';
import style from '@less/home/Swiper.module.less';
export default {
    name: 'Swiper',
    data () {
        return {
            banners: []
        }
    },
    created () {
        this.banner()
    },
    methods: {
        async banner() {
            const [err, res] = await this.api.banner({
                type: 2
            })
            if(!err) {
                this.banners = res.banners
            }
        }
    },
    render() {
        return (
            <div class={style.Swiper}>
                <Swipe
                    autoplay={5000}
                >
                    {
                        this.banners.map(k => {
                            return (
                                <SwipeItem key={k.targetId}>
                                    <img class={style.banner} src={k.pic} />
                                </SwipeItem>
                            )
                        })
                    }
                </Swipe>
            </div>
        )
    }
}