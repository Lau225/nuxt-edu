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
