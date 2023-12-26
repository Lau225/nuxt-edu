import {createDiscreteApi} from 'naive-ui'
 
export const useUser = () => useState("user", () => {
    return null
})

export async function useRefreshUserInfo() {
    const token = useCookie("token")
    const user = useUser()
    // 用户已登录
    if (token.value) {
        let { data, error } = await useGetinfoApi()

        if (data.value) {
            user.value = data.value
        }
    }
}

export async function useLogout(){
    await useLogoutApi()
    const user = useUser()
    user.value = null
    const token = useCookie("token")
    token.value = null
    const {message} = createDiscreteApi(["message"])
    message.success("退出成功")
    // 回到首页
    const route = useRoute()
    if(route.path != '/'){
        navigateTo('/',{replace:true})
    }
}

// 登录且绑定手机号才能操作
export function useHeadAuth(callback = null){
    const route = useRoute()
    const token = useCookie("token")
    const user = useUser()
    const {message} = createDiscreteApi(["message"])
    // 未登录
    if(!token.value){
        message.error("请先登录")
        return navigateTo("/login?form="+route.fullPath)
    }
    // 未绑定手机号
    const phone = user.value?.phone
    if(!phone && route.name != 'bindphone'){
        message.error("请先绑定手机号")
        return navigateTo("/bindphone?from="+route.fullPath)
    }

    if(callback && typeof callback === 'function'){
        callback()
    }
}

// 点赞或者取消点赞
export function useHandleSupportPost(){
    const handleSupport = (item) => {
        useHeadAuth(async ()=>{
            // 行为判断
            let type = item.issupport ? 'unsupport' :'support'
            let msg = item.issupport ? '取消点赞' :'点赞'
          
            const {error} = await usePostSupportApi(item.id,type)
            
    
            // 操作失败直接返回
            if(error.value) return 
    
            // 点赞数 +1 / -1
            if(type === 'unsupport'){
                item.support_count --
            }else{
                item.support_count ++
            }
    
            item.issupport = !item.issupport
    
            const { message } = createDiscreteApi(["message"])
    
            message.success(msg + '成功')
        })
    }
    return {
        handleSupport,
    }
}