/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:06:05 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-01-05 21:37:35
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
                title: '温馨提示',
                message: '确定退出当前账号吗？',
                className: 'SignoutConfirm',
                cancelButtonColor: '#444444',
                confirmButtonColor: '#ee0a24',
                beforeClose(action, done) {
                    if (action !== 'confirm') {
                        done();
                        return;
                    }
                    setTimeout(async () => {
                        const [err, res] = await self.api.logout()
                        if(!err && res.code === 200) {
                            this.$ls.remove('UserAccessToken')
                            self.$store.dispatch('app/actionUser', null)
                        }
                        done()
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