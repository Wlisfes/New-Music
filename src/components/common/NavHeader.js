

import { Icon } from 'vant';
import style from '@less/common/NavHeader.module.less';
import play from '@assets/icon/play.gif';
import stop from '@assets/icon/stop.png';
export default {
    name: 'NavHeader',
    props: {
        title: {
            type: String,
            default: '歌单'
        },
        picUrl: {
            type: String,
            default: ''
        }
    },
    render() {
        return (
            <div class={style.NavHeader} style={{ backgroundImage: `url('${this.picUrl + '?param=750y750'}')` }}>
                <div class={style.back} onClick={() => {this.$router.back()}}>
                    <Icon name="arrow-left"></Icon>
                </div>
                <div class={`${style.title} van-ellipsis`}>
                    {this.title}
                </div>
                <div class={style.play}>
                    <Icon name={stop}></Icon>
                </div>
            </div>
        )
    }
}