<script>
import { mapState } from 'vuex';
export default {
    name: 'Player',
    computed: {
        ...mapState({
            player: state => state.app.player
        })  
    },
    methods: {
        handelplay() {
            this.$store.commit('app/setPlayer', !this.player)
        }
    },
    render() {
        return (
            <transition name="player" appear>
                <div class="Player" onClick={this.handelplay}>
                
                </div>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.player-enter-active, .player-leave-active {
    transition: all 300ms;
}
.player-enter, .player-leave-to {
    opacity: 0;
}
.Player {
    position: fixed;
    width: 750px;
    height: 100vh;
    top: 0;
    z-index: 100;
    background-color: red;
}
</style>