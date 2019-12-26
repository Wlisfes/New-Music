/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:03:51 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-26 22:02:14
 * @Description: 首页卡片组件
 */

<script>
import { Grid,GridItem,Icon } from 'vant';
export default {
    name: 'LayoutCard',
    data () {
        return {
            layout: [
                { text: '每日推荐', icon: 'fire-o', grid: 1 },
                { text: '歌单', icon: 'music-o', grid: 2 },
                { text: '排行榜', icon: 'bar-chart-o', grid: 3 },
                { text: '电台', icon: 'service-o', grid: 4 }
            ]
        }
    },
    render() {
        const style = {marginBottom: '5px'}
        return (
            <div class="LayoutCard van-hairline--bottom" style={{margin: '10px 0'}}>
                <Grid square gutter={10} border={false} icon-size={34} clickable={false}>
                    {this.layout.map(k => {
                        return (
                            <GridItem
                                text={k.text}
                                key={k.grid}
                                style={{cursor: 'pointer'}}
                                onClick={() => {this.$emit('layout', k.grid)}}
                            >
                                <Icon
                                    slot="icon"
                                    name={k.icon}
                                    color="#ee0a24"
                                    size={34}
                                    style={style}
                                ></Icon>
                            </GridItem>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}
</script>

<style lang="less">

</style>