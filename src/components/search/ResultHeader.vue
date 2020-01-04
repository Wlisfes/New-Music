<!--
 * @Date: 2020-01-04 11:49:11
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2020-01-04 13:03:34
 * @Description: 只读搜索框
 -->


<script>
import { Search,Icon } from 'vant';
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
            this.vm.$emit('revise', this.value)
            this.$router.back()
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
                            value={this.value}
                            readonly={true}
                            clearable={true}
                            onClick={this.handelrevise}
                        ></Search>
                    </form>
                </div>
            </div>
        )
    }
}

export default Header;
</script>

<style lang="less" scoped>
.van-Result-Header {
    height: 46px;
    position: relative;
    overflow: hidden;
    display: flex;
    margin: 0 10px;
    &-left {
        width: 46px;
        height: 46px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    &-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>