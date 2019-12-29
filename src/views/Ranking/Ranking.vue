/*
 * @Author: 情雨随风 
 * @Date: 2019-12-26 21:46:25 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 12:10:39
 * @Description: 排行榜
 */


<script>
import { mapState } from 'vuex';
import { Root } from '@/components/common';
import { Official,Gridcard } from '@/components/ranking';
export default {
    name: 'Ranking',
    computed: {
        ...mapState({
            play: state => state.howler.play
        })  
    },
    data () {
        return {
            icialist: [],       //官方榜
            gridlist: [],       //推荐榜
            morelist: [],       //更多榜单
            wrappers: []
        }
    },
    created () {
        setTimeout(() => {
            this.RanKinglist()
        }, 500)
    },
    methods: {
        //排行榜
        async RanKinglist() {
            const [err, res] = await this.api.RanKinglist()
            if(!err && res.code === 200) {
                res.list.forEach((element,index) => {
                    if(index < 4) {
                        this.icialist.push(element)
                    }
                    else if(index < 10) {
                        this.gridlist.push(element)
                    }
                    else {
                        this.morelist.push(element)
                    }
                });
                this.wrappers = res.list
            }
        },
        //榜单详情列表
        handelplayCard(ops) {
            this.$router.push(`/ranking/sonplay/${ops.id}`)
        }
    },
    render() {
        return (
            <transition name="ranking" appear>
                <Root class="Ranking">
                    <Root.Header
                        color="#ffffff"
                        iconColor="#323233"
                        title={'排行榜'}
                        play={this.play}
                        style={{cursor: 'pointer'}}
                        onBack={() => {this.$router.back()}}
                        onPlay={() => {this.$router.push(`/ranking/player`)}}
                    ></Root.Header>
                    <Root.Scroll ref="wrapper" class="wrapper" data={this.wrappers} bounce={false}>
                        <Root.Container>
                            {
                                (
                                    this.icialist.length > 0 ||
                                    this.gridlist.length > 0 ||
                                    this.morelist.length > 0
                                ) ? null :  <Loading margin="24px"></Loading>
                            }

                            {this.icialist.length > 0 && <Official
                                icialist={this.icialist}
                                onPlayCard={this.handelplayCard}
                            ></Official>}

                            {this.gridlist.length > 0 && <Gridcard
                                title='推荐榜'
                                gridlist={this.gridlist}
                                onPlayCard={this.handelplayCard}
                            ></Gridcard>}

                            {this.morelist.length > 0 && <Gridcard
                                style={{marginBottom: '20px'}}
                                title='更多榜单'
                                gridlist={this.morelist}
                                onPlayCard={this.handelplayCard}
                            ></Gridcard>}
                        </Root.Container>
                    </Root.Scroll>
                    <router-view></router-view>
                </Root>
            </transition>
        )
    }
}
</script>

<style lang="less" scoped>
.ranking-enter-active,.ranking-leave-active {
    transition: all 300ms;
}
.ranking-enter,.ranking-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0;
}
.Ranking {
    width: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #ffffff;
    /deep/ .van-nav-bar__title {
        color: #323233;
        font-size: 16px;
    }
    .wrapper {
        flex: 1;
        overflow: hidden;
        .Container {
            min-height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
