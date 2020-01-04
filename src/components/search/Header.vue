/*
 * @Author: 情雨随风 
 * @Date: 2019-12-29 21:06:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 22:30:04
 * @Description: 搜索栏
 */


<script>
import { Search } from 'vant';
export default {
    name: 'Search-Header',
    props: {
        value: {
            type: [Number, String]
        }
    },
    methods: {
        search() {
            // console.log(this.$refs.search.getElementsByTagName('input')[0])
            return this.$refs.search.querySelector("[type='search']")
        }
    },
    render() {
        return (
            <div class="van-Search-Header">
                <div class="van-Search-Header-center">
                    <form action="/">
                        <Search
                            ref="search"
                            shape="round"
                            placeholder="请输入搜索关键词"
                            style={{padding: '0'}}
                            show-action={true}
                            value={this.value}
                            autofocus={true}
                            clearable={true}
                            onInput={(value) => {this.$emit('input', value)}}
                            onSearch={(value) => {this.$emit('search', value)}}
                            onClear={() => this.$emit('input', '')}
                            onCancel={() => {this.$emit('click-left')}}
                        ></Search>
                    </form>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.van-Search-Header {
    height: 46px;
    position: relative;
    overflow: hidden;
    display: flex;
    margin: 0 10px;
    &-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>