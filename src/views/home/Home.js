import { mapState } from 'vuex';
import { Swiper,Header,Personali } from '@/components/home';
import { Bscroll } from '@/components/base';
import style from '@less/home/Home.module.less';
export default {
    name: 'Home',
    computed: {
        ...mapState({
            transitionName: state => state.app.transitionName,
            banners: state => state.design.banners,
            personalis: state => state.design.personalis,
            recommends: state => state.design.recommends,
        })
    },
    created() {
        this.$store.dispatch('design/banner', {
            type: 2
        })
        this.$store.dispatch('design/personalized', {
            limit: 6
        })
    },
    methods: {
        //歌单详情
        handelplayDetails(params) {
            this.$router.push({
                path: `/playDetails`,
                query: {
                    id: params.id,
                    type: 'personalis'
                }
            })
        }
    },
    render() {
        return (
            <div class={style.Home} onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                <Header></Header>
                <Bscroll class={style.Scroll} bounce={true}>
                    <div class={style.Container}>
                        {this.banners.length > 0 && <Swiper banner={this.banners} top={6}></Swiper>}
                        {
                            this.recommends.length > 0 && <Personali
                                title="每日推荐"
                                list={this.recommends}
                                onPlay={this.handelplayDetails}
                            ></Personali>
                        }
                        {
                            this.personalis.length > 0 && <Personali
                                title="推荐歌单"
                                subtitle="歌单广场"
                                list={this.personalis}
                                onPlay={this.handelplayDetails}
                            ></Personali>
                        }
                    </div>
                </Bscroll>
                <transition name={this.transitionName}>
                    <router-view></router-view>
                </transition>
            </div>
        )
    }
}