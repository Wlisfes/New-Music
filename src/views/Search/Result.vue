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
import { ResultHeader,Single,Songlist,Singer,Album } from '@/components/search';
export default {
    name: 'Result',
    data () {
        return {
            active: 0
        }
    },
    render() {
        const { keywords } = this.$route.params
        return (
            <transition name="result" appear>
                <Root class="Result">
                    <ResultHeader value={keywords}></ResultHeader>
                    <Root class="Tabs-Common">
                        <Tabs
                            active={this.active}
                            animated={true}
                            swipeable={true}
                            onChange={(active) => {this.active = active}}
                        >
                            <Tab title="单曲">
                                <Root.Container>
                                    <keep-alive>
                                        {(this.active === 0) && (<Single keywords={keywords}></Single>)}
                                    </keep-alive>
                                </Root.Container>
                            </Tab>
                            <Tab title="歌单">
                                <Root.Container>
                                    <keep-alive>
                                        {(this.active === 1) && (<Songlist keywords={keywords}></Songlist>)}
                                    </keep-alive>
                                </Root.Container>
                            </Tab>
                            <Tab title="歌手">
                                <Root.Container>
                                    <keep-alive>
                                        {(this.active === 2) && (<Singer keywords={keywords}></Singer>)}
                                    </keep-alive>
                                </Root.Container>
                            </Tab>
                            <Tab title="专辑">
                                <Root.Container>
                                    <keep-alive>
                                        {(this.active === 3) && (<Album keywords={keywords}></Album>)}
                                    </keep-alive>
                                </Root.Container>
                            </Tab>
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