<script>
import { mapState } from 'vuex';
import { NavBar,Icon,Toast } from 'vant';
import { Playoper,PalyCall,PlaySlider,playLayout } from '@/components/player';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Player',
    computed: {
        ...mapState({
            play: state => state.howler.play,
            picUrl: state => state.howler.picUrl,
            playIndex: state => state.howler.playIndex,
            playlist: state => state.howler.playlist
        }),
        //播放中的歌曲 信息
        playCheck() {
            return this.playlist[this.playIndex]
        }
    },
    render() {
        return (
            <transition name="player-fade" appear>
                <div class="player" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                    <div class="player-header">
                        <NavBar
                            title={this.playCheck && this.playCheck.name || '欢迎收听Music'}
                            onClick-right={() => {this.$router.back()}}
                            onClick-left={() => {this.$router.back()}}
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
                </div>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.player {
    width: 750px;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 150;
    overflow: hidden;
    background-color: #b7b7b7;
    display: flex;
    flex-direction: column;
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
    .middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 151;
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