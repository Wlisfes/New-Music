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
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
</style>