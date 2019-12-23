<script>
import { mapState } from 'vuex';
import logo from '@/assets/image/logo.png';
export default {
    name: 'PalyCall',
    computed: {
        ...mapState({
            picUrl: state => state.howler.picUrl,
            play: state => state.howler.play
        })
    },
    render() {
        const className = this.play ? 'play' : 'pause'
        return (
            <div class="PalyCall">
                <div class="cd-wrapper">
                    <div class={`cd ${className}`}>
                        <img class="cdUrl" src={this.picUrl ? this.utils.https(this.picUrl) : logo} />
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.PalyCall {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 80px;
    .cd-wrapper {
        width: 540px;
        height: 540px;
        border-radius: 100%;
        border: 24px solid hsla(20%,0%,100%,.1);
        overflow: hidden;
        box-sizing: border-box;
    }
    .cd {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 100%;
        transform: translate3d(0,0,0);
        .cdUrl {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            border: none;
            transform: translate3d(0,0,0);
        }
        &.play {
            animation: rotate 20s linear infinite;
        }
        &.pause {
            animation-play-state: paused;
            animation: rotate 20s linear infinite;
            -webkit-animation-play-state:paused;
        }
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>