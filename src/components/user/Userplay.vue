/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:06:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-07 15:15:24
 * @Description: user歌单组件
 */

<script>
import { Collapse,CollapseItem,Icon,Image } from 'vant';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Userplay',
    props: {
        userplay: {
            type: Array,
            default: () => []
        },
        starplay: {
            type: Array,
            default: () => []
        },
        play: {
            type: Boolean,
            default: false
        },
        sonplayid: {
            type: [Number, String],
            default: ''
        }
    },
    data () {
        return {
            active: [1]
        }
    },
    methods: {
        
    },
    render() {
        const IconStyle = {marginRight: '10px'}
        return (
            <div class="Userplay">
                <Collapse value={this.userplay.length > 0 ? this.active : []} onChange={active => {this.active = active}}>
                    <CollapseItem title="我创建的歌单" name={1} size="large" value={this.userplay.length}>
                        <Icon slot="icon" color="#ee0a24" size={24} name="contact" style={IconStyle}></Icon>
                        <div class="UserContainer">
                            {this.userplay.length > 0 ? <div class="Createplay">
                                {
                                    this.userplay.map(k => {
                                        return (
                                            <div class="play-li van-hairline--bottom" key={k.id} onClick={() => {this.$emit('playCard', k)}}>
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    radius={5}
                                                    fit="cover"
                                                    src={k.coverImgUrl}
                                                ></Image>
                                                <div class="play-name van-ellipsis">
                                                    <div class="name">{k.name}</div>
                                                    <div class="nickname">{`${k.trackCount}首，by ${k.creator.nickname}`}</div>
                                                </div>
                                                <div class="play-icon">
                                                    {this.sonplayid == k.id ?
                                                        this.play ?
                                                          <Image width={20} height={20} src={play}></Image>
                                                        : <Image width={20} height={20} src={stop}></Image>
                                                    : null}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> : <div class="Createplay">
                                <Empty message="您还没有创建歌单噢"></Empty>
                            </div>}
                        </div>
                    </CollapseItem>
                    <CollapseItem title="我收藏的歌单" name={2} size="large" value={this.starplay.length}>
                        <Icon slot="icon" color="#ee0a24" size={24} name="like-o" style={IconStyle}></Icon>
                        <div class="UserContainer">
                            {this.starplay.length > 0 ? <div class="Createplay">
                                {
                                    this.starplay.map(k => {
                                        return (
                                            <div class="play-li van-hairline--bottom" key={k.id} onClick={() => {this.$emit('playCard', k)}}>
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    radius={5}
                                                    fit="cover"
                                                    src={k.coverImgUrl}
                                                ></Image>
                                                <div class="play-name">
                                                    <div class="name van-ellipsis">{k.name}</div>
                                                    <div class="nickname">{`${k.trackCount}首，by ${k.creator.nickname}`}</div>
                                                </div>
                                                <div class="play-icon">
                                                    {this.sonplayid == k.id ?
                                                        this.play ?
                                                          <Image width={20} height={20} src={play}></Image>
                                                        : <Image width={20} height={20} src={stop}></Image>
                                                    : null}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> : <div class="Createplay">
                                <Empty message="您还没有收藏歌单噢"></Empty>
                            </div>}
                        </div>
                    </CollapseItem>
                </Collapse>
            </div>
        )
    }
}
</script>

<style lang="less">
.Userplay {
    overflow: hidden;
    margin-top: 24px;
    .van-collapse-item__content {
        padding: 0 16px;
    }
    .Createplay {
        overflow: hidden;
        padding: 24px 0;
        .van-hairline--bottom {
            &:last-child::after {
                border: none;
            }
        }
        .play-li {
            display: flex;
            padding: 14px 0;
        }
        .play-name {
            flex: 1;
            margin: 0 24px 0 24px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            .name {
                font-size: 16PX;
                color: #333333;
            }
            .nickname {
                font-size: 12PX;
            }
        }
        .play-icon {
            width: 50PX;
            height: 50PX;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>