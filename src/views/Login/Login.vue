/*
 * @Author: 情雨随风 
 * @Date: 2019-12-04 23:02:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 18:42:06
 * @Description: 登录
 */

<script>
import { mapState } from 'vuex';
import { Button,Field,Icon,Image,Toast,NavBar } from 'vant';
import logo from '@assets/image/logo.png';
import logoUser from '@assets/icon/log-user.png';
import logoPassword from '@assets/icon/log-password.png';
export default {
    name: 'Login',
    computed: {
        ...mapState({
            User: state => state.app.User
        })
    },
    data () {
        return {
            form: {
                user: '',
                password: '',
                userMessage: '',
                passwordMessage: '',
                loading: false,
                avatar: ''
            }
        }
    },
    created () {
        this.handelReadUser()  
    },
    methods: {
        //读取本地用户信息填充
        handelReadUser() {
            const value = this.$ls.get('UserSave')
            if(value) {
                const { user,password,avatar } = this.utils.decrypt(value)
                this.form.user = user
                this.form.password = password
                this.form.avatar = avatar
            }
        },
        //登录
        async handelSubmit() {
            const rule = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
            const { user,password,loading } = this.form
            if(rule.test(user) && password) {
                this.form.loading = true
                const [err, res] = await this.api.login({
                    phone: user,
                    password: password
                })
                if(!err) {
                    if(res.code === 200) {
                        const info = {
                            userId: res.profile.userId,
                            nickname: res.profile.nickname,
                            avatarUrl: res.profile.avatarUrl,
                            backgroundUrl: res.profile.backgroundUrl,
                            follows: res.profile.follows,
                            followeds: res.profile.followeds,
                            gender: res.profile.gender,
                            eventCount: res.profile.eventCount
                        }
                        this.$ls.set('UserAccessToken', info, (24 * 60 * 60 * 1000))
                        this.$ls.set('UserSave', this.utils.encrypt({
                            user,password,
                            avatar: res.profile.avatarUrl
                        }))
                        this.$store.dispatch('app/actionUser', info)
                        Toast.success({
                            message: '登陆成功',
                            duration: 1500
                        })
                        setTimeout(() => {
                            this.$router.back()
                        }, 500)
                    }
                    else {
                        res.message.length > 6 ? Toast(res.message) : Toast.fail({
                            message: res.message,
                            icon: 'close'
                        })
                        setTimeout(() => {
                            this.form.loading = false
                        }, 600)
                    }
                }
                else {
                    res.message.length > 6 ? Toast(res.message) : Toast.fail({
                        message: res.message,
                        icon: 'close'
                    })
                    setTimeout(() => {
                        this.form.loading = false
                    }, 600)
                }
            }
            else {
                if(!rule.test(user)) {
                    this.form.userMessage = '手机号格式错误'
                }
                if(!password) {
                    this.form.passwordMessage = '密码格式错误'
                }
                this.form.loading = true
                setTimeout(() => {
                    this.form.loading = false
                }, 600)
            }
        },
        handelFormUser(user) {
            this.form.user = user
        },
        handelFormPassword(password) {
            this.form.password = password
        }
    },
    render() {
        return (
            <transition name="login" appear>
                <div class="Login" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                    <NavBar
                        style={{cursor: 'pointer'}}
                        left-arrow={true}
                        left-text="返回"
                        onClick-left={() => {this.$router.back()}}
                    ></NavBar>
                    <div class="log">
                        <Image
                            width={100}
                            height={100}
                            round={true}
                            src={this.User && this.User.avatarUrl || this.form.avatar || logo}
                        ></Image>
                    </div>
                    <div class="Container">
                        <div class="Form">
                            <div class="Form-message">
                                {this.User && `欢迎回来、${this.User.nickname}！` || `欢迎到来、久违了！`}
                            </div>
                            {!this.User && <Field
                                class="van-hairline--bottom"
                                placeholder="手机号"
                                type="tel"
                                maxlength={11}
                                error-message={this.form.userMessage}
                                value={this.form.user}
                                onInput={this.handelFormUser}
                            >
                                <Icon
                                    slot="left-icon"
                                    size={24}
                                    name={logoUser}
                                    color="#FC87B4"
                                    style={{marginRight: '10px'}}
                                ></Icon>
                            </Field>}
                            {!this.User && <Field
                                class="van-hairline--bottom"
                                placeholder="密码"
                                type="password"
                                error-message={this.form.passwordMessage}
                                value={this.form.password}
                                onInput={this.handelFormPassword}
                            >
                                <Icon
                                    slot="left-icon"
                                    size={24}
                                    name={logoPassword}
                                    color="#FC87B4"
                                    style={{marginRight: '10px'}}
                                ></Icon>
                            </Field>}
                            <Button
                                class="Submit"
                                color="#FC87B4"
                                loading={this.form.loading}
                                disabled={this.form.loading}
                                round={true}
                                plain={false}
                                block={true}
                                onClick={() => {
                                    if(this.User) {
                                        this.$router.back();
                                        return;
                                    }
                                    this.handelSubmit()
                                }}
                            >{this.User ? '返回' : '登录'}</Button>
                        </div>
                    </div>
                </div>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.login-enter-active, .login-leave-active {
    transition: all 300ms;
}
.login-enter, .login-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Login {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url('~@assets/image/login.jpg');
    background-size: 750px 1666px;
    background-position-y: 100%;
    display: flex;
    z-index: 99;
    flex-direction: column;
    /deep/ .van-nav-bar {
        background-color: rgba(0,0,0,0);
        &::after {
            border: none;
        }
        .van-nav-bar__title {
            font-size: 18px;
            color: #444444;
        }
        .van-nav-bar__text {
            color: #ffffff;
            background-color: rgba(0,0,0,0);
        }
        .van-icon {
            color: #ffffff;
        }
    }
    .log {
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .Container {
        flex: 1;
        .Form {
            margin: 0 64px;
            background-color: #ffffff;
            overflow: hidden;
            padding: 0 32px;
            border-radius: 24px;
            .Form-message {
                font-size: 20PX;
                color: #333333;
                margin: 48px 0 24px;
                text-align: center;
            }
        }
        .van-cell {
            height: 48px;
            padding: 0 10px;
            margin-top: 24px;
            &:not(:last-child)::after {
                left: 0;
                bottom: -50%;
            }
        }
        .van-hairline--bottom {
            &::after {
                border-color: #FC87B4;
            }
        }
    }
    .Submit {
        cursor: pointer;
        margin: 64px 32px;
        width: calc(100% - 64px);
    }
}
</style>