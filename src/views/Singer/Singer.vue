/*
 * @Author: 情雨随风 
 * @Date: 2019-12-25 22:07:52 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-25 22:48:47
 * @Description: 歌手详情列表
 */


<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { SingerCard,SingerList } from '@/components/singer';
export default {
    name: 'Singer',
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
            singerCard: {
                id: '',         //歌手id
                name: '',       //歌手昵称
                picUrl: '',     //歌手封面
                briefDesc: '',  //歌手描述
            },
            singerlist: [],     //歌手详情数据列表
            loading: false,
            wrappers: []
        }
    },
    created () {
        setTimeout(() => {
            this.playsingerdetail() 
        }, 500)
    },
    methods: {
        //歌手详情数据
        async playsingerdetail() {
            const [err, res] = await this.api.playsingerdetail({
                id: this.$route.params.id
            })
            if(!err && res.code === 200) {
                const { id,name,picUrl,briefDesc } = res.artist

                this.singerCard.id = id
                this.singerCard.name = name
                this.singerCard.picUrl = picUrl
                this.singerCard.briefDesc = briefDesc
                this.singerlist = res.hotSongs
            }
            this.loading = true
        },
        handelOpenplayer() {
            const id = this.$route.params.id
            this.$router.push(`/singer/${id}/player`)
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
        }
    },
    render() {
        return (
            <transition name="singer" appear>
                <Root class="Singer">
                    <Root.Header
                        title={this.singerCard.name || '歌手'}
                        play={this.play}
                        picUrl={this.singerCard.picUrl}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={this.handelOpenplayer}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>
                            <SingerCard
                                loading={this.loading}
                                {...{props: this.singerCard}}
                            ></SingerCard>
                            <SingerList
                                sonplayid={this.$route.params.id}
                                playid={this.playid}
                                loading={this.loading}
                                playlist={this.singerlist}
                                onPlay={this.handelplay}
                            ></SingerList>
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
.singer-enter-active,.singer-leave-active {
    transition: all 300ms;
}
.singer-enter,.singer-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Singer {
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
