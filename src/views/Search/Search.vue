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
import { Header,Hot,Suggest } from '@/components/search';
export default {
    name: 'Search',
    data () {
        return {
            wrappers: [],

            value: '',     //搜索关键字
        }
    },
    methods: {
        //搜索框input事件
        hanldeinput(value) {
            this.value = value
        },
        //搜索事件
        handelsearch(keywords) {
            //此次需要清空value
            if(this.value) {
                this.value = ''
            }
            this.handelDeposit(keywords)
        },
        //搜索记录存入
        handelDeposit(keywords) {
            const inlist = this.$ls.get('searchHistory')
            if(inlist) {
                const newlist = inlist.filter(k => keywords !== k.keywords)
                    newlist.unshift({
                        new: new Date().getTime(),
                        keywords: keywords
                    })
                this.$ls.set('searchHistory', newlist)
            }
            else {
                this.$ls.set('searchHistory', [{
                    new: new Date().getTime(),
                    keywords: keywords
                }])
            }
            this.vm.$emit('searchHistory')
        }
    },
    render() {
        return (
            <transition name="search" appear>
                <Root class="Search">
                    <Header
                        value={this.value}
                        onClick-left={() => {this.$router.back()}}
                        onInput={this.hanldeinput}
                    ></Header>
                    <keep-alive>
                        {
                            this.value ? (
                                <Suggest
                                    value={this.value}
                                    onSearch={this.handelsearch}
                                ></Suggest>
                            ) : (
                                <Hot onSearch={this.handelsearch}></Hot>
                            )
                        }
                    </keep-alive>
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
}
</style>