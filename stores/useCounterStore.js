export const useCounterStore = defineStore('counter', {
   state: () => ({ count: 0, name: 'Eduardo' }),
   getters: {
     doubleCount: (state) => state.count * 2,
   },
   actions: {
     increment() {
       this.count++
     },
   },
 })


//  export const useCounterStore = defineStore('manu', () => {
//    const counter = ref(0);
 
//    function toggleCounter(val) {
//      counter = val;
//    }
 
//    return { toggleCounter, counter}
//  })

