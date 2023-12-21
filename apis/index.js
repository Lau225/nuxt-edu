export function useIndexDataApi(){
    return useHttpGet("IndexData",'/index',{
        lazy:true
    })
}
export function useGroupDataApi(query){
    let q = useQueryToString(query)
    return useHttpGet("GroupData",`/group/list${q}`,{})
}