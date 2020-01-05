<script>
import moment from 'moment';
import { Image,Icon,Skeleton,Row,Col } from 'vant';
import sonplay from '@assets/icon/sonplay.jpg';
export default {
    name: 'AlbplayCard',
    props: {
        picUrl: String,
        name: String,
        descr: String,
        nickname: String,
        publishTime: Number,
        commentCount: {
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
            <div class="AlbplayCard">
                <transition name="van-fade" appear>
                    {this.picUrl && <div
                        class="picUrl"
                        style={{backgroundImage: `url('${this.utils.https(`${this.picUrl}?param=500y500`)}')`}}
                    ></div>}
                </transition>
                <div class="SonplayCard-Container">
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
                                <Icon slot="loading" name="photo-o" color="#cccccc" size={40} />
                                <Icon slot="error" name="photo-o" color="#cccccc" size={40} />
                            </Image>
                        </div>
                        <div class="Context">
                            <div class="Context-name van-multi-ellipsis--l2">
                                {this.loading ? this.name : <Skeleton row={2} row-width={['100%','100%']}></Skeleton>}
                            </div>
                            <div class="Context-singer">
                                {this.nickname && (<div>
                                    <span style={{color: '#c7c7c7'}}>歌手：</span>
                                    <span style={{color: '#ffffff'}}>{this.nickname}</span>
                                </div>)}
                            </div>
                            <div class="Context-descr">
                                <div class="van-time">{`发行时间：${moment(this.publishTime).format('YYYY-MM-DD')}`}</div>
                                <div class="van-descr van-multi-ellipsis--l2">{this.descr}</div>
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
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.AlbplayCard {
    position: relative;
    overflow: hidden;
    height: 270PX;
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
        z-index: 100;
        &::before {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;top: 0;
            background-color: rgba(0,0,0,.3);
        }
    }
    .SonplayCard-Container {
        position: relative;
        padding: 24px;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 110;
        transform: translate3d(0,0,0);
    }
    .Container {
        display: flex;
        position: relative;
        z-index: 110;
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
        .Context-singer {
            flex: 1;
            margin: 10px 0;
            font-size: 14PX;
        }
        .Context-descr {
            .van-skeleton {
                padding: 0;
            }
            .van-skeleton__row {
                height: 11px;
            }
            .van-time,
            .van-descr {
                font-size: 12px;
                color: #c7c7c7;
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