export default defineNuxtRouteMiddleware((to,from)=>{
    const {id,type} = to.query
    const t = {
        course:"课程",
        column:"专栏",
        live:"直播",
        book:"电子书",
        group:"拼团",
        flashsale:"秒杀"
    }
    if(Object.keys(t).includes(type) && !isNaN(+id)){
        const title = "创建订单"
        useHead({title})
        return true
    }
    return abortNavigation("页面不存在")
})