/*
 * @Author: 情雨随风 
 * @Date: 2019-12-25 22:40:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-25 23:02:21
 * @Description: 歌手详情卡片
 */


<script>
import { Image,Icon } from 'vant';
export default {
    name: 'SingerCard',
    props: {
        picUrl: String,
    },
    render() {
        return (
            <div class="SingerCard">
                <transition name="van-fade" appear>
                    {this.picUrl && <div class="picUrl-opacity">
                        <img class="picUrl" style={{top: '-146px'}} src={this.utils.https(`${this.picUrl}?param=500y500`)} />
                    </div>}
                </transition>
                <Image
                    fit="cover"
                    radius={5}
                    width={140}
                    height={140}
                    src={this.utils.https(`${this.picUrl}?param=200y200`)}
                >
                    <Icon slot="loading" name="contact" color="#ee0a24" size={28} />
                    <Icon slot="error" name="contact" color="#ee0a24" size={28} />
                </Image>

                
            </div>
        )
    }
}
</script>

<style lang="less">
.van-fade-enter-active, .van-fade-leave-active {
    .picUrl-opacity {
        transition: all 2s;
    }
}
.visible-enter, .visible-leave-to {
    .picUrl-opacity {
        opacity: 0;
    }
}
.picUrl-opacity {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
    overflow: hidden;
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
.SingerCard {
    position: relative;
    padding: 24px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>