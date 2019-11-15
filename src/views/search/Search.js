
import style from '@less/search/Search.module.less';
export default {
    name: 'Search',
    render() {
        return (
            <transition name="search-open" appear>
                <div class={style.Search} onTouchmove={(e) => {/**/e.preventDefault()/**/}}>
                    
                    

                </div>
            </transition>
        )
    }
}