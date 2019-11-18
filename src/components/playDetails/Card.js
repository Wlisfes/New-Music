import { Row,Col } from 'vant';
import { Mask } from  '@/components/common';
import style from '@less/playDetails/Card.module.less';
export default {
    name: 'Card',
    props: {
        picUrl: {
            type: String,
            default: ''
        }
    },
    render() {
        return (
            <section class={style.Card} style={{backgroundImage: `url('${this.picUrl + '?param=750y750'}')`}}>
                {/* <Mask picUrl={this.picUrl}></Mask> */}
                
            </section>
        )
    }
}