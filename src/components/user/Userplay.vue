<script>
import { Collapse,CollapseItem,Icon } from 'vant';
export default {
    name: 'Userplay',
    data () {
        return {
            active: [1]
        }
    },
    methods: {
        CollapseChange(e) {
            console.log(e)
            this.active = e
        }
    },
    render() {
        const IconStyle = {marginRight: '10px'}
        return (
            <div class="Userplay">
                <Collapse value={this.active} onChange={this.CollapseChange}>
                    <CollapseItem title="我创建的歌单" name={1} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="contact" style={IconStyle}></Icon>

                    </CollapseItem>
                    <CollapseItem title="我收藏的歌单" name={2} size="large">
                        <Icon slot="icon" color="#ee0a24" size={24} name="hot-o" style={IconStyle}></Icon>

                    </CollapseItem>
                </Collapse>


            </div>
        )
    }
}
</script>

<style lang="less">
.Userplay {
    overflow: hidden;
    margin-top: 24px;
}
</style>