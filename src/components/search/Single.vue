<!--
 * @Date: 2020-01-04 14:13:35
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-04 17:21:58
 * @Description: 搜索 => 单曲
 -->


<script>
import { mapState } from 'vuex';
import { Divider,Icon } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Single',
    props: {
        keywords: {
            type: [Number, String]
        }
    },
    computed: {
        ...mapState({
            play: state => state.howler.play,
            playid: state => state.howler.playid
        })  
    },
    data () {
        return {
            single: [],     //列表数据
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
                type: 1,
                offset: this.wrappers.length
            })
            if(!err && res.code === 200) {
                const { songs = [],songCount } = res.result
                if(songs.length > 0) {
                    //此处需要调用歌曲详情接口获取歌曲封面
                    const ids = songs.map(k => k.id).join(',')
                    const [error, result] = await this.api.searchDetail({ ids: ids })
                    if(!error && result.code === 200) {
                        const single = result.songs.map((element, index) => {
                            return {
                                ...element,
                                songs: songs[index]
                            }
                        })
                        this.single = this.single.concat(single)
                        this.wrappers = this.wrappers.concat(single)
                    }
                }
                
                if((this.single.length === songCount) || (songCount === 0) || (songs.length === 0)) {
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
        //选中歌曲播放
        handelplay(info, index) {
            this.$router.push(`/search/${this.keywords}/player`)
            if(this.playid === info.id) {
                return;
            }
            this.$store.commit('howler/setPlayid', info.id)
            this.$store.commit('howler/setPicUrl', info.al.picUrl)
            this.$store.commit('howler/setPlayIndex', index)
            this.$store.commit('howler/setPlaylist', this.single)
            this.$store.commit('howler/setDuraTion', Math.ceil(info.dt / 1000))
        }
    },
    render() {
        return (
            <Root class="Single">
                <Root.Scroll
                    ref="wrapper"
                    class="Single-wrapper"
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
                            (this.loading && this.single.length === 0) && <Divider
                                dashed={true}
                                style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '24px 16px'}}
                            >暂无数据</Divider>
                        }
                        
                        {/**单曲列表**/
                            (this.single.length > 0) && (<div class="single-Context">
                                {
                                    this.single.map((k, index) => {
                                        const playStatus = this.playid === k.id
                                        return (
                                            <div class="single-Context-item van-hairline--bottom" key={k.id} onClick={() => {this.handelplay(k, index)}}>
                                                <div class="van-single-index">
                                                    {playStatus ? <Icon name="volume-o" color="#ee0a24" size={20}></Icon> : index +1}
                                                </div>
                                                <div class="van-single-context">
                                                    <div class="van-name van-ellipsis" style={{color: playStatus ? '#ee0a24' : '#333333'}}>{k.songs.name}</div>
                                                    <div class="van-single-name van-ellipsis">
                                                    {k.songs.artists.map(v => v.name).join('/')}
                                                    {k.songs.album.name && ` - ${k.songs.album.name}`}
                                                    {(k.songs.alias.length > 0 ) && ` - ${k.songs.alias.join('/')}`}</div>
                                                </div>
                                                <div class="van-single-icon">
                                                    <Icon name="ellipsis" size={20}></Icon>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                {/**加载更多loading动画**/
                                    (this.single.length > 0 && this.more) && (<Loading margin="16px"></Loading>)
                                }

                                {/**所有加载完毕**/
                                    (this.single.length > 0 && !this.more) && (<Divider
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
.Single {
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
    .single-Context {
        &-item {
            display: flex;
            overflow: hidden;
            cursor: pointer;
            padding: 16px 0;
            height: 44PX;
            margin: 0 24px;
        }
        .van-single-index,
        .van-single-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 44px;
            font-size: 14px;
        }
        .van-single-context {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            .van-name {
                font-size: 15px;
            }
            .van-single-name {
                font-size: 12px;
                color: #757575;
            }
        }
    }
}
</style>