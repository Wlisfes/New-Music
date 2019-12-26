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
        title: String,
        picUrl: String
    },
    render() {
        const border = this.border ? "" : "van-border"
        const style = {
            backgroundColor: this.color || 'transparent'
        }
        return (
            <div class="Header">
                <transition name="van-fade" appear>
                    {this.picUrl && <div
                        class="picUrl"
                        style={{backgroundImage: `url('${this.utils.https(`${this.picUrl}?param=500y500`)}')`}}
                    ></div>}
                </transition>
                <NavBar
                    class={border}
                    style={style}
                    title={this.title || '歌单'}
                    onClick-left={() => {this.$emit('back')}}
                    onClick-right={() => {this.$emit('play')}}
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
    .picUrl {
        position: absolute;
        left: -50px;
        top: -40PX;
        right: -50px;
        bottom: -40PX;
        background-repeat: no-repeat;
        background-size: 850px 850px;
        background-position-x: 50%;
        background-position-y: -40PX;
        filter: blur(40px);
        transform: translate3d(0,0,0,);
        &::before {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;top: 0;
            background-color: rgba(0,0,0,.3);
        }
    }
}
</style>