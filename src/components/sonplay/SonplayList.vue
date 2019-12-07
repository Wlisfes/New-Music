<script>
import { Icon,Divider } from  'vant';
export default {
    name: 'SonplayList',
    props: {
        playlist: {
            type:  Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        play: {
            type: Boolean,
            default: false
        },
        playid: {
            type: [Number, String],
            default: ''
        },
        sonplayid: {
            type: [Number, String],
            default: ''
        }
    },
    methods: {
        handelplay({ id }, index) {
            this.$emit('play', {
                playid: id,
                sonplayid: this.sonplayid,
                playlist:this.playlist,
                index: index
            })
        }  
    },
    render(){
        const flexBox = {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden'
        }
        return (
            <div class="SonplayList">
                <div class="playList">
                    <div class="paly-Header">
                        <Icon name="play-circle-o" size={20} color="#333333"></Icon>
                        <div class="play-whole">
                            播放全部
                            <span class="play-whole-all">{`(${this.playlist.length > 500 ? '500+' : this.playlist.length})首`}</span>
                        </div>
                    </div>
                    {!this.loading && <Loading style={{marginTop: '24px'}}></Loading>}
                    {this.playlist.filter((v, i) => i < 500).map((k, index) => {
                        const playStatus = this.playid === k.id
                        return (
                            <div class="playList-Item" onClick={(e) => {
                                /**/e.preventDefault()/**/
                                this.handelplay(k, index)
                            }}>
                                <div class="Item-index">
                                    {playStatus ? <Icon name="volume-o" color="#ee0a24" size={20}></Icon> : index + 1}
                                </div>
                                <div style={flexBox}>
                                    <div class="name van-ellipsis" style={{color: playStatus ? '#ee0a24' : '#333333'}}>{k.name}</div>
                                    <div class="singer-name van-ellipsis">{k.ar.map(v => v.name).join('/')} - {k.al.name}</div>
                                </div>
                                <div class="Item-icon">
                                    <Icon name="ellipsis" size={20}></Icon>
                                </div>
                            </div>
                        )
                    })}
                    { this.playlist.length > 500 ? this.loading && <Divider
                        dashed={true}
                        style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px'}}>
                            最多显示500条噢
                        </Divider> : this.loading && <Divider
                        dashed={true}
                        style={{color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px'}}>
                            没有更多了
                    </Divider>}
                </div>
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.SonplayList {
    flex: 1;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    transform: translate3d(0,0,0,);
}
.playList {
    overflow: hidden;
    .paly-Header {
        height: 40PX;
        display: flex;
        align-items: center;
        margin: 12px 24px 0;
        .play-whole {
            font-size: 16PX;
            color: #333333;
            font-weight: 600;
            margin-left: 10px;
        }
        .play-whole-all {
            font-size: 12PX;
            font-weight: normal;
            margin-left: 5px;
            color: #757575;
        }
    }
    .playList-Item {
        display: flex;
        height: 44PX;
        margin: 24px 0;
        overflow: hidden;
        .Item-index,.Item-icon {
            font-size: 14PX;
            color: #757575;
            width: 44PX;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .name {
            font-size: 16PX;
        }
        .singer-name {
            font-size: 12PX;
            color: #757575;
        }
    }
    
}
</style>