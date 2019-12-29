/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:02:20 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 20:59:21
 * @Description: 首页
 */

<script>
import { mapState } from 'vuex';
import { Root,NavigaTion } from '@/components/common';
import { Tabs } from '@views/Common';
export default {
    name: 'Home',
    computed: {
        ...mapState({
            play: state => state.howler.play,
            active: state => state.app.active
        })
    },
    render() {
        const { keepAlive } = this.$route.meta.keepAlive || false
        return (
            <Root class="Home">
                <NavigaTion
                    active={this.active}
                    play={this.play}
                    onChange={(index) => {
                        this.$store.commit('app/setActive', index)
                    }}
                    onPlayer={() => {
                        this.$router.push('/player')
                    }}
                    onSearch={() => {
                        this.$router.push('/search')
                    }}
                />
                <Tabs
                    active={this.active}
                    onChange={(index) => {
                        this.$store.commit('app/setActive', index)
                    }}
                ></Tabs>
                
                <keep-alive>
                    {keepAlive && <router-view />}
                </keep-alive>
                {!keepAlive && <router-view />}
            </Root>
        )
    }
}
</script>

<style lang="less" scoped>

</style>