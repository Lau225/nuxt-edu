// 查看电子书章节
export function useBookMenuApi(id){
    return useHttpGet("bookMenu",`/book/menus?id=${id}`,{
        lazy:true
    })
}