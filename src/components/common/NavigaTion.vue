<script>
import { NavBar, Icon, Tab, Tabs } from 'vant'
import play from '@assets/icon/play.gif'
import stop from '@assets/icon/stop.png'
export default {
	name: 'NavigaTion',
	props: {
		active: {
			type: Number,
			default: 0
		},
		play: {
			type: Boolean,
			default: false
		}
	},
	render() {
		return (
			<NavBar
				class="NavigaTion"
				onClick-left={() => {
					this.$emit('search')
				}}
				onClick-right={() => {
					this.$emit('player')
				}}
			>
				<Icon
					slot="left"
					name="search"
					color="#ee0a24"
					size={20}
					style={{ cursor: 'pointer' }}
				></Icon>
				<div slot="title" class="Center">
					<Tabs
						type="card"
						active={this.active}
						onChange={index => {
							this.$emit('change', index)
						}}
					>
						<Tab title="推荐"></Tab>
						<Tab title="我的"></Tab>
						<Tab title="歌手"></Tab>
					</Tabs>
				</div>
				<Icon
					slot="right"
					name={this.play ? play : stop}
					size={20}
					style={{ cursor: 'pointer' }}
				></Icon>
			</NavBar>
		)
	}
}
</script>

<style lang="less">
.NavigaTion {
	.van-nav-bar__title {
		width: 60%;
	}
	.Center {
		/*prettier-ignore*/
		height: 46PX;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.van-tabs__nav--card {
			margin: 0;
		}
	}
}
</style>
