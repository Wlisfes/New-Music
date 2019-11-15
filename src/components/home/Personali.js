import { Row,Col } from 'vant';
import style from '@less/home/Personali.module.less';
export default {
    name: 'Personali',
    props: {
        title: {
            type: String,
            default: ''
        },
        subtitle: {
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
                    {
                        this.subtitle && <div class={`${style.subtitle} van-hairline--surround`} onClick={() => {
                            this.$emit('subtitle', this.subtitle)
                        }}>{this.subtitle}</div>
                    }
                </header>
                <Row gutter={8}>
                    {
                        this.list.map(k => {
                            return (
                                <Col span={8} key={k.id}>
                                    <div class={style.Colcontainer} onClick={() => {
                                        this.$emit('play', k)
                                    }}>
                                        <img class={style.picUrl} src={`${this.utils.replaceHttps(k.picUrl)}?param=200y200`} />
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