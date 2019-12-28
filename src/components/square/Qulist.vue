<script>
import { Row,Col,Icon } from 'vant';
export default {
    name: 'Qulist',
    props: {
        inlist: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return (
            <div class="Qulist">
                <Row gutter={10}>
                    {this.inlist.map(k => {
                        return (
                            <Col span={8} key={k.id}>
                                <div class="picUrl">
                                    <div class="picUrl-icon">
                                        <img class="picUrl-image-icon" src={`${k.coverImgUrl}?param=400y400`} />
                                    </div>
                                    <div class="playCount">
                                        <Icon name="play" size={14} color="#ffffff" />
                                        <div class="Count">{this.utils.playCount(k.playCount)}</div>
                                    </div>
                                </div>
                                <div class="Qulist-Context van-multi-ellipsis--l2">{k.name}</div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}
</script>

<style lang="less">
.Qulist {
    margin: 0 24px;
    .van-col {
        margin-bottom: 20px;
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
        }
        .Count {
            font-size: 12PX;
            color: #ffffff;
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