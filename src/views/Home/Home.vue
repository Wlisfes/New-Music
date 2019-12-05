/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:02:20 
 * @Last Modified by:  情雨随风 
 * @Last Modified time: 2019-12-04 23:02:20 
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
            player: state => state.app.player,
            active: state => state.app.active
        })
    },
    render() {
        const { keepAlive } = this.$route.meta.keepAlive || false
        return (
            <Root class="Home">
                <NavigaTion
                    active={this.active}
                    onChange={(index) => {
                        this.$store.commit('app/setActive', index)
                    }}
                    onPlayer={() => {
                        this.$store.commit('app/setPlayer', !this.player)
                    }}
                    onSearch={() => {
                        console.log('search')
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