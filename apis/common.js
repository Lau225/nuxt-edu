export function useSearchListApi(query){
    return useHttpGet("searchList",()=>{
        let q = useQueryToString(query())
        return `/search${q}`
    },{
        lazy:true
    })
}

// 获取可用优惠券列表
export function useCouponListApi(){
    return useHttpGet("CouponList","/coupon/list")
}

// 通用列表接口
export function useListApi(type,query = {}){
    let q = useQueryToString(query)
    return useHttpGet(type + "List",`/${type}/list${q}`,{
        lazy:true
    })
}

// 查看专栏/详情
export function useReadDetailApi(type,query = {}){
    let q = useQueryToString(query)
    return useHttpGet(type + "detail",`/${type}/read${q}`,{
        lazy:true
    })
}