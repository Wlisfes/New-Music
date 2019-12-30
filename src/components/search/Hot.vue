<!--
 * @Date: 2019-12-30 11:15:48
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2019-12-30 13:51:08
 * @Description: 热搜榜
 -->


<script>
import { Image } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Hot',
    data () {
        return {
            hots: [],      //列表数据
            wrappers: [],
            loading: false
        }
    },
    created () {
        this.searchHot()  
    },
    methods: {
        //热搜榜
        async searchHot() {
            const [err, res] = await this.api.searchHot()
            if(!err && res.code === 200) {
                this.hots = this.hots.concat(res.data)
                this.wrappers = this.wrappers.concat(res.data)
            }
            this.loading = true
        }
    },
    render() {
        return (
            <Root class="Hot">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                    <Root.Container>
                        <div class="Hot-van-title">热搜榜</div>
                        <div class="Hot-list">
                            {
                                this.hots.map((k, index) => {
                                    const top = index < 3
                                    return (
                                        <div class="item-Content">
                                            <div class="van-item-index" style={{color: top ? '#ee0a24' : '#a9a9a9'}}>{index + 1}</div>
                                            <div class="Content">
                                                <div class="van-searchWord">
                                                    <div
                                                        class="word van-ellipsis"
                                                        style={{
                                                            color: top ? '#000000' : '#444444',
                                                            fontWeight: top ? 500 : 'normal'
                                                        }}
                                                    >{k.searchWord}</div>
                                                    {k.iconUrl && <Image
                                                        src={k.iconUrl}
                                                        width={24}
                                                        height={14}
                                                        style={{marginLeft: '5px'}}
                                                        fit="contain"
                                                    ></Image>}
                                                </div>
                                                <div class="van-searcContent">{k.content}</div>
                                            </div>
                                            <div class="van-item-score">{k.score}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Root.Container>
                </Root.Scroll>
            </Root>
        )
    }
}
</script>

<style lang="less">
.Hot {
    margin: 0 24px;
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
    &-van-title {
        font-size: 14px;
        color: #000000;
        margin-top: 12px;
    }
    &-list {
        margin-bottom: 40px;
        .item-Content {
            height: 44PX;
            margin: 24px 0;
            display: flex;
            align-items: center;
            overflow: hidden;
            cursor: pointer;
        }
        .van-item-index {
            font-size: 15px;
            font-weight: 600;
        }
        .van-item-score {
            font-size: 12px;
            color: #b1b1b1;
        }
        .Content {
            flex: 1;
            overflow: hidden;
            margin: 0 24px;
            .van-searchWord {
                display: flex;
                align-items: center;
                font-size: 15px;
            }
            .van-searcContent {
                font-size: 13px;
                color: #a9a9a9;
            }
        }
    }
}

</style>