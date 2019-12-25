<script>
import { Audio } from '@/components/player';
export default {
    name: 'App',
    render() {
        return (
            <div id="app">
                <router-view></router-view>
                <Audio></Audio>
            </div>
        )
    }
}
</script>