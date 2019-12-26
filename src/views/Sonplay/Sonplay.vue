/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:03:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-26 22:40:52
 * @Description: 歌单列表
 */

<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { SonplayCard,SonplayList } from '@/components/sonplay';
export default {
    name: 'Sonplay',
    computed: {
        ...mapState({
            playid: state => state.howler.playid,
            sonplayid: state => state.howler.sonplayid,
            play: state => state.howler.play,
            player: state => state.howler.player
        })  
    },
    data () {
        return {
            playCard: {      //卡片配置
                id: '',              //歌单id
                picUrl: '',          //封面
                name: '',            //歌单昵称
                descr: '',           //歌单描述
                avatar: '',          //创建者头像
                nickname: '',        //创建者昵称
                commentCount: 0,     //评论数
                shareCount: 0,       //分享数
                playCount: 0,        //播放数
            },
            playlist: [],     //歌曲列表
            loading: false,
            wrappers: []
        }
    },
    created () {
        setTimeout(() => {
            this.playlistdetail()
        }, 500)
    },
    methods: {
        //歌单详情数据
        async playlistdetail() {
            const [err, res] = await this.api.playlistdetail({
                id: this.$route.params.id
            })
            if(!err && res.code === 200) {
                const {
                    coverImgUrl,name,description,creator,
                    commentCount,shareCount,playCount,id
                } = res.playlist

                this.playCard = {
                    id: id,
                    picUrl: coverImgUrl,
                    name: name,
                    descr: description,
                    avatar: creator.avatarUrl,
                    nickname: creator.nickname,
                    commentCount: commentCount,
                    shareCount: shareCount,
                    playCount: playCount
                }
                this.playlist = res.playlist.tracks
                this.wrappers = this.wrappers.concat(this.playlist)
            }
            this.loading = true
        },
        //选中歌曲播放
        handelplay({ info,sonplayid,index,playlist }) {
            this.handelOpenplayer()
            if(this.sonplayid === sonplayid && this.playid === info.id) {
                return;
            }
            this.$store.commit('howler/setPlayid', info.id)
            this.$store.commit('howler/setPicUrl', info.al.picUrl)
            this.$store.commit('howler/setSonplayid', sonplayid)
            this.$store.commit('howler/setPlayIndex', index)
            this.$store.commit('howler/setPlaylist', playlist)
            this.$store.commit('howler/setDuraTion', Math.ceil(info.dt / 1000))
        },
        handelOpenplayer() {
            const id = this.$route.params.id
            this.$router.push(`/sonplay/${id}/player`)
        }
    },
    render() {
        return (
            <transition name="sonplay" appear>
                <Root class="Sonplay">
                    <Root.Header
                        title={this.playCard.name}
                        play={this.play}
                        picUrl={this.playCard.picUrl}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={this.handelOpenplayer}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>
                            <SonplayCard
                                loading={this.loading}
                                {...{props: this.playCard}}
                            ></SonplayCard>
                            <SonplayList
                                sonplayid={this.playCard.id}
                                playid={this.playid}
                                loading={this.loading}
                                playlist={this.playlist}
                                onPlay={this.handelplay}
                            ></SonplayList>
                        </Root.Container>
                    </Root.Scroll>
                    <router-view></router-view>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.sonplay-enter-active, .sonplay-leave-active {
    transition: all 300ms;
}
.sonplay-enter, .sonplay-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Sonplay {
    width: 10rem;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #9E9E9E;
    .wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>