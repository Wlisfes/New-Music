/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:03:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-04 23:27:15
 * @Description: 歌单列表
 */

<script>
import { Root,SonplayCard } from '@/components/common';
export default {
    name: 'Sonplay',
    data () {
        return {
            picUrl: '',      //背景图片
        }
    },
    created () {
        setTimeout(() => {
            this.playlistdetail()
        }, 1000)
    },
    methods: {
        //详情
        async playlistdetail() {
            const [err, res] = await this.api.playlistdetail({
                id: this.$route.params.id
            })
            if(!err && res.code === 200) {
                const { coverImgUrl } = res.playlist


                this.picUrl = coverImgUrl
            }
        }
    },
    render() {
        return (
            <transition name="sonplay" appear>
                <Root class="Sonplay">
                    <Root.Header
                        title="慈悲放生"
                        onBack={() => {this.$router.back()}}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={true}>
                        <Root.Container>
                            <SonplayCard
                                picUrl={this.picUrl}
                            ></SonplayCard>
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
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    // background-color: #ffffff;
    background-color: #3D3D3F;
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: 50%;
    // transform: scale(1.5);
    // filter: blur(20px);
    // &::after {
    //     content: "";
    //     position: absolute;
    //     background-color: #3D3D3F;
    //     left: 0;
    //     top: 0;
    //     right: 0;
    //     bottom: 0;
    // }
    
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
}
</style>