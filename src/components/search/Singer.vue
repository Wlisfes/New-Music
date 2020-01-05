<!--
 * @Date: 2020-01-04 14:23:05
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-04 14:33:12
 * @Description: 搜索 => 歌手
 -->


<script>
import { Divider,Image,Icon } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Singer',
    props: {
        keywords: {
            type: [Number, String]
        }
    },
    data () {
        return {
            singer: [],     //列表数据
            wrappers: [],
            more: true,     //是否能加载更多
            loading: false,
            limit: 30,      //一次加载数量
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
                type: 100,
                offset: this.wrappers.length
            })
            if(!err && res.code === 200) {
                const { artists = [],artistCount } = res.result
                this.singer = this.singer.concat(artists)
                this.wrappers = this.wrappers.concat(artists)

                if((this.singer.length === artistCount) || (artistCount === 0) || (artists.length === 0)) {
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
        //歌单详情
        handelSinger(ops) {
            this.$router.push(`/search/${this.keywords}/singer/${ops.id}`)
        }
    },
    render() {
        return (
            <Root class="Singer">
                <Root.Scroll
                    ref="wrapper"
                    class="Singer-wrapper"
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
                            (this.loading && this.singer.length === 0) && (<Divider
                                dashed={true}
                                style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '24px 16px'}}
                            >暂无数据</Divider>)
                        }

                        {/**歌手列表**/
                            (this.singer.length > 0) && (<div class="solist-Context">
                                {
                                    this.singer.map((k, index) => {
                                        return (
                                            <div class="solist-Context-item" key={k.id} onClick={() => {this.handelSinger(k)}}>
                                                <Image
                                                    radius={26}
                                                    width={54}
                                                    height={54}
                                                    src={this.utils.https(`${k.img1v1Url}?param=200y200`)}
                                                ></Image>
                                                <div class="van-Conent van-ellipsis">
                                                    {k.name}
                                                </div>
                                                {(k.accountId) && (<div class="van-settle">
                                                    <Icon name="user-circle-o" color="#ee0a24" size={16} style={{marginRight: '2px'}} />
                                                    <span>已入驻</span>
                                                </div>)}
                                            </div>
                                        )
                                    })
                                }

                                {/**加载更多loading动画**/
                                    (this.singer.length > 0 && this.more) && (<Loading margin="16px"></Loading>)
                                }

                                {/**所有加载完毕**/
                                    (this.singer.length > 0 && !this.more) && (<Divider
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
.Singer {
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
        .van-settle {
            font-size: 12px;
            color: #757575;
            display: flex;
            align-items: center;
            margin-left: 10px;
        }
        .van-Conent {
            flex: 1;
            font-size: 15px;
            margin-left: 10px;
            display: flex;
            align-items: center;
        }
    }
}
</style>