/*
 * @Author: 情雨随风 
 * @Date: 2020-01-01 16:13:01 
 * @Last Modifiedby: 情雨随风 
 * @Last Modifiedtime: 2020-01-01 16:13:01 
 * @Description: 搜索结果
 */


<script>
import { Tabs,Tab } from 'vant';
import { Root } from '@/components/common';
import { ResultHeader,Single } from '@/components/search';
export default {
    name: 'Result',
    render() {
        const { keywords } = this.$route.params
        return (
            <transition name="result" appear>
                <Root class="Result">
                    <ResultHeader value={keywords}></ResultHeader>
                    <Root class="Tabs-Common">
                        <Tabs
                            animated={true}
                            swipeable={true}
                            onChange={(index) => {console.log(index)}}
                        >
                            <Tab title="单曲">
                                <Root.Container>
                                    <keep-alive>
                                        <Single keywords={keywords}></Single>
                                    </keep-alive>
                                </Root.Container>
                            </Tab>
                            <Tab title="歌单"></Tab>
                            <Tab title="歌手"></Tab>
                            <Tab title="专辑"></Tab>
                        </Tabs>
                    </Root>
                    <router-view></router-view>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.result-enter-active,.result-leave-active {
    transition: all 300ms;
}
.result-enter,.result-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Result {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
}
.Tabs-Common {
    /deep/ .van-tabs__wrap {
        &::after {
            border-top-width: 0;
        }
    }
    /deep/ .van-tabs {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    /deep/ .van-tabs__content {
        flex: 1;
        overflow: hidden;
    }
    /deep/ .van-tab__pane {
        height: 100%;
        overflow: hidden;
    }
    .Container {
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
}
</style>