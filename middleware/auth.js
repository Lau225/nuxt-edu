// 通过这个中间件才能访问页面
import {createDiscreteApi} from 'naive-ui'
export default defineNuxtRouteMiddleware((to,from)=>{
    const token = useCookie("token")
    const user = useUser()
    const route = useRoute()
    const {message} = createDiscreteApi(["message"])
    if(!token.value){
        if(process.client){
            return navigateTo("/login?form="+route.fullPath)
            message.error("请先登录")
        }
    }
    // 未绑定手机号
    const phone = user.value?.phone
    if(!phone && route.name != 'bindphone'){
        if(process.client){
            message.error("请先绑定手机号")
        }
        return navigateTo("/bindphone?from="+route.fullPath)
    }
})