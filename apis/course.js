// 获取课程列表
export function useCourseListApi(page){
    return useHttpGet("courseList",`/course/list?page=${page}`,{
        lazy:true
    })
}

// 查看课程详情
export function useReadCourseApi(query = {}){
    let q = useQueryToString(query)
    return useHttpGet("readCourse",`/course/read${q}`,{
        lazy:true
    })
}

// 精品推荐
export function useHotCourseListApi(){
    return useHttpGet("hotCourseList",`hot`,{
        lazy:true
    })
}