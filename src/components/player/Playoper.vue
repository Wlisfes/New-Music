<script>
import { mapState } from 'vuex';
import { Row,Col,Icon,Toast } from 'vant';
import random from '@assets/icon/random.svg';
import tbeat from '@assets/icon/tbeat.svg';
import loop from '@assets/icon/loop.svg';
import order from '@assets/icon/order.svg';
import playrc from '@assets/icon/playrc.svg';
export default {
    name: 'Playoper',
    computed: {
        ...mapState({
            audio: state => state.howler.audio,
            picUrl: state => state.howler.picUrl,
            play: state => state.howler.play,
            playlist: state => state.howler.playlist,
            playIndex: state => state.howler.playIndex,
            status: state => state.howler.status,
        }),
        statusIcon() {
            switch (this.status) {
                case 1:
                    return order;  //列表循环
                    break;
                case 2:
                    return loop;  //单曲循环
                    break;
                case 3:
                    return random;  //随机
                    break;
                // case 4:
                //     return tbeat;  //心动
                //     break;
            }
        }
    },
    methods: {
        //播放 or 暂停
        handelplay() {
            if(this.playlist.length === 0 || this.playIndex === -1) {
                Toast('歌单暂无歌曲');
                return
            }
            else if(this.play) {
                this.$store.commit('howler/setPlay', false)
                this.audio.pause()
            }
            else {
                this.$store.commit('howler/setPlay', true)
                this.audio.play()
            }
        },
        //上一首
        handelprev() {
            this.$store.commit('howler/prev')
        },
        //下一首
        handelnext() {
            this.$store.commit('howler/next')
        },
        //切换播放状态
        handelswitch() {
            this.$store.commit('howler/switch')
        }
    },
    render() {
        const cursor = {
            cursor: 'pointer'
        }
        return (
            <div class="Playoper">
                <Row style={{margin: '0 24px'}}>
                    <Col span={4}>
                        <Icon name={this.statusIcon} size={32} style={cursor} onClick={this.handelswitch} />
                    </Col>
                    <Col span={5}>
                        <Icon name="arrow-left" size={32} color="#ffffff" style={cursor} onClick={this.handelprev} />
                    </Col>
                    <Col span={6}>
                        <Icon name={this.play ? 'pause-circle-o' : 'play-circle-o'} size={48} color="#ffffff" style={cursor} onClick={this.handelplay} />
                    </Col>
                    <Col span={5}>
                        <Icon name="arrow" size={32} color="#ffffff" style={cursor} onClick={this.handelnext} />
                    </Col>
                    <Col span={4}>
                        <Icon name={playrc} size={32} style={cursor} />
                    </Col>
                </Row>
            </div>
        )
    }
}
</script>

<style lang="less">
.Playoper {
    margin-bottom: 80px;
    .van-row {
        display: flex;
        align-items: center;
        .van-col {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

</style>