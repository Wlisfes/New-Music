<script>
export default {
    name: 'Player',
    render() {
        return (
            <transition name="player" appear>
                <div class="Player">
                
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