<script>
import { mapState } from 'vuex';
import { Root,Header } from '@/components/common';
import { Recommend,User,Singer } from '@views/Common';
export default {
    name: 'Home',
    computed: {
        ...mapState({
            player: state => state.app.player,
            active: state => state.app.active
        })
    },
    methods: {
        handelplayerChange() {
            this.$store.commit('app/setPlayer', !this.player)
        }
    },
    render() {
        return (
            <Root class="Home">
                <Header
                    active={this.active}
                    onChange={(index) => {
                        this.$store.commit('app/setActive', index)
                    }}
                    onPlayer={this.handelplayerChange}
                />
                <keep-alive>
                    {this.active === 0 && <Recommend></Recommend>}
                    {this.active === 1 && <User></User>}
                    {this.active === 2 && <Singer></Singer>}
                </keep-alive>
                
                <router-view />
            </Root>
        )
    }
}
</script>

<style lang="less" scoped>

</style>