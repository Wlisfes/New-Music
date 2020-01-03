/*
 * @Author: 情雨随风 
 * @Date: 2020-01-01 16:13:01 
 * @Last Modifiedby: 情雨随风 
 * @Last Modifiedtime: 2020-01-01 16:13:01 
 * @Description: 搜索结果
 */


<script>
import { Search,Icon } from 'vant';
import { Root } from '@/components/common';

const Header = {
    name: 'Result-Header',
    props: {
        value: {
            type: [Number, String]
        }
    },
    methods: {
        //搜索框修改
        handelrevise() {
            this.vm.$emit('revise', this.$route.params.keywords)
        }  
    },
    render() {
        return (
            <div class="van-Result-Header">
                <div class="van-Result-Header-left" onClick={() => {this.$router.back()}}>
                    <Icon
                        color="#323233"
                        size={22}
                        name="arrow-left"
                        style={{padding: '10px'}}
                    />
                </div>
                <div class="van-Result-Header-center">
                    <form action="/">
                        <Search
                            shape="round"
                            placeholder="请输入搜索关键词"
                            style={{padding: '0'}}
                            value={this.$route.params.keywords}
                            readonly={false}
                            clearable={true}
                            onClick={this.handelrevise}
                        ></Search>
                    </form>
                </div>
            </div>
        )
    }
}
export default {
    name: 'Result',
    created () {
        console.log(this.$route.params.keywords)  
    },
    render() {
        return (
            <transition name="result" appear>
                <Root class="Result">
                    <Header></Header>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.result-enter-active,.result-leave-active {
    transition: all 300ms;
}
.result-enter,.result-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Result {
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





.van-Result-Header {
    height: 46px;
    position: relative;
    overflow: hidden;
    display: flex;
    margin: 0 10px;
    /deep/ &-left {
        width: 46px;
        height: 46px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    /deep/ &-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>