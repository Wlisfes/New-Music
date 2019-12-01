<script>
import { Grid,GridItem } from 'vant';
export default {
    name: 'LayoutCard',
    render() {
        return (
            <div class="LayoutCard">
                <Grid square gutter={10}>
                    <GridItem icon="gem-o" text="文字"></GridItem>
                    <GridItem icon="gem-o" text="文字"></GridItem>
                    <GridItem icon="gem-o" text="文字"></GridItem>
                    <GridItem icon="gem-o" text="文字"></GridItem>
                </Grid>
            </div>
        )
    }
}
</script>

<style lang="less">
.LayoutCard {
    margin: 10PX 0;
}
</style>