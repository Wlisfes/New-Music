/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:02:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-07 15:02:24
 * @Description: 我的
 */

<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Avatar,Group,Userplay,Signout } from '@/components/user';
export default {
    name: 'User',
    computed: {
        ...mapState({
            User: state => state.app.User,
            sonplayid: state => state.howler.sonplayid,
            play: state => state.howler.play
        })  
    },
    props: {
        active: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            userplay: [],      //我创建的歌单
            starplay: [],      //我收藏的歌单
            wrappers: []
        }
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
        },
        //歌单列表
        handelplayCard(ops) {
            this.$router.push({
                path: '/sonplay',
                query: {
                    id: ops.id
                }
            })
        },
    },
    watch: {
        active(newVal) {
            newVal && this.$refs.wrapper.refresh()
        },
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
            sonplayid: this.sonplayid,
            play: this.play
        }
        return (
            <div class="User">
                <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                    <Root.Container>
                        <Avatar {...{props: this.User}}></Avatar>
                        {this.User && <div style={{flex: 1, overflow: 'hidden'}}>
                            <div class="UserWrapper">
                                <Group></Group>
                                <Userplay
                                    {...{props: UserplayProps}}
                                    onPlayCard={this.handelplayCard}
                                ></Userplay>
                            </div>
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
        transition: all 300ms;
    }
    .UserWrapper {
        padding-top: 24px;
        background-color: #FAFAFA;
    }
}
</style>