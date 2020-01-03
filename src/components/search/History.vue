<!--
 * @Date: 2019-12-30 14:18:13
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-03 14:33:50
 * @Description: 搜索历史
 -->


<script>
import BScroll from "better-scroll";
import { Icon,Dialog } from 'vant';

let timer, lastTime;
let now = +new Date();

export default {
    name: 'History',
    props: {
        wrapper: {
            type: Array,
            default: () => []
        }
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                this.initBscroll()
            }, 100)
        })
    },
    methods: {
        initBscroll() {
            //计算子元素的宽度总和
            var Container = this.$refs.Container.children
            var width = 0
            for(let i = 0; i < Container.length; i++) {
                width += (Container[i].offsetWidth + 10)
            }
            //把子元素的总宽度和设置为Container的宽度
            this.$refs.Container.style.width = `${Math.ceil(width - 10)}px`

            //初始化BScroll插件
            if(!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper ,{
                    probeType: 1,
                    scrollX: true,
                    scrollY: false,
                    momentum: true,
                    click: true
                })
            }
            else {
                this.scroll.refresh()
            }
        },
        //删除历史记录
        handelDelete() {
            const self = this
            Dialog.confirm({
                title: '温馨提示',
                message: '确定清空历史记录吗？',
                className: 'SignoutConfirm',
                cancelButtonColor: '#444444',
                confirmButtonColor: '#ee0a24',
                async beforeClose(action, done) {
                    if (action !== 'confirm') {
                        done();
                        return;
                    }
                    setTimeout(() => {
                        done()
                        self.$emit('delete')
                    }, 500);
                }
            }).catch(e => {})
        },
        //选择某个历史记录 此处启用节流操作
        handelStory(keywords) {
            if (lastTime && now - lastTime < 200) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    this.$emit('story', keywords)
                    lastTime = +new Date();
                }, 20);
            }
            else {
                lastTime = now;
                timer = setTimeout(() => {
                    this.$emit('story', keywords)
                    lastTime = +new Date();
                }, 20);
            }
        }
    },
    watch: {
        wrapper: {
            handler() {
                setTimeout(() => {
                    this.scroll && this.initBscroll()
                }, 60)
            },
            deep: true
        }
    },
    render() {
        return (
            <div class="History">
                <div class="History-van-title">
                    <div class="title">搜索历史</div>
                    <Icon
                        name="delete"
                        size={20}
                        color="#b1b1b1"
                        style={{padding: '10px', cursor: 'pointer'}}
                        onClick={this.handelDelete}
                    />
                </div>
                <div ref="wrapper" class="van-wrapper">
                    <div class="van-wrapper-Container" ref="Container">
                        {
                            this.wrapper.map((k, index) => {
                                return (
                                    <div
                                        key={k.new}
                                        class="van-wrapper-button"
                                        onClick={(e) => {this.handelStory(k.keywords)}}
                                    >{k.keywords}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.History {
    margin-bottom: 24px;
    &-van-title {
        font-weight: 500;
        display: flex;
        align-items: center;
        .title {
            flex: 1;
            font-size: 14px;
            color: #000000;
        }
    }
    .van-wrapper {
        height: 30px;
        width: 100%;
        overflow: hidden;
        .van-wrapper-Container {
            display: flex;
            width: 100%;
            height: 30px;
        }
        &-button{
            color: '#444444';
            background-color: #f7f8fa;
            font-size: 14px;
            white-space: nowrap;
            padding: 0 10px;
            display: flex;
            align-items: center;
            margin-right: 10px;
            border-radius: 15px;
            cursor: pointer;
        }
    }
}
</style>