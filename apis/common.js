export function useSearchListApi(query){
    let q = useQueryToString(query)
    return useHttpGet("searchList",`/search${q}`,{
        lazy:true
    })
}