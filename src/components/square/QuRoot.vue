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
        }
    },
    data () {
        return {
            banners: [],     //轮播数据
            inlist: [],      //列表数据
            wrappers: [],
            loading: false
        }
    },
    created () {
        setTimeout(() => {
            this.SquarePalylist() 
        }, 500) 
    },
    methods: {
        //数据接口
        async SquarePalylist() {
            const [err, res] = await this.api.SquarePalylist({
                tag: this.cat,
                limit: 50
            })
            if(!err && res.code === 200) {
                res.playlists.forEach((element,index) => {
                    if(index < 3) {
                        this.banners.push(element)
                    }
                    else {
                        this.inlist.push(element)
                    }
                })
                this.wrappers = res.playlists
                this.loading =  true
                setTimeout(() => {
                    this.banner && this.$refs.wrapper.refresh()
                }, 1000)
            }
        }   
    },
    render() {
        return (
            <Root class="QuRoot">
                <Root.Scroll ref="wrapper" class="QuRoot-wrapper" data={this.wrappers} bounce={false}>
                    <Root.Container>
                        {!this.loading && <Loading margin="24px"></Loading>}
                        {(this.banner && this.banners.length > 0) && <Swiper banner={this.banners}></Swiper>}
                        {this.inlist.length > 0 &&<Qulist inlist={this.inlist}></Qulist>}
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