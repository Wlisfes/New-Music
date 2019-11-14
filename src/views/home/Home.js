
import { Swiper,Header,Personali } from '@/components/home';
import { Bscroll } from '@/components/base';
import style from '@less/home/Home.module.less';
export default {
    name: 'Home',
    data() {
        return {
            personalis: [],     //推荐歌单
        }
    },
    created() {
        this.personalized()
    },
    methods: {
        async personalized() {
            const [err, res] = await this.api.personalized({
                limit: 6
            })
            if(!err && res.code === 200) {
                this.personalis = res.result
            }
        }
    },
    render() {
        return (
            <div class={style.Home} onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                <Bscroll class={style.Scroll}>
                    <div class={style.Container}>
                        <Header></Header>
                        <Swiper></Swiper>
                        <Personali
                            list={this.personalis}
                        ></Personali>
                    </div>
                </Bscroll>
                <router-view></router-view>
            </div>
        )
    }
}