<script>
import { Image,Row,Col,Button,Icon,ImagePreview } from 'vant';
export default {
    name: 'Avatar',
    props: {
        avatarUrl: String,
        backgroundUrl: String,
        followeds: Number,
        follows: Number,
        gender: Number,
        nickname: String,
        userId: Number
    },
    methods: {
        //预览图片
        handelImage() {
            this.avatarUrl && ImagePreview({
                images: [this.avatarUrl],
                onClose() {}
            });
        },
    },
    render() {
        return (
            <div class="Avatar">
                <div class="Container">
                    <div class="Avatar-Container">
                        <Image
                            width={80}
                            height={80}
                            round={true}
                            fit="cover"
                            src={this.avatarUrl || 'http://static.hdslb.com/images/akari.jpg'}
                            onClick={this.handelImage}
                        ></Image>
                        <div class="nickname">
                            <div class="van-name">{this.nickname || '未登录'}</div>
                        </div>
                        {this.userId && false && <Button
                            disabled={false}
                            hairline={true}
                            round={true}
                            color="#ee0a24"
                            plain={true}
                            size="small"
                        >签到</Button>}
                    </div>
                    {this.userId && <Row style={{marginBottom: '14px', height: '44px'}}>
                        <Col span={6} class="van-hairline--right">
                            <div class="van-tainer">{this.gender || '--'}</div>
                            <div class="van-tainer">动态</div>
                        </Col>
                        <Col span={6} class="van-hairline--right">
                            <div class="van-tainer">{this.follows || '--'}</div>
                            <div class="van-tainer">关注</div>
                        </Col>
                        <Col span={6} class="van-hairline--right">
                            <div class="van-tainer">{this.followeds || '--'}</div>
                            <div class="van-tainer">粉丝</div>
                        </Col>
                        <Col span={6}>
                            <div class="van-tainer">
                                <Icon name="setting-o" size={20} />
                            </div>
                            <div class="van-tainer">编辑资料</div>
                        </Col>
                    </Row>}
                    {!this.userId && <Button
                        disabled={false}
                        hairline={true}
                        round={true}
                        block={true}
                        color="#ee0a24"
                        plain={true}
                        size="normal"
                    >登录</Button>}
                </div>
            </div>
        )
    }
}
</script>

<style lang="less">
.Avatar {
    .Container {
        overflow: hidden;
        background-color: #FAFAFA;
    }
    .Avatar-Container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 24px 40px;
        .van-button--small {
            height: 26px;
            line-height: 24px;
        }
    }
    .nickname {
        // flex: 1;
        // margin-left: 24px;
        margin-top: 24px;
        .van-name {
            font-size: 18px;
            color: #333333;
            font-weight: 500;
        }
    }
    .van-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        .van-tainer {
            height: 22px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #333333;
        }
    }
    .van-button--normal {
        margin: 0 20px 14px;
        width: calc(100% - 40px);
    }
}
</style>