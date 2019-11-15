
import style from '@/less/playDetails/PlayDetails.module.less';
export default {
    name: 'PlayDetails',
    created () {
        this.playlistdetail()
    },
    methods: {
        //详情
        async playlistdetail() {
            const [err, res] = await this.api.playlistdetail({
                id: 2492653494
            })
            if(!err) {
                console.log(res)
            }
        }
    },
    render() {
        return (
            <transition name="playDetails-open" appear>
                <div class={style.PlayDetails} onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                    PlayDetails
                </div>
            </transition>
        )
    }
}