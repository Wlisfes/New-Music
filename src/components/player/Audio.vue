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

                //播放完毕
                this.audio.onended = (e) => {
                    this.$store.commit('howler/next')
                }
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