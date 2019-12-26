<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';
export default {
    name: 'Audio',
    computed: {
        ...mapState({
            audio: state => state.howler.audio,
            play: state => state.howler.play,
            playid: state => state.howler.playid,
            playUrl: state => state.howler.playUrl,
            status: state => state.howler.status,
            playIndex: state => state.howler.playIndex,
            playlist: state => state.howler.playlist,
        })  
    },
    mounted () {
        this.$nextTick(() => {
            this.initAudio()
        })
    },
    methods: {
        //初始化audio
        initAudio() {
            this.$nextTick(() => {
                this.$store.commit('howler/setAudio', this.$refs.Audio)

                //监听播放完毕
                this.audio.onended = (e) => {
                    switch (this.status) {
                        case 1: //列表循环
                        case 3: //随机
                            this.$store.commit('howler/next')
                            break;
                        case 2: //单曲循环
                            this.audio.load()
                            this.audio.play()
                            break;
                    }
                }

                //监听播放
                this.audio.ontimeupdate = (e) => {
                    this.$store.commit('howler/setCurrentTime',e.target.currentTime)
                }

                //
                // this.audio.onprogress = (e) => {
                //     console.log(this.audio.buffered.TimeRanges )
                // }
            }) 
        },
        //查询音乐是否可用
        async musicCheck(id) {
            const [err, res] = await this.api.musicCheck({ id })
            if(!err && res.success) {
                this.musicUrl(this.playid)
            }
            else {
                Toast(res.message)
                this.$store.commit('howler/next')
            }
        },
        //获取音乐 url
        async musicUrl(id) {
            const [err, res] = await this.api.musicUrl({ id })
            if(!err && res.code === 200) {
                const data = res.data[0]
                this.$store.dispatch('howler/actionPlayUrl', data.url)
            }
        },
    },
    watch: {
        playid: {
            handler(newVal) {
                if(newVal) {
                    this.musicCheck(newVal)
                }
            },
            immediate: true
        },
        playUrl: {
            handler(newVal) {
                if(newVal) {
                    this.audio.src = this.utils.https(newVal)
                    this.audio.currentTime = 0
                    this.audio.load()
                    this.audio.play()
                    !this.play && this.$store.commit('howler/setPlay', true)
                }
            },
            immediate: true
        }
    },
    render() {
        return (
            <div>
                <audio ref="Audio"></audio>
            </div>
        )
    }
}
</script>