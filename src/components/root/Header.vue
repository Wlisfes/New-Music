<script>
import { NavBar,Icon } from 'vant';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Header',
    props: {
        play: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ""
        },
        title: {
            type: String
        },
        picUrl: {
            type: String,
            default: ""
        }
    },
    methods: {
        handelplay() {
            this.$store.commit('app/setPlayer', !this.player)
        }
    },
    render() {
        const border = this.border ? "" : "van-border"
        const style = {
            backgroundColor: this.color || 'transparent'
        }
        return (
            <div class="Header">
                {this.picUrl && <transition name="visible" appear>
                    <div class="picUrl-opacity">
                        <img class="picUrl" style={{top: '-100px'}} src={this.picUrl} />
                    </div>
                </transition>}
            

                <NavBar
                    class={border}
                    style={style}
                    title={this.title || '歌单'}
                    onClick-left={() => {this.$emit('back')}}
                    onClick-right={() => {
                        this.$emit('play', this.play)
                    }}
                >
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
        )
    }
}
</script>

<style lang="less" scoped>
.visible-enter-active, .visible-leave-active {
    transition: all 1s;
}
.visible-enter, .visible-leave-to {
    opacity: 0;
}

.picUrl-opacity {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    .picUrl {
        position: absolute;
        width: 1024px;
        height: 1024px;
        left: -137px;
        filter: blur(40px);
        opacity: .6;
        transform: translate3d(0,0,0);
    }
}

.Header {
    position: relative;
    overflow: hidden;
    .van-nav-bar__title {
        color: #ffffff;
        font-size: 18px;
    }
    .van-border {
        &::after {
            border: none;
        }
    }
}
</style>