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
