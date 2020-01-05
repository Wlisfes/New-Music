/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:03:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-01-05 21:26:25
 * @Description: 专辑列表
 */

<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { SonplayList } from '@/components/sonplay';
import { AlbplayCard } from '@/components/search';
export default {
    name: 'Albplay',
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
                picUrl: '',          //封面
                name: '',            //专辑昵称
                descr: '',           //专辑描述
                nickname: '',        //歌手昵称
                commentCount: 0,     //评论数
                shareCount: 0,       //分享数
                publishTime: 0,      //创建时间戳
            },
            playlist: [],     //歌曲列表
            loading: false,
            wrappers: []
        }
    },
    created () {
        setTimeout(() => {
            this.albumDetail()
        }, 500)
    },
    methods: {
        //专辑详情数据
        async albumDetail() {
            const [err, res] = await this.api.albumDetail({
                id: this.$route.params.id
            })
            if(!err && res.code === 200) {
                const { picUrl,name,info,publishTime,description,artist } = res.album
                this.playCard.picUrl = picUrl
                this.playCard.name = name
                this.playCard.nickname = artist.name
                this.playCard.commentCount = info.commentCount
                this.playCard.shareCount = info.shareCount
                this.playCard.publishTime = publishTime
                this.playCard.descr = description
                
                this.playlist = this.playlist.concat(res.songs)
                this.wrappers = this.wrappers.concat(res.songs)
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
            const { keywords,id } = this.$route.params
            this.$router.push(`/search/${keywords}/albplay/${id}/player`)
        }
    },
    render() {
        return (
            <transition name="albplay" appear>
                <Root class="Albplay">
                    <Root.Header
                        title={'专辑'}
                        play={this.play}
                        picUrl={this.playCard.picUrl}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={this.handelOpenplayer}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>
                            <AlbplayCard
                                loading={this.loading}
                                {...{props: this.playCard}}
                            ></AlbplayCard>
                            <SonplayList
                                sonplayid={this.$route.params.id}
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
.albplay-enter-active, .albplay-leave-active {
    transition: all 300ms;
}
.albplay-enter, .albplay-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Albplay {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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