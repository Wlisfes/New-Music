/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:01:28 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 17:19:22
 * @Description: 推荐
 */

<script>
import { mapState } from 'vuex';
import { Root,Swiper,LayoutCard,PlayCard } from '@/components/common';
export default {
    name: 'Recommend',
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            User: state => state.app.User
        })  
    },
    data() {
        return {
            banners: [],      //轮播图
            personas: [],     //推荐歌单
            recommends: [],   //每日推荐歌单（需登录）
            wrappers: []
        }
    },
    created () {
        this.banner()
        this.personalized()
    },
    methods: {
        //轮播图
        async banner() {
            const [err, res] = await this.api.banner({ type: 'iphone' })
            if(!err && res.code === 200) {
                this.banners = res.banners.map(k => {
                    return {
                        id: k.targetId,
                        picUrl: k.imageUrl,
                        name: k.typeTitle
                    }
                })
                this.wrappers = this.wrappers.concat(this.banners)
            }
        },
        //推荐歌单
        async personalized() {
            const [err, res] = await this.api.personalized({
                limit: 9
            })
            if(!err && res.code === 200) {
                this.personas = res.result.map(k => {
                    return {
                        id: k.id,
                        picUrl: k.picUrl,
                        name: k.name,
                        playCount: k.playCount
                    }
                })
                this.wrappers = this.wrappers.concat(this.personas)
            }
        },
        //每日推荐（需登陆）
        async recommend() {
            const [err, res] = await this.api.recommend()

            if(!err && res.code === 200) {
                this.recommends = res.recommend.filter((v, i) => i < 6).map(k => {
                    return {
                        id: k.id,
                        picUrl: k.picUrl,
                        name: k.name,
                        playCount: k.playcount
                    }
                })
                this.wrappers = this.wrappers.concat(this.recommends)
            }
        },
        //歌单列表
        handelplayCard(ops) {
            this.$router.push(`/sonplay/${ops.id}`)
        },
        //四项卡片
        handelayoutCard(key) {
            switch (key) {
                case 1: //每日推荐
                    this.$router.push(`/dayplay`)
                    break;
                case 2: //歌单广场
                    this.$router.push(`/square`)
                    break;
                case 3: //排行榜
                    this.$router.push(`/ranking`)
                    break;
            }
        }
    },
    watch: {
        active(newVal) {
            newVal && this.$refs.wrapper.refresh()
        },
        User: {
            handler() {
                this.User && this.recommend()
            },
            immediate: true
        }
    },
    render() {
        return (
            <div class="Recommend">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false} refreshDelay={60}>
                    <Root.Container>
                        {this.banners.length > 0 && <Swiper data={this.banners} />}
                        {
                            (
                                this.banners.length > 0 ||
                                this.personas.length > 0 ||
                                this.recommends.length > 0
                            ) ?  <LayoutCard onLayout={this.handelayoutCard}/> : <Loading margin="24px"></Loading>
                        }
                        {this.recommends.length > 0 && <PlayCard
                            title="每日推荐"
                            subtitle=""
                            data={this.recommends}
                            onPlayCard={this.handelplayCard}
                        />}
                        {this.personas.length > 0 && <div class="lastPlayCard">
                            <PlayCard
                                title="推荐歌单"
                                subtitle="歌单广场"
                                data={this.personas}
                                onPlayCard={this.handelplayCard}
                                onSubtitle={() => {this.handelayoutCard(2)}}
                            />
                        </div>}

                    </Root.Container>
                </Root.Scroll>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Recommend {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
    .lastPlayCard {
        margin-bottom: 40px;
    }
}
</style>