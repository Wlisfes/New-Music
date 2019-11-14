import { Icon } from 'vant';
import style from '@less/home/Header.module.less';
import play from '@assets/icon/play.gif';
export default {
    name: 'Header',
    methods: {
        //打开搜索页
        handelopenSearch() {
            this.$router.push({
                path: '/search'
            })
        }
    },
    render() {
        return (
            <div class={style.Header}>
                <div class={style.search} onClick={this.handelopenSearch}>
                    <Icon name="search"></Icon>
                    <div class={style.placeholder}>刀剑神域</div>
                </div>
            </div>
        )
    }
}