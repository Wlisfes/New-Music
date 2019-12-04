/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:03:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-04 23:27:15
 * @Description: 歌单列表
 */

<script>
import { Root } from '@/components/common';
export default {
    name: 'Sonplay',
    created () {
        console.log(this.$route.query)  
    },
    render() {
        return (
            <transition name="sonplay" appear>
                <Root class="Sonplay">
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={true}>
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
.sonplay-enter-active, .sonplay-leave-active {
    transition: all 300ms;
}
.sonplay-enter, .sonplay-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Sonplay {
    width: 10rem;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: #ffffff;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
}
</style>