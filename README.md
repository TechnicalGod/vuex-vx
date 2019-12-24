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
    Prop,
    Vue,
    Watch
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
    // myName => 'dyh'
    @State("myName") private myName: any;
    @Mutation("setmyName") private setmyName: any;
    @Getter("getmyName") private getmyName: any;
    @Action("dispatchName") private dispatchName: any;
    @Module1.State("testState") private testState: any;
    @Module1.Mutation("testMutation") private testMutation: any;
    @Module1.Action("testAction") private testAction: any;
    @Module1.Getter("testGetter") private testGetter: any;
    // 这个模块使用与 Module是一样的, 个人习惯选即可
    @State("test", {
        namespace: "store1"
    })
    private getTest: any;
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
