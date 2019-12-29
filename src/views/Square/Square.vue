<!--
 * @Date: 2019-12-28 17:05:43
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2019-12-28 17:53:09
 * @Description: 歌单广场
 -->


<script>
import { mapState } from 'vuex';
import { Tabs,Tab } from 'vant';
import { Root,PlayCard } from '@/components/common';
import { QuRoot } from '@/components/square';
export default {
    name: 'Square',
    computed: {
        ...mapState({
            play: state => state.howler.play
        })
    },
    data () {
        return {
            active: 0,
            tabsOption: [
                { title: '推荐', banner: true },
                { title: '官方', banner: false },
                { title: '精品', banner: false },
                { title: '华语', banner: false },
                { title: '古风', banner: false },
                { title: '流行', banner: false },
                { title: '轻音乐', banner: false },
                { title: '电子', banner: false },
            ]
        }
    },
    render() {
        return (
            <transition name="square" appear>
                <Root class="Square">
                    <Root.Header
                        color="#ffffff"
                        iconColor="#323233"
                        title='歌单广场'
                        play={this.play}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={() => {this.$router.push(`/square/player`)}}
                    ></Root.Header>
                    <Root>
                        <Tabs
                            animated={true}
                            swipe-threshold={5}
                            swipeable={true}
                            lazy-render={false}
                            onChange={(active) => {this.active = active}}
                        >
                            {
                                this.tabsOption.map((k, active) => {
                                    return (
                                        <Tab title={k.title} key={active}>
                                            <Root>
                                                <keep-alive>
                                                    {
                                                        (this.active  === active) &&
                                                        <QuRoot
                                                            banner={k.banner}
                                                            cat={k.title === '推荐' ? '全部' : k.title}
                                                        ></QuRoot>}
                                                </keep-alive>
                                            </Root>
                                        </Tab>
                                    )
                                })
                            }
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
.square-enter-active,.square-leave-active {
    transition: all 300ms;
}
.square-enter,.square-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Square {
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
    /deep/ .van-nav-bar__title {
        color: #323233;
        font-size: 16px;
    }
    .wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
    .van-tabs {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        /deep/ .van-hairline--top-bottom::after {
            border-top-width: 0px;
        }
        /deep/ .van-tabs__content {
            flex: 1;
            .van-tab__pane {
                height: 100%;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>