<script>
import { Root } from '@/components/common';
import { Swiper,Qulist } from '@/components/square';
export default {
    name: 'QuRoot',
    props: {
        banner: {
            type: Boolean,
            default: false
        },
        cat: {
            type: String,
            default: '全部'
        },
        order: {
            type: String,
            default: 'hot'
        }
    },
    data () {
        return {
            banners: [],     //轮播数据
            inlist: [],      //列表数据
            wrappers: [],
            loading: false,
            more: false,     //是否能加载更多

            limit: 45,       //一次加载数量
        }
    },
    created () {
        setTimeout(() => {
            if(this.cat === '精品') {
                this.BoutiqueSquarePalylist()
            }
            else {
                this.firstPalylist()
            }
        }, 500)
    },
    methods: {
        //数据接口默认加载
        async firstPalylist() {
            const [err, res] = await this.api.SquarePalylist({
                cat: this.cat,
                order: this.order,
                limit: this.limit,
                offset: this.wrappers.length,
            })
            if(!err && res.code === 200) {
                res.playlists.forEach((element,index) => {
                    if(index < 3 && this.banner) {
                        this.banners.push(element)
                    }
                    else {
                        this.inlist.push(element)
                    }
                })
                this.wrappers = res.playlists
                this.more = res.more

                //开启轮播需要延时计算
                if(this.banner) {
                    setTimeout(() => {
                        this.banner && this.$refs.wrapper.refresh()
                    }, 500)
                }
            }
            this.loading =  true
        },
        //更多歌单
        async MorefirstPalylist() {
            const [err, res] = await this.api.SquarePalylist({
                cat: this.cat,
                order: this.order,
                limit: this.limit,
                offset: this.wrappers.length
            })

            if(!err && res.code === 200) {
                //数据合并
                this.inlist = this.inlist.concat(res.playlists)
                this.wrappers = this.wrappers.concat(res.playlists)
                this.more = res.more
            }
            this.loading =  true
        },
        //精品歌单
        async BoutiqueSquarePalylist() {
            const [err, res] = await this.api.BoutiqueSquarePalylist({
                limit: this.limit,
                before: this.wrappers.length > 0 ? this.wrappers[this.wrappers.length - 1].updateTime : 0
            })
            if(!err && res.code === 200) {
                this.inlist = this.inlist.concat(res.playlists)
                this.wrappers = this.wrappers.concat(res.playlists)
                this.more = res.more
            }
            this.loading =  true
        },
        //滚动到底事件 上拉加载
        async handelScrollToEnd(e) {
            if(this.loading && this.more){
                //上一次加载完毕并且还有数据加载 否则不做任何处理
                this.loading = false
                if(this.cat === '精品') {
                    this.BoutiqueSquarePalylist()
                }
                else {
                    this.MorefirstPalylist()
                }
            }
        },
        //歌单列表
        handelplayCard(ops) {
            this.$router.push(`/square/sonplay/${ops.id}`)
        }
    },
    render() {
        return (
            <Root class="QuRoot">
                <Root.Scroll
                    ref="wrapper"
                    class="QuRoot-wrapper"
                    data={this.wrappers}
                    bounce={false}
                    pullup={true}
                    listenScroll={true}
                    probeType={2}
                    onScrollToEnd={this.handelScrollToEnd}
                >
                    <Root.Container>
                        {
                            (
                                !this.loading &&
                                (this.banners.length === 0 && this.inlist.length === 0)
                            )
                            && <Loading margin="24px"></Loading>
                        }
                        {(this.banner && this.banners.length > 0) && <Swiper banner={this.banners}></Swiper>}
                        {this.inlist.length > 0 &&<Qulist
                            inlist={this.inlist}
                            more={this.more}
                            onPlayCard={this.handelplayCard}
                        ></Qulist>}
                    </Root.Container>
                </Root.Scroll>
            </Root>
        )
    }
}
</script>

<style lang="less">
.QuRoot {
    &-wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>