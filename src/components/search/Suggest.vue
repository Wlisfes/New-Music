<!--
 * @Date: 2019-12-30 16:24:02
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2019-12-30 17:25:18
 * @Description: 搜索建议
 -->


<script>
import { Icon } from 'vant';
import { Root } from '@/components/common';
export default {
    name: 'Suggest',
    props: {
        value: {
            type: [Number, String],
            default: ''
        }
    },
    data () {
        return {
            wrappers: []
        }
    },
    methods: {
        //搜索建议
        async searchSuggest() {
            const [err, res] = await this.api.searchSuggest({
                type: 'mobile',
                keywords: this.value
            })
            if(!err && (res.code === 200 && res.result.allMatch)) {
                this.wrappers = res.result.allMatch
            }
        },
    },
    watch: {
        value: {
            handler(newVal) {
                newVal && this.searchSuggest()
            },
            immediate: true
        }
    },
    render() {
        return (
            <Root class="Suggest">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers}>
                    <Root.Container>
                        <div class="Suggest-van-title van-hairline--bottom">{`搜索 “${this.value}”`}</div>
                        {(this.wrappers.length > 0) && <div class="Suggest-list">
                            {
                                this.wrappers.map((k, index) => {
                                    return (
                                        <div class="van-item-Content" key={index} onClick={() => {this.$emit('search', k.keyword)}}>
                                            <Icon name="search" size={20} color="#a9a9a9"></Icon>
                                            <div class="van-Content van-hairline--bottom">{k.keyword}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                    </Root.Container>
                </Root.Scroll>
            </Root>
        )
    }
}
</script>

<style lang="less">
.Suggest {
    margin-left: 24px;
    .wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 101%;
            overflow: hidden; 
            display: flex;
            flex-direction: column;
        }
    }
    &-van-title {
        font-size: 14px;
        color: #5384b5;
        height: 40px;
        display: flex;
        align-items: center;
        margin-top: 12px;
    }
    &-list {
        margin-bottom: 40px;
        .van-item-Content {
            height: 40px;
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 5px 0;
        }
        .van-Content {
            flex: 1;
            height: 40px;
            margin-left: 10px;
            font-size: 14px;
            display: flex;
            align-items: center;
        }
    }
}
</style>