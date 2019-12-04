<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Avatar,Group,Userplay,Signout } from '@/components/user';
export default {
    name: 'User',
    computed: {
        ...mapState({
            User: state => state.app.User
        })  
    },
    data () {
        return {
            userplay: [],      //我创建的歌单
            starplay: [],      //我收藏的歌单
            wrappers: []
        }
    },
    created () {

    },
    methods: {
        //用户歌单
        async Userplaylist() {
            const { userId } = this.User
            const [err, res] = await this.api.Userplaylist({
                uid: userId
            })
            if(!err && res.code === 200) {
                const { playlist } = res
                const userplay = playlist.filter(k => k.userId === userId);
                const starplay = playlist.filter(k => k.userId !== userId);
                this.userplay = userplay
                this.starplay = starplay
                this.wrappers = this.wrappers.concat(playlist)
            }
        }
    },
    watch: {
        User: {
            handler() {
                this.User && this.Userplaylist()
            },
            immediate: true
        }
    },
    render() {
        const UserplayProps = {
            userplay: this.userplay,
            starplay: this.starplay,
            playid: 648468371,
            play: true
        }
        return (
            <div class="User">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={true}>
                    <Root.Container>
                        <Avatar {...{props: this.User}}></Avatar>
                        {this.User && <div class="UserWrapper">
                            <Group></Group>
                            <Userplay {...{props: UserplayProps}}></Userplay>
                        </div>}
                        {this.User && <Signout></Signout>}
                    </Root.Container>
                </Root.Scroll>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.User {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .wrapper {
        flex: 1;
        overflow: hidden;
    }
    .Container {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #FAFAFA;
    }
    .UserWrapper {
        flex: 1;
        margin-top: 24px;
    }
}
</style>