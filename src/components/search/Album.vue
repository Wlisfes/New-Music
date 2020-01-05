<!--
 * @Date: 2020-01-04 14:25:52
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-04 14:33:33
 * @Description: 搜索 => 专辑
 -->


<script>
import moment from 'moment';
import { Divider,Image } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Album',
    props: {
        keywords: {
            type: [Number, String]
        }
    },
    data () {
        return {
            albums: [],     //列表数据
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
                type: 10,
                offset: this.wrappers.length
            })
            if(!err && res.code === 200) {
                const { albums = [],albumCount } = res.result
                this.albums = this.albums.concat(albums)
                this.wrappers = this.wrappers.concat(albums)
                if((this.albums.length === albumCount) || (albumCount === 0) || (albums.length === 0)) {
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
        //专辑详情
        handelAlbum(ops) {
            this.$router.push(`/search/${this.keywords}/albplay/${ops.id}`)
        }
    },
    render() {
        return (
            <Root class="Album">
                <Root.Scroll
                    ref="wrapper"
                    class="Album-wrapper"
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
                            (this.loading && this.albums.length === 0) && (<Divider
                                dashed={true}
                                style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '24px 16px'}}
                            >暂无数据</Divider>)
                        }

                        {/**专辑列表**/
                            (this.albums.length > 0) && (<div class="albums-Context">
                                {
                                    this.albums.map((k, index) => {
                                        return (
                                            <div class="albums-Context-item" key={k.id} onClick={() => {this.handelAlbum(k)}}>
                                                <Image
                                                    radius={26}
                                                    width={54}
                                                    height={54}
                                                    src={this.utils.https(`${k.picUrl}?param=200y200`)}
                                                ></Image>
                                                <div class="albums-Conent">
                                                    <div class="van-name van-ellipsis">{k.name}</div>
                                                    <div class="van-albums-name van-ellipsis">
                                                        <span>{k.artist.name}</span>
                                                        {
                                                            (k.containedSong) ?
                                                            (<span style={{marginLeft: '5px'}}>{`包含单曲：${k.containedSong}`}</span>) :
                                                            (<span style={{marginLeft: '5px'}}>{moment(k.publishTime).format('YYYY-MM-DD')}</span>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {/**加载更多loading动画**/
                                    (this.albums.length > 0 && this.more) && (<Loading margin="16px"></Loading>)
                                }

                                {/**所有加载完毕**/
                                    (this.albums.length > 0 && !this.more) && (<Divider
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
.Album {
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
    .albums-Context {
        &-item {
            display: flex;
            overflow: hidden;
            cursor: pointer;
            margin: 24px;
        }
        .albums-Conent {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            overflow: hidden;
            .van-name {
                font-size: 15px;
            }
            .van-albums-name {
                font-size: 12px;
                color: #757575;
            }
        }
    }
}
</style>