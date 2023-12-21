export default defineNuxtPlugin((nuxtapp)=>{
    nuxtapp.provide("commonOpen",(item)=>{
        if(item.type == 'webview'){
            window.open(item.url)
        }else if(item.type == 'course'){
            navigateTo(`/detail/course/${item.course_id}`)
        }
    })
})