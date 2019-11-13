<script>
export default {
    name: 'Home',
    created () {
        // this.login()
    },
    methods: {
        async login() {
            const [err, res] = await this.api.login({
                phone: 18124963029,
                password: 'lifei7724300'
            })

            if(!err) {
                console.log(res)
            }
            else {
                console.error(err)
            }
        }  
    },
    render() {
        return (
            <div class="Home">
                Home
            </div>
        )
    }
}
</script>