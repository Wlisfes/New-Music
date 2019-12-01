<script>
import { mapState } from 'vuex';
import { Player } from '@/components/player';
export default {
    name: 'App',
    computed: {
        ...mapState({
            player: state => state.app.player
        })  
    },
    render() {
        return (
            <div id="app">
                <router-view></router-view>

                {this.player && <Player></Player>}
            </div>
        )
    }
}
</script>