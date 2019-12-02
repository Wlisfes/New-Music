<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Avatar,Userplay } from '@/components/user';
export default {
    name: 'User',
    computed: {
        ...mapState({
            User: state => state.app.userInfo
        })  
    },
    created () {
        // this.login()
        console.log(this.$store.state.app.userInfo)
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
                this.$ls.set('UserInfo', info, (24 * 60 * 60 * 1000))
            }
        }
    },
    render() {
        return (
            <div class="User">
                <Root.Scroll ref="wrapper" class="wrapper" data={[]}>
                    <Root.Container>
                        <Avatar {...{props: this.User}}></Avatar>
                        <Userplay></Userplay>


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
}
</style>