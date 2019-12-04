import Vue from 'vue';
import { Image } from 'vant';

import empty from '@assets/icon/empty.svg';


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
                    src={empty}
                ></Image>
                <div class="message" style={{marginTop: '10px', color: this.color}}>{this.message}</div>
            </div>
        )
    }
})