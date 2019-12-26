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
                <transition name="van-fade" appear>
                    {this.picUrl && <div
                        class="picUrl"
                        style={{backgroundImage: `url('${this.utils.https(`${this.picUrl}?param=500y500`)}')`}}
                    ></div>}
                </transition>
                <div class="Container">
                    <div style={{width: '140px', height: '140px', position: 'relative'}}>
                        <Image
                            fit="cover"
                            radius={5}
                            width={140}
                            height={140}
                            onClick={() => {alert(1)}}
                            src={this.utils.https(`${this.picUrl}?param=200y200`)}
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
                            <Image round fit="cover" width={28} height={28} src={this.utils.https(`${this.avatar}?param=200y200`)}>
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
.SonplayCard {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    overflow: hidden;
    height: 270PX;
    // margin-bottom: -100px;
    .picUrl {
        position: absolute;
        left: -50px;
        top: -40PX;
        right: -50px;
        bottom: -40PX;
        background-repeat: no-repeat;
        background-size: 850px 850px;
        background-position-x: 50%;
        background-position-y: -86PX;
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
    .Container {
        display: flex;
        position: relative;
        z-index: 110;
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