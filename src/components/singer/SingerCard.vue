/*
 * @Author: 情雨随风 
 * @Date: 2019-12-25 22:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-25 23:02:21
 * @Description: 歌手详情卡片
 */


<script>
import { Image,Icon,Skeleton } from 'vant';
export default {
    name: 'SingerCard',
    props: {
        picUrl: String,
        name: String,
        briefDesc: String,
        loading: {
            type: Boolean,
            default: false
        }
    },
    render() {
        return (
            <div class="SingerCard">
                <transition name="van-fade" appear>
                    {this.picUrl && <div
                        class="picUrl"
                        style={{backgroundImage: `url('${this.utils.https(`${this.picUrl}?param=500y500`)}')`}}
                    ></div>}
                </transition>
                <div class="SingerCard-Container">
                    <Image
                        fit="cover"
                        radius={5}
                        width={140}
                        height={140}
                        src={this.utils.https(`${this.picUrl}?param=200y200`)}
                    >
                        <Icon slot="loading" name="photo-o" color="#cccccc" size={40} />
                        <Icon slot="error" name="photo-o" color="#cccccc" size={40} />
                    </Image>
                    <div class="Context">
                        <div class="Context-name van-ellipsis">
                            {this.loading ? this.name : <Skeleton row={1} row-width={['100%','100%']}></Skeleton>}
                        </div>
                        <div class="Context-descr">
                            {this.loading ? <div class="van-multi-ellipsis--l3">{this.briefDesc}</div> : <Skeleton
                                row={4}
                                row-width={['100%','100%']}
                            ></Skeleton>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.SingerCard {
    position: relative;
    overflow: hidden;
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
    .SingerCard-Container {
        position: relative;
        padding: 24px 24px 94px;
        box-sizing: border-box;
        overflow: hidden;
        z-index: 110;
        transform: translate3d(0,0,0);
        display: flex;
    }
    .Context {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 10px 0 10px 24px;
        overflow: hidden;
        .Context-name {
            font-size: 16PX;
            color: #ffffff;
            font-weight: 700;
            .van-skeleton {
                padding: 0;
            }
            .van-skeleton__row {
                height: 12px;
            }
        }
        .Context-descr {
            flex: 1;
            font-size: 13PX;
            color: #f9f9f9;
            line-height: 1.5;
            margin-top: 14px;
            .van-multi-ellipsis--l3 {
                -webkit-line-clamp: 5;
            }
            .van-skeleton {
                padding: 0;
            }
            .van-skeleton__row {
                height: 12px;
            }
        }
    }
}
</style>