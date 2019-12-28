<!--
 * @Date: 2019-12-28 17:05:43
 * @Author: 情雨随风
 * @LastEditors  : 情雨随风
 * @LastEditTime : 2019-12-28 17:53:09
 * @Description: 歌单广场
 -->


<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Swiper } from '@/components/square';
export default {
    name: 'Square',
    computed: {
        ...mapState({
            play: state => state.howler.play
        })  
    },
    data () {
        return {
            banner: [],         //推荐轮播歌单
            wrappers: []
        }
    },
    created () {
        this.SquarePalylist()  
    },
    methods: {
        async SquarePalylist() {
            const [err, res] = await this.api.SquarePalylist()
            if(!err && res.code === 200) {
                res.playlists.forEach((element,index) => {
                    if(index < 3) {
                        this.banner.push(element)
                    }
                    
                })
            }
        }  
    },
    render() {
        return (
            <transition name="square" appear>
                <Root class="Square">
                    <Root.Header
                        color="#ffffff"
                        iconColor="#323233"
                        title='歌单广场'
                        play={this.play}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={() => {this.$router.push(`/ranking/player`)}}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>

                            <Swiper banner={this.banner}></Swiper>
                        </Root.Container>
                    </Root.Scroll>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.square-enter-active,.square-leave-active {
    transition: all 300ms;
}
.square-enter,.square-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Square {
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