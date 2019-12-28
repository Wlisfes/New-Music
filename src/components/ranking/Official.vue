/*
 * @Author: 情雨随风 
 * @Date: 2019-12-26 22:32:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-26 23:02:34
 * @Description: 官方榜
 */


<script>
import { Image } from 'vant';
export default {
    name: 'Official',
    props: {
        icialist: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '官方榜'
        }
    },
    render() {
        return (
            <div class="Official">
                {false && <div class="title">{this.title}</div>}
                {
                    this.icialist.map(k => {
                        return (
                            <div class="Offout" onClick={() => {this.$emit('playCard', k)}}>
                                <div class="van-picUrl">
                                    <Image
                                        fit="cover"
                                        radius={5}
                                        width={120}
                                        height={120}
                                        src={this.utils.https(`${k.coverImgUrl}?param=200y200`)}
                                    ></Image>
                                    <span class="update">{k.updateFrequency}</span>
                                </div>
                                <div class="Container">
                                    {k.tracks.map((v, i) => (<div class="van-tracks van-ellipsis">
                                        {`${i+1}. ${v.first} - ${v.second}`}
                                    </div>))}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
</script>

<style lang="less">
.Official {
    overflow: hidden;
    padding-bottom: 20PX;
    .Offout {
        display: flex;
        margin: 16px 24px;
        overflow: hidden;
        cursor: pointer;
    }
    .title {
        font-size: 16PX;
        font-weight: 600;
        color: #333333;
        margin: 24px 24px 12px;
    }
    .van-picUrl {
        width: 120px;
        height: 120px;
        position: relative;
        overflow: hidden;
        .update {
            font-size: 12px;
            color: #ffffff;
            position: absolute;
            left: 5px;
            bottom: 5px;
        }
    }
    .Container {
        flex: 1;
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        justify-content: center;
        .van-tracks {
            color: #696969;
            font-size: 14px;
            line-height: 2;
        }
    }
}
</style>