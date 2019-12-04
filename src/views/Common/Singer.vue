<script>
import pinyin from 'pinyin';
import { Image } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Singer',
    data () {
        return {
            singers: [],     //歌手
            rootY: 0,        //滚动位置
        }
    },
    created () {
        this.playsinger()
    },
    mounted () {
        this.$nextTick(() => {
            // this.calcSingerHeight()
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
        wrapperScroll(e) {
            console.log(e)
        },
        calcSingerHeight() {
            this.singerHeight = []
            const ref = this.$refs.singer
            let y = 0;
            this.singerHeight.push(y)
            for(let i = 0; i < ref.length; i++) {
                let dom = ref[i]
                y += dom.clientHeight
                this.singerHeight.push(y)
            }
        }
    },
    render() {
        return (
            <div class="Singer">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.singers}
                    probeType={3} listenScroll={true}
                    onScroll={this.wrapperScroll}
                >
                    <Root.Container>
                        <div class="SingerContainer">
                            {this.singers.map((k, _) => {
                                return (
                                    <div class="singer-li" key={_} ref="singer">
                                        <div class="singer-title">{k.title}</div>
                                        {k.item.map(v => {
                                            return (
                                                <div class="singer-item van-hairline--bottom" key={v.id}>
                                                    <Image lazy-load radius={5} width={62} height={62} src={v.img1v1Url}></Image>
                                                    <div class="singer-name">{v.name}{v.alias.join('、')}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </Root.Container>
                </Root.Scroll>

                <div class="singer">
                    {this.singers.map((k, _) => {
                        return (
                            <div class="singer-name">{k.title}</div>
                        )
                    })}
                </div>
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
        background-color: #FAFAFA;
    }
    .SingerContainer {
        margin-bottom: 64px;
        .singer-li {
            background-color: #ffffff;
            padding-bottom: 24px;
        }
        .singer-title {
            font-size: 14PX;
            line-height: 24PX;
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
            color: #333333;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>