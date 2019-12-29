/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:06:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 18:40:20
 * @Description: 登录退出组件
 */

<script>
import { Dialog } from 'vant';
export default {
    name: 'Signout',
    methods: {
        handelSignout() {
            const self = this
            Dialog.confirm({
                title: '情雨随风提醒您',
                message: '确定退出当前账号吗？',
                className: 'SignoutConfirm',
                cancelButtonColor: '#444444',
                confirmButtonColor: '#ee0a24',
                async beforeClose(action, done) {
                    if (action !== 'confirm') {
                        done();
                        return;
                    }
                    // this.$ls.remove('UserAccessToken')
                    
                    setTimeout(() => {
                        done()
                        self.$store.dispatch('app/actionUser', null)
                    }, 1000);
                }
            }).catch(e => {})
        }  
    },
    render() {
        return (
            <div class="Signout" onClick={this.handelSignout}>退出登录</div>
        )
    }
}
</script>

<style lang="less">
.Signout {
    height: 48PX;
    line-height: 46PX;
    background-color: #ffffff;
    margin: 24px 0 64px;
    font-size: 16PX;
    color: #ee0a24;
    text-align: center;
    cursor: pointer;
}
.SignoutConfirm {
    .van-dialog__message--has-title {
        color: #ee0a24;
    }
}
</style>