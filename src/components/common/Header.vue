<script>
import { Icon,Tab,Tabs } from 'vant';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Header',
    props: {
        active: {
            type: Number,
            default: 0
        }
    },
    render() {
        return (
            <div class="Header">
                <div class="Search" onClick={() => {this.$emit('search')}}>
                    <Icon name="search" size={24}></Icon>
                </div>
                <div class="Center">
                    <div class="Center-Container">
                        <Tabs type="card" active={this.active} onChange={(index) => {this.$emit('change', index)}}>
                            <Tab title="推荐"></Tab>
                            <Tab title="我的"></Tab>
                            <Tab title="歌手"></Tab>
                        </Tabs>
                    </div>
                </div>
                <div class="Status" onClick={() => {this.$emit('player')}}>
                    <Icon name={play} size={20}></Icon>
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.Header {
    height: 44PX;
    display: flex;
    align-items: center;
    .Search,.Status {
        width: 44PX;
        height: 44PX;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .Center  {
        flex: 1;
        .Center-Container {
            width: 230PX;
            margin: 0 auto;
        }
        .van-tabs__nav--card {
            margin: 0;
        }
    }
}
</style>