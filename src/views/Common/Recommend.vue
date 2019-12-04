/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:01:28 
 * @Last Modified by:  情雨随风 
 * @Last Modified time: 2019-12-04 23:01:28 
 * @Description: 推荐
 */

<script>
import { Root,Swiper,LayoutCard,PlayCard } from '@/components/common';
export default {
    name: 'Recommend',
    data() {
        return {
            banners: [],
            recommend: [],
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
                this.recommend = res.result.map(k => {
                    return {
                        id: k.id,
                        picUrl: k.picUrl,
                        name: k.name,
                        playCount: k.playCount
                    }
                })
                this.wrappers = this.wrappers.concat(this.recommend)
            }
        }
    },
    render() {
        return (
            <div class="Recommend">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={true}>
                    <Root.Container>
                        {this.banners.length > 0 && <Swiper data={this.banners} />}
                        {
                            (this.banners.length > 0 || this.recommend.length > 0) ?
                            <LayoutCard /> : <Loading margin="24px"></Loading>
                        }
                        {this.recommend.length > 0 && <PlayCard
                            title="推荐歌单"
                            subtitle="歌单广场"
                            data={this.recommend}
                        />}

                        
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