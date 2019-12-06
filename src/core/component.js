import Vue from 'vue';
import { Image,Lazyload,Loading } from 'vant';

Vue.use(Lazyload)

//空状态
Vue.component('Empty', {
    props: {
        margin: {
            type: String,
            default: '0'
        },
        message: {
            type: String,
            default: '暂无数据'
        },
        color: {
            type: String,
            default: '#969799'
        }
    },
    computed: {
        empty() {
            return require('@assets/icon/empty.svg');
        }
    },
    render() {
        const EmptyClassName = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: this.margin
        }
        return (
            <div class="Empty" style={EmptyClassName}>
                <Image
                    width={64}
                    height={41}
                    fit="cover"
                    src={this.empty}
                ></Image>
                <div class="message" style={{marginTop: '10px', color: this.color}}>{this.message}</div>
            </div>
        )
    }
})

//正在加载
Vue.component('Loading', {
    props: {
        message: {
            type: String,
            default: '正在加载'
        },
        margin: {
            type: [Number, String],
            default: 0
        },
        color: {
            type: String,
            default: '#ee0a24'
        },
        type: {
            type: String,
            default: 'circular'
        }
    },
    render() {
        const style = {
            margin: this.margin
        }
        return (
            <Loading
                style={style}
                color={this.color}
                vertical={true}
                type={this.type}
            >{this.message}</Loading>
        )
    }
})