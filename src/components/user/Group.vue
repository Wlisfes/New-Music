<script>
import { Cell,CellGroup,Icon } from 'vant';
export default {
    name: 'Group',
    render() {
        const IconStyle = {marginRight: '10px'}
        return (
            <div class="Group">
                <CellGroup>
                    <Cell title="本地音乐" is-link center value={0} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="music-o" style={IconStyle}></Icon>
                    </Cell>
                    <Cell title="最近播放" is-link center value={270} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="fire-o" style={IconStyle}></Icon>
                    </Cell>
                    <Cell title="我的电台" is-link center value={3} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="service-o" style={IconStyle}></Icon>
                    </Cell>
                    <Cell title="我的收藏" is-link center value={8} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="star-o" style={IconStyle}></Icon>
                    </Cell>
                </CellGroup>
            </div>
        )
    }
}
</script>