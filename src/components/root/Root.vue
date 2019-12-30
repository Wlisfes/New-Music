<script>
export default {
    name: 'Root',
    render() {
        return (
            <div class="Root" onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                {this.$slots.default}
            </div>
        )
    }
}
</script>

<style lang="less">
.Root {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
}
</style>