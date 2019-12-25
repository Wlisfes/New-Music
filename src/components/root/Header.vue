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
        }
    },
    render() {
        const border = this.border ? "" : "van-border"
        const style = {
            backgroundColor: this.color || 'transparent'
        }
        return (
            <div class="Header">
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
}
</style>