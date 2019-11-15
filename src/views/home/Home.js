
import { Swiper,Header,Personali } from '@/components/home';
import { Bscroll } from '@/components/base';
import style from '@less/home/Home.module.less';
export default {
    name: 'Home',
    data() {
        return {
            banners: [],        //轮播图
            personalis: [],     //推荐歌单
            recommends: [],     //每日推荐歌单
        }
    },
    created() {
        this.banner()
        this.personalized()
        this.recommend()
    },
    methods: {
        //轮播图
        async banner() {
            const [err, res] = await this.api.banner({
                type: 2
            })
            if(!err && res.code === 200) {
                this.banners = res.banners.map(k => ({
                    picUrl: k.pic,
                    id: k.targetId
                }))
            }
        },
        //推荐歌单
        async personalized() {
            const [err, res] = await this.api.personalized({
                limit: 6
            })
            if(!err && res.code === 200) {
                this.personalis = res.result.map(k => ({
                    id: k.id,
                    picUrl: k.picUrl,
                    name: k.name,
                    copywriter: k.copywriter
                }))
            }
        },
        //每日推荐（需登陆）
        async recommend() {
            const [err, res] = await this.api.recommend({
                limit: 6
            })
            if(!err && res.code === 200) {
                this.recommends = res.recommend.filter((k,v) => v < 6).map(k => ({
                    id: k.id,
                    picUrl: k.picUrl,
                    name: k.name,
                    copywriter: k.copywriter
                }))
            }
        },
        //歌单详情
        handelplayDetails(param) {
            console.log(param)
            this.$router.push({
                path: `/playDetails`
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
                            ></Personali>
                        }
                    </div>
                </Bscroll>
                <router-view></router-view>
            </div>
        )
    }
}