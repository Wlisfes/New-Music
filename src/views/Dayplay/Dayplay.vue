/*
 * @Author: 情雨随风 
 * @Date: 2019-12-29 17:15:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 18:56:40
 * @Description: 每日推荐歌曲
 */


<script>
import { mapState } from 'vuex';
import { Icon,Image,Divider } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Dayplay',
    computed: {
        ...mapState({
            play: state => state.howler.play,
            playid: state => state.howler.playid
        })
    },
    data () {
        return {
            inplay: [],       //列表数据
            wrappers: [],
            loading: false
        }
    },
    created () {
        setTimeout(() => {
            this.recommendSongs()
        }, 500)
    },
    methods: {
        //每日推荐歌曲（需登录）
        async recommendSongs() {
            const [err, res] = await this.api.recommendSongs()
            if(!err || res.code === 200) {
                const mend = res.recommend.map(element => {
                    return {
                        ...element,
                        al: {
                            picUrl: element.album.picUrl
                        }
                    }
                })
                this.inplay = this.inplay.concat(mend)
                this.wrappers = this.wrappers.concat(mend)
            }
            this.loading = true
        },
        //选中歌曲播放
        handelplay(info, index) {
            this.$router.push(`/dayplay/player`)
            if(this.playid === info.id) {
                return;
            }
            this.$store.commit('howler/setPlayid', info.id)
            this.$store.commit('howler/setPicUrl', info.album.picUrl)
            this.$store.commit('howler/setPlayIndex', index)
            this.$store.commit('howler/setPlaylist', this.inplay)
            this.$store.commit('howler/setDuraTion', Math.ceil(info.duration / 1000))
        }
    },
    render() {
        return (
            <transition name="dayplay" appear>
                <Root class="Dayplay">
                    <Root.Header
                        color="#ffffff"
                        iconColor="#323233"
                        title='每日推荐'
                        play={this.play}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={() => {this.$router.push(`/dayplay/player`)}}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>
                            {!this.loading && <Loading style={{marginTop: '24px'}}></Loading>}
                            {
                                (this.loading && this.inplay.length === 0) && <Divider
                                    dashed={true}
                                    style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px'}}
                                >暂无歌曲</Divider>
                            }
                            {(this.inplay.length > 0) && <div class="inplay">
                                {false && <div class="inplay-Header">
                                    <Icon name="inplay-circle-o" size={20} color="#333333"></Icon>
                                    <div class="inplay-whole">
                                        播放全部
                                        <span class="inplay-whole-all">{`(${this.inplay.length})首`}</span>
                                    </div>
                                </div>}
                                {
                                    this.inplay.map((k, index) => {
                                        const playStatus = this.playid === k.id
                                        return (
                                            <div class="inplay-Content" key={index} onClick={() => {this.handelplay(k, index)}}>
                                                <Image
                                                    radius={5}
                                                    width={48}
                                                    height={48}
                                                    src={this.utils.https(`${k.album.picUrl}?param=200y200`)}
                                                ></Image>
                                                <div class="van-inplay-index">
                                                    {playStatus ? <Icon name="volume-o" color="#ee0a24" size={20}></Icon> : index +1}
                                                </div>
                                                <div style={{flex: 1,display: 'flex',flexDirection: 'column',justifyContent: 'center',overflow: 'hidden'}}>
                                                    <div class="van-name van-ellipsis" style={{color: playStatus ? '#ee0a24' : '#333333'}}>{k.name}</div>
                                                    <div class="van-singer-name van-ellipsis">{k.artists.map(v => v.name).join('/')} - {k.album.name}</div>
                                                </div>
                                                <div class="van-inplay-icon">
                                                    <Icon name="ellipsis" size={20}></Icon>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>}
                        </Root.Container>
                    </Root.Scroll>
                    <router-view></router-view>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.dayplay-enter-active,.dayplay-leave-active {
    transition: all 300ms;
}
.dayplay-enter,.dayplay-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Dayplay {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
    /deep/ .van-nav-bar__title {
        color: #323233;
        font-size: 16px;
    }
    .wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
    .inplay {
        margin-bottom: 40px;
        .inplay-Header {
            height: 40PX;
            display: flex;
            align-items: center;
            padding: 12px 24px 0;
            background-color: #ffffff;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
            .inplay-whole {
                font-size: 16PX;
                color: #333333;
                font-weight: 600;
                margin-left: 10px;
            }
            .inplay-whole-all {
                font-size: 12PX;
                font-weight: normal;
                margin-left: 5px;
                color: #757575;
            }
        }
        &-Content {
            display: flex;
            margin: 24px;
            overflow: hidden;
            cursor: pointer;
            .van-inplay-index,.van-inplay-icon {
                width: 44px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .van-name {
                font-size: 15px;
            }
            .van-singer-name {
                font-size: 12px;
                color: #757575;
            }
        }
    }
}
</style>