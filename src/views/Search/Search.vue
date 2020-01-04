/*
 * @Author: 情雨随风 
 * @Date: 2019-12-29 20:53:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-01-01 16:14:37
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
    mounted () {
        this.vm.$on('revise', this.handelrevise)  
    },
    methods: {
        handelrevise(value) {
            this.value = value
            this.$refs.headers.search().focus()
        },
        //搜索事件
        handelsearch(keywords) {
            this.value = ''
            this.$router.push(`/search/${keywords}`)
            this.handelDeposit(keywords)

            this.$refs.headers.search().blur()
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
                        ref="headers"
                        value={this.value}
                        onClick-left={() => {this.$router.back()}}
                        onInput={(value) => {this.value = value}}
                        onSearch={(value) => {this.handelsearch(value)}}
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

                    <router-view></router-view>
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
}
</style>