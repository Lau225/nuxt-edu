// 查看电子书章节
export function useBookMenuApi(id){
    return useHttpGet("bookMenu",`/book/menus?id=${id}`,{
        lazy:true
    })
}
// 查看电子书章节内容
export function useBookDetailApi(book_id, id) {
    return useHttpGet("bookDetail", `/book/detail?book_id=${book_id}&id=${id}`, {
      lazy: true,
    });
  }