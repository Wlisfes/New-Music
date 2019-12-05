<script>
import { NavBar,Icon } from 'vant';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'Header',
    render() {
        return (
            <NavBar class="Header" >
                <Icon
                    slot="left"
                    name="arrow-left"
                    color="#ffffff"
                ></Icon>

                <Icon
                    slot="right"
                    name={play}
                    size={20}
                    color="#ffffff"
                    
                ></Icon>
            </NavBar>
        )
    }
}
</script>

<style lang="less" scoped>
.Header {
    display: flex;
    height: 46PX;
}
</style>