<script>
import { mapState } from 'vuex';
import { NavBar,Icon,Toast } from 'vant';
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
            playUrl: state => state.howler.playUrl
        })  
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
                newVal && this.musicCheck(newVal)
            },
            immediate: true
        },
        playUrl: {
            handler(newVal) {
                if(newVal) {
                    this.audio.src = newVal
                    this.audio.load()
                    this.audio.play()
                }
            },
            immediate: true
        }
    },
    render() {
        return (
            <div>
                {this.player && <transition name="player" appear>
                    <div class="Player" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                        <div class="Player-Container">
                            {this.picUrl && <transition name="visible" appear>
                                <div class="picUrl" style={{backgroundImage: `url(${this.picUrl})`}}></div>
                            </transition>}
                            <NavBar onClick-right={this.handelplay}>
                                <Icon
                                    slot="left"
                                    name="arrow-left"
                                    color="#ffffff"
                                    size={24}
                                ></Icon>
                                <Icon
                                    slot="right"
                                    name={this.play ? play : stop}
                                    size={20}
                                ></Icon>
                            </NavBar>
                        </div>
                    </div>
                </transition>}

                <audio ref="Audio"></audio>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.player-enter-active, .player-leave-active {
    transition: all 300ms;
}
.player-enter, .player-leave-to {
    opacity: 0;
}
.visible-enter-active, .visible-leave-active {
    transition: all 1s;
}
.visible-enter, .visible-leave-to {
    opacity: 0;
}

.van-nav-bar {
    background-color: transparent;
    &::after {
        border: none;
    }
}
.Player {
    position: fixed;
    width: 750px;
    height: 100vh;
    top: 0;
    z-index: 100;
    overflow: hidden;
    background-color: #b7b7b7;
    .picUrl {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;top: 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(40px);
    }
    .Player-Container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>