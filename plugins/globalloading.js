import {createDiscreteApi} from 'naive-ui'
export default defineNuxtPlugin((nuxtapp)=>{
    const bar = ref(null)
    nuxtapp.hook("app:mounted",(e)=>{
        if(!bar.value){
            const {loadingBar} = createDiscreteApi(["loadingBar"])
            bar.value = loadingBar
        }
    })
    nuxtapp.hook("page:start",(e)=>{
        bar.value?.start()
    })
    nuxtapp.hook("page:finish",(e)=>{
        setTimeout(() => {
            bar.value?.finish()
        }, 150);
    })
    nuxtapp.hook("app:error",(e)=>{
        if(process.client){
            setTimeout(() => {
                bar.value?.finish()
            }, 150);
        }
    })
})