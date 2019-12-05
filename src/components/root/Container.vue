<script>
export default {
    name: 'Container',
    render() {
        return (
            <div class="Container">
                {this.$slots.default}
            </div>
        )
    }
}
</script>

<style lang="less" scoped>
.Container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>