<script>
import { Button,Field,Icon,Image,Toast } from 'vant';
import logo from '@assets/image/logo.png';
export default {
    name: 'Login',
    data () {
        return {
            loading: false
        }
    },
    methods: {
        //登录
        handelSubmit() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                Toast.fail('登录失败')
            }, 3000)
        }
    },
    render() {
        return (
            <transition name="login" appear>
                <div class="Login" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                    <div class="log">
                        <Image
                            width={100}
                            height={100}
                            round={true}
                            src={logo}
                        ></Image>
                    </div>
                    <div class="Container">
                        <div class="Form">
                            <Field
                                class="van-hairline--bottom"
                                placeholder="手机号/邮箱"
                                error-message="手机号/邮箱格式错误"
                            >
                                <Icon
                                    slot="left-icon"
                                    size={28}
                                    name="contact"
                                    color="#ee0a24"
                                    style={{marginRight: '10px'}}
                                ></Icon>
                            </Field>
                            <Field
                                class="van-hairline--bottom"
                                placeholder="密码"
                                error-message="密码错误"
                            >
                                <Icon
                                    slot="left-icon"
                                    size={28}
                                    name="setting-o"
                                    color="#ee0a24"
                                    style={{marginRight: '10px'}}
                                ></Icon>
                            </Field>
                        </div>
                    </div>
                    <Button
                        class="Submit"
                        color="#ee0a24"
                        loading={this.loading}
                        disabled={this.loading}
                        round={true}
                        plain={true}
                        onClick={this.handelSubmit}
                    >登录</Button>
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
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    .log {
        height: 480px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Container {
        flex: 1;
        .Form {
            margin: 0 64px;
        }
        .van-cell {
            height: 48px;
            padding: 0 16px;
            margin-top: 24px;
            &:not(:last-child)::after {
                left: 0;
                bottom: -50%;
            }
        }
        .van-hairline--bottom {
            &::after {
                border-color: #ee0a24;
            }
        }
    }
    .Submit {
        margin: 64px 200px;
    }
}
</style>