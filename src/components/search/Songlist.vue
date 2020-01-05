<!--
 * @Date: 2020-01-04 14:25:02
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-04 14:33:21
 * @Description: 搜索 => 歌单
 -->


<script>
import { Divider,Image } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Songlist',
    props: {
        keywords: {
            type: [Number, String]
        }
    },
    data () {
        return {
            solist: [],     //列表数据
            wrappers: [],
            more: true,     //是否能加载更多
            loading: false,
            limit: 30,       //一次加载数量
        }
    },
    created () {
        setTimeout(() => {
            this.handelsearch()
        }, 500)
    },
    methods: {
        //分类搜索
        async handelsearch() {
            const [err, res] = await this.api.search({
                keywords: this.keywords,
                limit: this.limit,
                type: 1000,
                offset: this.wrappers.length
            })
            if(!err && res.code === 200) {
                const { playlists = [],playlistCount } = res.result
                this.solist = this.solist.concat(playlists)
                this.wrappers = this.wrappers.concat(playlists)

                if((this.solist.length === playlistCount) || (playlistCount === 0) || (playlists.length === 0)) {
                    this.more = false
                }
            }
            this.loading = true
        },
        //滚动到底事件 上拉加载
        handelScrollToEnd() {
            if(this.loading && this.more) {
                //上一次加载完毕并且还有数据加载 否则不做任何处理
                this.loading = false
                this.handelsearch()
            }
        },
        //选择某个歌单
        handelplay(ops) {
            this.$router.push(`/search/${this.keywords}/${ops.id}`)
        }
    },
    render() {
        return (
            <Root class="Songlist">
                <Root.Scroll
                    ref="wrapper"
                    class="Songlist-wrapper"
                    data={this.wrappers}
                    bounce={false}
                    pullup={true}
                    listenScroll={true}
                    probeType={2}
                    onScrollToEnd={this.handelScrollToEnd}
                >
                    <Root.Container>
                        {/**加载loading动画**/
                            (!this.loading) && (<Loading style={{marginTop: '24px'}}></Loading>)
                        }

                        {/**无数据展示**/
                            (this.loading && this.solist.length === 0) && (<Divider
                                dashed={true}
                                style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '24px 16px'}}
                            >暂无数据</Divider>)
                        }

                        {/**歌单列表**/
                            (this.solist.length > 0) && (<div class="solist-Context">
                                {
                                    this.solist.map((k, index) => {
                                        return (
                                            <div class="solist-Context-item" key={k.id} onClick={() => {this.handelplay(k)}}>
                                                <Image
                                                    radius={5}
                                                    width={48}
                                                    height={48}
                                                    src={this.utils.https(`${k.coverImgUrl}?param=200y200`)}
                                                ></Image>
                                                <div class="solist-content">
                                                    <div class="van-solist-name van-ellipsis">{k.name}</div>
                                                    <div class="van-solist-description van-ellipsis">
                                                        <span style={{marginRight: '5px'}}>{`${k.trackCount}首音乐`}</span>
                                                        <span>{`by ${k.creator.nickname}，播放${this.utils.playCount(k.playCount)}次`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {/**加载更多loading动画**/
                                    (this.solist.length > 0 && this.more) && (<Loading margin="16px"></Loading>)
                                }

                                {/**所有加载完毕**/
                                    (this.solist.length > 0 && !this.more) && (<Divider
                                        dashed={true}
                                        style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px'}}
                                    >没有更多了</Divider>)
                                }
                            </div>)
                        }
                    </Root.Container>
                </Root.Scroll>
            </Root>
        )
    }
}
</script>

<style lang="less" scoped>
.Songlist {
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
    .solist-Context {
        &-item {
            display: flex;
            overflow: hidden;
            cursor: pointer;
            margin: 24px;
        }
        .solist-content {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            .van-solist-name {
                font-size: 15px;
            }
            .van-solist-description {
                font-size: 12px;
                color: #757575;
            }
        }
    }
}
</style>