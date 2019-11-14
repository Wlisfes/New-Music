import { Row,Col } from 'vant';
import style from '@less/home/Personali.module.less';
export default {
    name: 'Personali',
    props: {
        title: {
            type: String,
            default: '推荐歌单'
        },
        subtitle: {
            type: String,
            default: '歌单广场'
        },
        path: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return (
            <div class={style.Personali}>
                <header class={style.header}>
                    <div class={style.title}>{this.title}</div>
                    <div class={`${style.vice} van-hairline--surround`}>
                        <router-link to={this.path}>{this.subtitle}</router-link>
                    </div>
                </header>
                <Row gutter={8}>
                    {
                        this.list.map(k => {
                            return (
                                <Col span={8} key={k.id}>
                                    <div class={style.Colcontainer}>
                                        <img class={style.picUrl} src={k.picUrl} />
                                        <div class={`${style.descr} van-multi-ellipsis--l2`}>{k.name}</div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }
}