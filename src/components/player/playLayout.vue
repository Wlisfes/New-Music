<script>
import { Row,Col,Icon } from 'vant';
export default {
    name: 'playLayout',
    render() {
        return (
            <div class="playLayout">
                <Row style={{margin: '0 24px'}}>
                    <Col span={6}>
                        <Icon name="like-o" color="#ffffff" size={20} />
                    </Col>
                    <Col span={6}>
                        <Icon name="fire-o" size={20} color="#ffffff" />
                    </Col>
                    <Col span={6}>
                        <Icon name="chat-o" size={20} info="9" color="#ffffff" />
                    </Col>
                    <Col span={6}>
                        <Icon name="ellipsis" size={20} color="#ffffff" />
                    </Col>
                </Row>
            </div>
        )
    }
}
</script>

<style lang="less">
.playLayout {
    margin-bottom: 48px;
    .van-row {
        display: flex;
        align-items: center;
        .van-col {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>