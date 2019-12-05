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
            type: String,
            default: ""
        }
    },
    render() {
        const border = this.border ? "" : "after"
        const style = {
            backgroundColor: this.color || 'transparent'
        }
        return (
            <NavBar
                class={`Header ${border}`}
                style={style}
                title={this.title}
                onClick-left={() => {console.log(1)}}
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
        )
    }
}
</script>

<style lang="less" scoped>
.after {
    &::after {
        border: none;
    }
}
.Header {
    display: flex;
    height: 46PX;
}
</style>