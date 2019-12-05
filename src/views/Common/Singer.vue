/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:01:48 
 * @Last Modified by:  情雨随风 
 * @Last Modified time: 2019-12-04 23:01:48 
 * @Description: 歌手
 */

<script>
import pinyin from 'pinyin';
import { Image } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Singer',
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            singers: [],       //歌手
            rootY: 0,          //滚动位置
            singerHeight: [],  //栏目位置
            currentIndex: 0,   //初始栏目
        }
    },
    created () {
        this.playsinger()
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                this.calcSingerHeight()
            }, 500)
        })  
    },
    methods: {
        //歌手
        async playsinger() {
            const [err, res] = await this.api.playsinger({ limit: 100 })
            if(!err && res.code === 200) {
                const singer = res.list.artists.map(k => {
                    const py = pinyin(k.name[0], {
                        style: pinyin.STYLE_FIRST_LETTER
                    })
                    k.initial = py[0][0].toUpperCase();
                    return k;
                })

                const map = {
                    hot: {
                        title: '热',
                        item: []
                    }
                }
                singer.forEach((k, index) => {
                    if(index < 10) {
                        map.hot.item.push(k)
                    }
                    else {
                        if(!map[k.initial]) {
                            map[k.initial] = {
                                title: k.initial,
                                item: []
                            }
                        }
                        map[k.initial].item.push(k)
                    }
                })

                const hot = []
                const ret = []
                for(const key in map) {
                    const val = map[key]
                    if (val.title.match(/[A-Z]/)) {
                        ret.push(val)
                    }
                    else if (val.title === '热') {
                        hot.push(val)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                this.singers = hot.concat(ret)
            }
        },
        //监听滚动事件
        wrapperScroll(ops) {
            this.rootY = ops.y
        },
        calcSingerHeight() {
            const dom = this.$refs.singer
            const ref = dom && dom.children || []
            let y = 0;
            this.singerHeight.push(y)
            for(let i = 0; i < ref.length; i++) {
                y += ref[i].clientHeight
                this.singerHeight.push(y)
            }
        },
        //移动到对应栏目
        handelmobile(index) {
            this.$refs.wrapper.scrollTo(0, -this.singerHeight[index] - 1, 500)
        }
    },
    watch: {
        rootY(newVal) {
            const singer = this.singerHeight
            if(newVal > 0) {
                this.currentIndex = 0;
                return
            }
            for(let i = 0; i < singer.length; i++) {
                const prev = singer[i]
                const next = singer[i + 1]
                if(-newVal > prev && -newVal < next) {
                    this.currentIndex = i;
                }
            }
        },
        active(newVal) {
            newVal && this.$refs.wrapper.refresh()
        }
    },
    render() {
        return (
            <div class="Singer">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.singers}
                    probeType={3} listenScroll={true} bounce={false}
                    onScroll={this.wrapperScroll}
                >
                    <Root.Container>
                        {this.singers.length > 0 ? <div class="SingerContainer" ref="singer">
                            {this.singers.map((k, _) => {
                                return (
                                    <div class="singer-li" key={_}>
                                        <div class="singer-title">{k.title}</div>
                                        {k.item.map(v => {
                                            return (
                                                <div class="singer-item van-hairline--bottom" key={v.id}>
                                                    <Image
                                                        lazy-load={false}
                                                        radius={5}
                                                        width={62}
                                                        height={62}
                                                        src={`${v.img1v1Url}?param=200y200`}
                                                    ></Image>
                                                    <div class="singer-name">{v.name}{v.alias.join('、')}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div> : <Loading margin="24px"></Loading>}
                    </Root.Container>
                </Root.Scroll>

                {this.singers.length > 0 && <div class="singer">
                    {this.singers.map((k, index) => {
                        const active = this.currentIndex === index
                        return (
                            <div
                            class="singer-name"
                            key={index}
                            style={{color: active ? '#ee0a24' : '#333333'}}
                            onClick={() => {this.handelmobile(index)}}
                            >{k.title}</div>
                        )
                    })}
                </div>}
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Singer {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
    .Container {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .SingerContainer {
        margin-bottom: 64px;
        .singer-li {
            background-color: #ffffff;
            padding-bottom: 24px;
        }
        .singer-title {
            font-size: 14PX;
            line-height: 32PX;
            color: #333333;
            padding-left: 12px;
            background-color: #fde9e9;
            margin-bottom: 12px;
        }
        .singer-item {
            display: flex;
            margin: 0 12px;
            padding: 12px 0;
            align-items: center;
        }
        .singer-name {
            flex: 1;
            font-size: 14PX;
            color: #333333;
            margin: 0 64px 0 24px;
        }
    }
    .singer {
        position: absolute;
        right: 16px;
        top: 100px;
        .singer-name {
            width: 44px;
            height: 44px;
            font-size: 14PX;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>