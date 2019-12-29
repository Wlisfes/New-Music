/*
 * @Author: 情雨随风 
 * @Date: 2019-12-29 21:06:49 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 22:30:04
 * @Description: 搜索栏
 */


<script>
import { Icon,Search } from 'vant';
export default {
    name: 'Search-Header',
    data () {
        return {
            action: false,      //搜索框是否聚焦
            value: '',          //搜索值
        }
    },
    methods: {
        handelfocus() {
            this.action = true
        },
        handelblur() {
            this.action = !!this.value
        },
        handelsearch() {

        }
    },
    render() {
        return (
            <div class="van-Search-Header">
                <div class="van-Search-Header-left">
                    <Icon
                        color="#323233"
                        name="arrow-left"
                        size={22}
                        style={{padding: '10px'}}
                        onClick={() => {this.$emit('click-left')}}
                    ></Icon>
                </div>
                <div class="van-Search-Header-center">
                    <form action="/">
                        <Search
                            shape="round"
                            placeholder="请输入搜索关键词"
                            style={{padding: '0'}}
                            show-action={this.action}
                            value={this.value}
                            clearable={false}
                            onInput={value => {this.value = value}}
                            onFocus={this.handelfocus}
                            onBlur={this.handelblur}
                            onSearch={this.handelsearch}
                            onCancel={this.handelblur}
                        ></Search>
                    </form>
                </div>
                {false && <div class="van-Search-Header-right">
                    <Icon
                        size={20}
                        style={{padding: '10px'}}
                        name={this.play ? play : stop}
                        onClick={() => {this.$emit('click-left')}}
                    ></Icon>
                </div>}
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
    &-left,&-right {
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