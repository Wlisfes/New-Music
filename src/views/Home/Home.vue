<script>
import { Root } from '@/components/common';
export default {
    name: 'Home',
    render() {
        return (
            <Root class="Home">
                <Root.Scroll class="wrapper">
                    <Root.Container>
                    
                    </Root.Container>
                </Root.Scroll>
            </Root>
        )
    }
}
</script>

<style lang="less" scoped>
.Home {
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
}
</style>