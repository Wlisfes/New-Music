
import { Button } from 'vant';
import style from './App.module.less';
export default {
    name: 'App',
    created() {
        console.log(style)
    },
    render() {
        return (
            <div id="app">
                <div class="aps">
                    <Button>刀剑神域</Button>
                </div>
                <Button>刀剑神域</Button>
                <router-view></router-view>
            </div>
        )
    }
}