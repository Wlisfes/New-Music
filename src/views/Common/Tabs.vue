<!--
 * @Date: 2019-12-05 14:24:54
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-12-05 15:16:07
 * @Description: 首页组合分页
 -->

<script>
import { Tab,Tabs,Swipe,SwipeItem } from 'vant';
import { Root } from '@/components/common';
import Recommend from '@views/Common/Recommend';
import User from '@views/Common/User';
import Singer from '@views/Common/Singer';
export default {
    name: 'Tabs',
    props: {
        active: {
            type: Number,
            default: 0
        }
    },
    render() {
        return (
            <div class="Tabs">
                {<Tabs
                    active={this.active}
                    animated={true}
                    swipeable={true}
                    onChange={(index) => {this.$emit('change', index)}}
                >
                    <Tab>
                        <Root.Container>
                            <keep-alive>
                                <Recommend></Recommend>
                            </keep-alive>
                        </Root.Container>
                    </Tab>
                    <Tab>
                        <Root.Container>
                            <keep-alive>
                                <User></User>
                            </keep-alive>
                        </Root.Container>
                    </Tab>
                    <Tab>
                        <Root.Container>
                            <keep-alive>
                                <Singer></Singer>
                            </keep-alive>
                        </Root.Container>
                    </Tab>
                </Tabs>}
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Tabs {
    flex: 1;
    overflow: hidden;
    /deep/ .van-tabs--line {
        height: 0;
    }
    /deep/ .van-tabs__wrap  {
        height: 0;
    }
    /deep/ .van-tabs,
    /deep/ .van-tabs__content,
    /deep/ .van-tab__pane{
        height: 100%;
        overflow: hidden;
    }
    .Container {
        height: 100%;
    }
}
</style>