<script>
import { Icon } from 'vant';
import { swiper,swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
export default {
    name: 'Square-Swiper',
    props: {
        banner: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            swiperOption: {
                slidesPerView: 2,
                spaceBetween: -10,
                centeredSlides: true,
                initialSlide: 1,
                grabCursor: true,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            }
        }
    },
    render() {
        return (
            <div class="Square-Swiper">
                <swiper options={this.swiperOption}>
                    {this.banner.map(k => {
                        return (
                            <swiperSlide key={k.id} style={{padding: '0 5px', boxSizing: 'border-box'}}>
                                <div class="Swiper-Container" onClick={(e) => {console.log(e)}}>
                                    <div class="Swiper-picUrl">
                                        <img class="picUrl" src={this.utils.https(`${k.coverImgUrl}?param=400y400`)} />
                                        <div class="playCount">
                                            <Icon name="play" size={14} color="#ffffff" />
                                            <div class="Count">{this.utils.playCount(k.playCount)}</div>
                                        </div>
                                        <div class="van-playIcon">
                                            <Icon size={26} name="play" color="#ee0a24" />
                                        </div>
                                    </div>
                                    <div class="van-name">{k.name}</div>
                                </div>
                            </swiperSlide>
                        )
                    })}
                </swiper>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Square-Swiper {
    margin: 38px 24px 24px;
    .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;
            display: flex;
            align-items: center;
            transition: 300ms;
            transform: scale(0.8);
            z-index: 110;
            overflow: hidden;
        }
        .swiper-slide-active,.swiper-slide-duplicate-active{
            transform: scale(1);
            z-index: 120;
        }
    }
    .Swiper-Container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0px 0px 8px 0px rgba(15,35,47,0.15);
        margin-bottom: 16px;
        .Swiper-picUrl {
            position: relative;
            .picUrl {
                width: 100%;
                display: block;
            }
            .playCount {
                position: absolute;
                top: 5px;
                right: 10px;
                display: flex;
                align-items: center;
            }
            .Count {
                font-size: 12PX;
                color: #ffffff;
            }
            .van-playIcon {
                position: absolute;
                right: 10px;
                bottom: 10px;
                background-color: rgba(255,255,255,.5);
                width: 40px;
                height: 40px;
                border-radius: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
        .van-name {
            font-size: 14px;
            line-height: 1.5;
            height: 42px;
            margin: 5px;
            display: flex;
            align-items: center;
        }
    }
}




</style>