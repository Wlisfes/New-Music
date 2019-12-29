/*
 * @Author: 情雨随风 
 * @Date: 2019-12-29 20:53:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 22:41:01
 * @Description: 搜索
 */


<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Header } from '@/components/search';
export default {
    name: 'Search',
    data () {
        return {
            wrappers: []
        }
    },
    created () {
        setTimeout(() => {
            this.searchSuggest()
        }, 500)
    },
    methods: {
        async searchSuggest() {
            const [err, res] = await this.api.searchSuggest({
                type: 'mobile',
                keywords: '刀剑'
            })
            if(!err && res.code === 200) {
                console.log(res)
            }
        }  
    },
    render() {
        return (
            <transition name="search" appear>
                <Root class="Search">
                    <Header
                        onClick-left={() => {this.$router.back()}}
                    ></Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>

                        </Root.Container>
                    </Root.Scroll>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.search-enter-active,.search-leave-active {
    transition: all 300ms;
}
.search-enter,.search-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Search {
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
}
</style>