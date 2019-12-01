<script>
import pinyin from 'pinyin';
export default {
    name: 'Singer',
    created () {
        this.playsinger()
        console.log(pinyin('双笙', {
            style: pinyin.STYLE_FIRST_LETTER
        })[0])
    },
    methods: {
        //歌手
        async playsinger() {
            const [err, res] = await this.api.playsinger()
            if(!err && res.code === 200) {
                const singer = res.list.artists
                const hot = []
                const items = []
                singer.forEach((k ,index) => {
                    if(index < 10) {
                        hot.push(k)
                    }
                    else {
                        items.push(k)
                    }
                })

            }
        }  
    },
    render() {
        return (
            <div class="Singer">
                


            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Singer {
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