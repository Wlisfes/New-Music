<script>
import { Image,Icon,Skeleton,Row,Col } from 'vant';
import sonplay from '@assets/icon/sonplay.jpg';
export default {
    name: 'SonplayCard',
    props: {
        picUrl: String,
        name: String,
        descr: String,
        avatar: String,
        nickname: String,
        commentCount: {
            type: Number,
            default: 0
        },
        playCount:  {
            type: Number,
            default: 0
        },
        shareCount: {
            type: Number,
            default: 0
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    render() {
        return (
            <div class="SonplayCard">
                {this.picUrl && <transition name="visible" appear>
                    <div class="picUrl-opacity">
                        <img class="picUrl" style={{top: '-146px'}} src={this.picUrl} />
                    </div>
                </transition>}


                <div class="Container">
                    <div style={{width: '140px', height: '140px', position: 'relative'}}>
                        <Image
                            fit="cover"
                            radius={5}
                            width={140}
                            height={140}
                            onClick={() => {alert(1)}}
                            src={this.utils.https(this.picUrl)}
                        >
                            <Icon slot="loading" name="contact" color="#ee0a24" size={28} />
                            <Icon slot="error" name="contact" color="#ee0a24" size={28} />
                        </Image>
                        <div class="playCount">
                            <Icon name="play" size={14} color="#ffffff" />
                            <div class="Count">{this.utils.playCount(this.playCount)}</div>
                        </div>
                    </div>
                    <div class="Context">
                        <div class="Context-name van-multi-ellipsis--l2">
                            {this.loading ? this.name : <Skeleton row={2} row-width={['100%','100%']}></Skeleton>}
                        </div>
                        <div class="Context-avatar">
                            <Image round fit="cover" width={28} height={28} src={this.utils.https(this.avatar)}>
                                <Icon slot="loading" name="contact" color="#0e0e0e" size={20} />
                                <Icon slot="error" name="contact" color="#0e0e0e" size={20} />
                            </Image>
                            <div class="Context-nickname van-ellipsis">{this.nickname}</div>
                        </div>
                        <div class="Context-descr van-multi-ellipsis--l2">
                        {this.loading ? this.descr : <Skeleton row={2} row-width={['100%','100%']}></Skeleton>}
                        </div>
                    </div>
                </div>
                <Row style={{margin: '20px 0 20px', transform: 'translate3d(0,0,0)'}}>
                    <Col span={6} class="Context-Col">
                        <Icon name="chat-o" color="#ffffff" size={26} />
                        <div class="Context-Col-name">{this.commentCount || '评论'}</div>
                    </Col>
                    <Col span={6} class="Context-Col">
                        <Icon name="share" color="#ffffff" size={26} />
                        <div class="Context-Col-name">{this.shareCount || '分享'}</div>
                    </Col>
                    <Col span={6} class="Context-Col">
                        <Icon name="down" color="#ffffff" size={26} />
                        <div class="Context-Col-name">下载</div>
                    </Col>
                    <Col span={6} class="Context-Col">
                        <Icon name="certificate" color="#ffffff" size={26} />
                        <div class="Context-Col-name">全选</div>
                    </Col>
                </Row>
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
        transform: translate3d(0,0,0);
        filter: blur(40px);
        opacity: .6;
    }
}


.SonplayCard {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    overflow: hidden;
    height: 540px;
    transform: translate3d(0,0,0);
    margin-bottom: -100px;
    .Container {
        transform: translate3d(0,0,0);
        display: flex;
        .playCount {
            position: absolute;
            top: 5px;
            right: 10px;
            display: flex;
            align-items: center;
            .Count {
                font-size: 12PX;
                color: #ffffff;
            }
        }
        .Context {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            margin: 10px 0 10px 24px;
            overflow: hidden;
        }
        .Context-name {
            font-size: 16PX;
            color: #ffffff;
            font-weight: 700;
            .van-skeleton {
                padding: 0;
            }
            .van-skeleton__row {
                height: 15px;
            }
        }
        .Context-nickname {
            font-size: 14PX;
            color: #f9f9f9;
            margin-left: 12px;
        }
        .Context-avatar {
            flex: 1;
            display: flex;
            align-items: center;
            overflow: hidden;
        }
        .Context-descr {
            font-size: 13PX;
            height: 34PX;
            color: #f9f9f9;
            .van-skeleton {
                padding: 0;
            }
            .van-skeleton__row {
                height: 11px;
            }
        }
    }
    .Context-Col {
        display: flex;
        flex-direction: column;
        align-items: center;
        .Context-Col-name {
            font-size: 12PX;
            margin-top: 5px;
            color: #ffffff;
            position: relative;
        }
    }
}
</style>