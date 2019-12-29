<script>
import { Row,Col,Icon,Divider } from 'vant';
export default {
    name: 'Qulist',
    props: {
        inlist: {
            type: Array,
            default: () => []
        },
        more: {
            type: Boolean,
            default: false
        },
        cat: String
    },
    render() {
        return (
            <div class="Qulist">
                <Row gutter={10}>
                    {this.inlist.map((k, index) => {
                        return (
                            <Col span={8} key={`${k.id}-${index}`} onClick={() => {this.$emit('playCard', k)}}>
                                <div class="picUrl">
                                    <div class="picUrl-icon">
                                        <img class="picUrl-image-icon" src={this.utils.https(`${k.coverImgUrl}?param=400y400`)} />
                                    </div>
                                    <div class="playCount">
                                        <Icon name="play" size={14} color="#ffffff" />
                                        <div class="Count">{this.utils.playCount(k.playCount)}</div>
                                    </div>
                                    {(this.cat === '精品') && <div class="van-tique">
                                        <Icon
                                            name="fire-o"
                                            size={13}
                                            color="#ffffff"
                                            style={{transform: 'rotateZ(-45deg)',margin: '2px'}}
                                         />
                                    </div>}
                                </div>
                                <div class="Qulist-Context van-multi-ellipsis--l2">{k.name}</div>
                            </Col>
                        )
                    })}
                </Row>
                {
                    (this.inlist.length > 0 && this.more) && <Loading margin="0 24px 24px"></Loading>
                }
                {
                    (this.inlist.length > 0 && !this.more) && <Divider
                        dashed={true}
                        style={{color: '#ee0a24', borderColor: '#ee0a24', paddingBottom: '16px', marginTop: 0}}>
                            没有更多了
                    </Divider>
                }
            </div>
        )
    }
}
</script>

<style lang="less">
.Qulist {
    margin: 24px;
    .van-col {
        margin-bottom: 20px;
        cursor: pointer;
    }
    .picUrl {
        overflow: hidden;
        position: relative;
        border-radius: 8px;
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
        .van-tique {
            position: absolute;
            width: 22px;
            height: 22px;
            left: 0;
            top: 0;
            background: #efb000;
            border-bottom-right-radius: 22px;
        }
    }
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
    &-Context {
        font-size: 12PX;
        color: #333333;
        line-height: 1.4;
        height: 32PX;
        margin-top: 10px;
    }
}
</style>