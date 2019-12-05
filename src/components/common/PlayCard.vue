/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:04:21 
 * @Last Modified by:  情雨随风 
 * @Last Modified time: 2019-12-04 23:04:21 
 * @Description: 首页歌单卡片
 */

<script>
import { Row,Col,Icon } from 'vant';
export default {
    name: 'PlayCard',
    props: {
        title: {
            type: String,
            default: '推荐歌单'
        },
        subtitle: {
            type: String,
            default: '推荐歌单'
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return (
            <div class="PlayCard">
                <div class="Play-Header">
                    <div class="Play-title">{this.title}</div>
                    <div class="Play-more van-hairline--surround" onClick={() =>{this.$emit('subtitle')}}>{this.subtitle}</div>
                </div>
                <div class="ListCard">
                    <Row gutter={10}>
                        {this.data.map(k => {
                            return (
                                <Col span={8} onClick={() => {this.$emit('playCard', k)}}>
                                    <div class="picUrl">
                                        <div class="picUrl-icon">
                                            <img class="picUrl-image-icon" src={`${k.picUrl}?param=500y500`} />
                                        </div>
                                        
                                        <div class="playCount">
                                            <Icon name="play" size={14} color="#ffffff" />
                                            <div class="Count">{this.utils.playCount(k.playCount)}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="Context van-multi-ellipsis--l2">{k.name}</div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.PlayCard {
    overflow: hidden;
    .Play-Header {
        height: 45PX;
        display: flex;
        align-items: center;
        margin: 0 10PX;
        color: #333333;
        .Play-title {
            flex: 1;
            font-size: 16PX;
            font-weight: 600;
        }
        .Play-more {
            font-size: 14PX;
            height: 26PX;
            line-height: 26PX;
            padding: 0 10PX;
            cursor: pointer;
            &::after {
                border-color: #cccccc;
                border-radius: 26PX;
            }
        }
    }
    .ListCard {
        margin: 10PX 10PX 0;
        .van-col {
            cursor: pointer;
            margin-bottom: 20px;
        }
        .picUrl {
            overflow: hidden;
            position: relative;
            border-radius: 8px;
            .picUrl-icon {
                width: 100%;
                padding-bottom: 100%;
                height: 0;
                position: relative;
                .picUrl-image-icon {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    object-fit: cover;
                }
            }
            .playCount {
                position: absolute;
                top: 5px;
                right: 10px;
                display: flex;
                align-items: center;
            }
            .Count {
                font-size: 12PX;
                color: #ffffff;
            }
        }
        .Context {
            font-size: 12PX;
            color: #333333;
            line-height: 1.4;
            height: 32PX;
            margin-top: 10px;
        }
    }
    
}
</style>