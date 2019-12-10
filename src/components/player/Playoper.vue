<script>
import { Row,Col,Icon } from 'vant';

import random from '@assets/icon/random.svg';
import tbeat from '@assets/icon/tbeat.svg';
import loop from '@assets/icon/loop.svg';
import order from '@assets/icon/order.svg';
import playrc from '@assets/icon/playrc.svg';
export default {
    name: 'Playoper',
    render() {
        return (
            <div class="Playoper">
                <Row style={{margin: '0 24px'}}>
                    <Col span={4}>
                        <Icon name={order} size={32} />
                    </Col>
                    <Col span={5}>
                        <Icon name="arrow-left" size={32} color="#ffffff" />
                    </Col>
                    <Col span={6}>
                        <Icon name="play-circle-o" size={48} color="#ffffff" />
                    </Col>
                    <Col span={5}>
                        <Icon name="arrow" size={32} color="#ffffff" />
                    </Col>
                    <Col span={4}>
                        <Icon name={playrc} size={32} />
                    </Col>
                </Row>
            </div>
        )
    }
}
</script>

<style lang="less">
.Playoper {
    margin-bottom: 80px;
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