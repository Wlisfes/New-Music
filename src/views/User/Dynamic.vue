<script>
import { Root } from '@/components/common';
export default {
	name: 'Dynamic',
	render() {
		return (
			<transition name="dynamic" appear>
				<Root class="Dynamic"></Root>
			</transition>
		);
	}
};
</script>

<style lang="less" scoped>
.dynamic-enter-active,
.dynamic-leave-active {
	transition: all 300ms;
}
.dynamic-enter,
.dynamic-leave-to {
	transform: translate3d(50%, 0, 0);
	opacity: 0;
}
.Dynamic {
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
}
</style>
