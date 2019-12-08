<script>
import { Player } from '@/components/player';
export default {
    name: 'App',
    render() {
        return (
            <div id="app">
                <router-view></router-view>
                <Player></Player>
            </div>
        )
    }
}
</script>