<script>
export default {
    name: 'SonplayCard',
    props: {
        picUrl: {
            type: String,
            default: ''
        }
    },
    render() {
        return (
            <div class="SonplayCard">
                {this.picUrl && <transition name="visible" appear>
                    <div class="picUrl" style={{backgroundImage: `url(${this.picUrl})`}}></div>
                </transition>}
                
                <div class="Container"></div>
            
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.visible-enter-active, .visible-leave-active {
    transition: all 300ms;
}
.visible-enter, .visible-leave-to {
    opacity: 0;
    transform: scale(1.5);
}
.SonplayCard {
    position: relative;
    padding: 24px;
    .picUrl {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        filter: blur(40px);
        &::after {
            content: "";
            position: absolute;
            background-color: rgba(0,0,0,.3);
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
    .Container {
        height: 500px;
    }
}
</style>