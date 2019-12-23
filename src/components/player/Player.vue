<script>
import { mapState } from 'vuex';
import { NavBar,Icon,Toast } from 'vant';
import { Playoper,PalyCall,PlaySlider,playLayout } from './index';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Player',
    computed: {
        ...mapState({
            audio: state => state.howler.audio,
            player: state => state.howler.player,
            play: state => state.howler.play,
            playid: state => state.howler.playid,
            picUrl: state => state.howler.picUrl,
            playUrl: state => state.howler.playUrl,
            playIndex: state => state.howler.playIndex,
            playlist: state => state.howler.playlist
        }),
        //播放中的歌曲 信息
        playCheck() {
            return this.playlist[this.playIndex]
        }
    },
    data () {
        return {
            Audio: null
        }
    },
    mounted () {
        this.initAudio()
    },
    methods: {
        initAudio() {
            this.$nextTick(() => {
                this.$store.commit('howler/setAudio', this.$refs.Audio)

                //播放完毕
                this.audio.onended = (e) => {
                    this.$store.commit('howler/next')
                }
            }) 
        },
        handelplay() {
            this.$store.commit('howler/setPlayer', !this.player)
        },
        //查询音乐是否可用
        async musicCheck(id) {
            const [err, res] = await this.api.musicCheck({ id })
            if(!err && res.success) {
                this.musicUrl(this.playid)
            }
            else {
                Toast(res.message)
                this.$store.commit('howler/next')
            }
        },
        //获取音乐 url
        async musicUrl(id) {
            const [err, res] = await this.api.musicUrl({ id })
            if(!err && res.code === 200) {
                const data = res.data[0]
                this.$store.dispatch('howler/actionPlayUrl', data.url)
            }
        },
    },
    watch: {
        playid: {
            handler(newVal) {
                if(newVal) {
                    // this.handelplay()
                    this.musicCheck(newVal)
                }
            },
            immediate: true
        },
        playUrl: {
            handler(newVal) {
                if(newVal) {
                    this.audio.src = this.utils.https(newVal)
                    this.audio.load()
                    this.audio.play()
                    !this.play && this.$store.commit('howler/setPlay', true)
                }
            },
            immediate: true
        }
    },
    render() {
        return (
            <div class="player">
                {this.player && false && <transition name="visible" appear>
                    <div class="picUrl-Container">
                        <div class="picUrl" style={{backgroundImage: `url(${this.picUrl})`}}></div>
                    </div>
                </transition>}
                
                <transition name="player-fade" appear>
                    {this.player && <div class="Container" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                        <div class="player-header">
                            <NavBar
                                title={this.playCheck && this.playCheck.name || '欢迎收听Music'}
                                onClick-right={this.handelplay}
                                onClick-left={this.handelplay}
                            >
                                <Icon
                                    slot="left"
                                    name="arrow-left"
                                    color="#ffffff"
                                    size={24}
                                    style={{cursor: 'pointer'}}
                                ></Icon>
                                <Icon
                                    slot="right"
                                    name={this.play ? play : stop}
                                    size={20}
                                    style={{cursor: 'pointer'}}
                                ></Icon>
                            </NavBar>
                        </div>
                        <div class="middle">
                            <PalyCall></PalyCall>
                        </div>
                        <div class="player-oper">
                            <playLayout></playLayout>
                            <PlaySlider></PlaySlider>
                            <Playoper></Playoper>
                        </div>

                        <div class="picUrl" style={{backgroundImage: `url('${this.utils.https(this.picUrl)}?param=500y500')`}}></div>
                    </div>}
                </transition>

                <audio ref="Audio"></audio>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.player {
    .player-header {
        height: 46PX;
        width: 750px;
        z-index: 151;
        .van-nav-bar {
            background-color: transparent;
            &::after { border: none; }
            .van-nav-bar__title {
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
    .player-oper {
        overflow: hidden;
        width: 750px;
        padding-top: 24px;
        z-index: 151;
    }
    .picUrl {
        width: 750px;
        height: 100vh;
        position: absolute;
        top: 0;
        z-index: 150;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(40px);
        transform: scale(1.5);
        &::after {
            content: "";
            position: absolute;
            width: 750px;
            height: 100vh;
            background-color: rgba(0,0,0,.5);
        }
    }
    .Container {
        width: 750px;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 150;
        overflow: hidden;
        background-color: #b7b7b7;
        display: flex;
        flex-direction: column;
        .middle {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 151;
        }
    }
}

&.player-fade-enter-active, &.player-fade-leave-active {
    transition: all 300ms;
    .player-header,.player-oper,.picUrl {
        transition: all 300ms cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
}
&.player-fade-enter, &.player-fade-leave-to {
    opacity: 0;
    .player-header {
        transform: translate3d(0, -100px, 0);
    }
    .player-oper {
        transform: translate3d(0, 100px, 0);
    }
}
</style>