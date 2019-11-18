import { mapState } from 'vuex';
import { NavHeader } from '@/components/common';
import { Card } from '@/components/playDetails';
import { Bscroll } from '@/components/base';
import style from '@less/playDetails/PlayDetails.module.less';
export default {
    name: 'PlayDetails',
    computed: {
        ...mapState({
            design: state => state.design
        }),
        query() {
            return this.design[this.$attrs.query.type].filter(k => k.id == this.$attrs.query.id)[0]
        }
    },
    created () {
        // this.playlistdetail()
        
    },
    methods: {
        //详情
        async playlistdetail() {
            const [err, res] = await this.api.playlistdetail({
                id: this.query.id
            })
            if(!err) {
                console.log(res)
            }
        }
    },
    render() {
        return (
            <section
                class={style.PlayDetails}
                onTouchmove={(e) => {/**/e.preventDefault()/**/}}
            >
                <NavHeader
                    title={this.query && this.query.name}
                    picUrl={this.query && this.query.picUrl}
                ></NavHeader>
                <Bscroll class={style.Scroll} data={[]}>
                    <div class={style.Container}>
                        <Card picUrl={this.query && this.query.picUrl}></Card>


                    </div>
                </Bscroll>
            </section>
        )
    }
}