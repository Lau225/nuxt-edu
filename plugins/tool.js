export default defineNuxtPlugin((nuxtapp)=>{
    nuxtapp.provide("commonOpen",(item)=>{
        if(item.type == 'webview'){
            window.open(item.url)
        }
    })
})