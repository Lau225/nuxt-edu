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