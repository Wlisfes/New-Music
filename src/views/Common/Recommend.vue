<script>
import { Root,Swiper,LayoutCard,PlayCard } from '@/components/common';
export default {
    name: 'Recommend',
    data() {
        return {
            banners: [],
            recommend: []
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
            }
        },
        //推荐歌单
        async personalized() {
            const [err, res] = await this.api.personalized({
                limit: 9
            })
            if(!err && res.code === 200) {
                this.recommend = res.result.map(k => {
                    return {
                        id: k.id,
                        picUrl: k.picUrl,
                        name: k.name,
                        playCount: k.playCount
                    }
                })
            }
        }
    },
    render() {
        return (
            <div class="Recommend">
                <Root.Scroll ref="wrapper" class="wrapper" data={[]} bounce={false}>
                    <Root.Container>
                        {true && <Swiper data={this.banners} />}
                        <LayoutCard />
                        <PlayCard
                            title="推荐歌单"
                            subtitle="歌单广场"
                            data={this.recommend}
                        />

                        
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
    /deep/ .ListCard {
        margin-bottom: 40px;
    }
}
</style>