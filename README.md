# 使用方法
```javascript
<template>
<div>
    <h1>vx</h1>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import {
    State,
    Mutation,
    Getter,
    Action,
    Module
} from "vuex-vx";
/* 当store 存在多个模块的时候 可以使用 Module | @( State | Mutation, Getter | Action )(方法或者变量名,{ namespace: 模块名 })
   Module1：一样拥有 State , Mutation, Getter, Action
*/
const Module1 = Module("store1");
@Component
class vx extends Vue {
    // myName => 'dyh' 加上 '! | ?' 让ts知道这是必须的然后可以定义类型 不然按ts推断则为any
    @State("myName") private myName!: string;
    @Mutation("setmyName") private setmyName!: Function;
    @Getter("getmyName") private getmyName!: string;
    @Action("dispatchName") private dispatchName!: Function;
    @Module1.State("testState") private testState!: string;
    @Module1.Mutation("testMutation") private testMutation!: Function;
    @Module1.Action("testAction") private getAction!: Function;
    @Module1.Getter("testGetter") private getGetter!: string;
    // 这个模块使用与 Module是一样的, 个人习惯选即可
    @State("test", {
        namespace: "store1"
    })
    private getTest!: string;
    created() {
        /* store 基本使用 */
        let log = console.log;
        log(this.myName); //  state.myName => 'dyh'
        this.setmyName("newName"); // 相当于 store.commit('setmyName','newName')
        log(this.myName); // => newName
        this.dispatchName("dis"); // 相当于 store.dispatch('setmyName','dis')
        console.log(this.testState); // => testState
        console.log(this.getTest); // => testState2
    }
}
export default vx;
</script>
```
