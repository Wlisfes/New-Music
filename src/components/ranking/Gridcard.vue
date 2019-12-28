<script>
import { Row,Col } from 'vant';
export default {
    name: 'Gridcard',
    props: {
        gridlist: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: '推荐榜'
        }
    },
    render() {
        return (
            <div class="Gridcard">
                <div class="Gridcard-Header">{this.title}</div>
                <div class="Gridcard-ListCard">
                    <Row gutter={10}>
                        {this.gridlist.map(k => {
                            return (
                                <Col span={8} key={k.id} onClick={() => {this.$emit('playCard', k)}}>
                                    <div class="picUrl">
                                        <div class="picUrl-icon">
                                            <img class="picUrl-image-icon" src={`${k.coverImgUrl}?param=400y400`} />
                                        </div>
                                        <div class="van-update">{k.updateFrequency}</div>
                                    </div>
                                    <div class="Context van-ellipsis">{k.name}</div>
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
.Gridcard {
    overflow: hidden;
    &-Header {
        height: 45PX;
        display: flex;
        align-items: center;
        margin: 16px 24px 0;
        color: #333333;
        font-size: 16PX;
        font-weight: 600;
    }
    &-ListCard {
        margin: 0 24px;
        .van-col {
            cursor: pointer;
            margin-bottom: 20px;
        }
        .picUrl {
            overflow: hidden;
            position: relative;
            border-radius: 8px;
            .van-update {
                font-size: 12px;
                color: #ffffff;
                position: absolute;
                left: 5px;
                bottom: 5px;
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
        .Context {
            font-size: 12PX;
            color: #333333;
            line-height: 1.4;
            margin-top: 10px;
        }
    }
}
</style>