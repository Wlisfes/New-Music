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
    created () {
        // this.login()
        console.log(this.$store.state.app.User)
    },
    methods: {
        //登录
        async login() {
            const [err, res] = await this.api.login({
                phone: 18124963029,
                password: 'lifei7724300'
            })
            if(!err && res.code === 200) {
                const info = {
                    userId: res.profile.userId,
                    nickname: res.profile.nickname,
                    avatarUrl: res.profile.avatarUrl,
                    backgroundUrl: res.profile.backgroundUrl,
                    follows: res.profile.follows,
                    followeds: res.profile.followeds,
                    gender: res.profile.gender
                }
                this.$ls.set('UserAccessToken', info, (24 * 60 * 60 * 1000))
            }
        },
        //用户歌单
        async Userplaylist() {

            console.log(1)
            return
            const [err, res] = await this.api.Userplaylist({
                uid: this.User.userId
            })

            if(!err && res.code === 200) {
                console.log(res)
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
        return (
            <div class="User">
                <Root.Scroll ref="wrapper" class="wrapper" data={[]}>
                    <Root.Container>
                        <Avatar {...{props: this.User}}></Avatar>
                        {this.User && <div class="UserWrapper">
                            <Group></Group>
                            <Userplay></Userplay>
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