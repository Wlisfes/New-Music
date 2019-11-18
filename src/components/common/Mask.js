
import style from '@less/common/Mask.module.less';
export default {
    name: 'Masks',
    props: {
        picUrl: String
    },
    render() {
        return (
            <div class={style.Masks} style={{backgroundImage: `url('${this.picUrl + '?param=750y750'}')`}}>
                


            </div>
        )
    }
}