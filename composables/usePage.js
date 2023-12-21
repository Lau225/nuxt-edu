export async function usePage(initListApiCallback) {
    const route = useRoute()
    const limit = ref(10);
    const page = ref(parseInt(route.params.page));
    const { data, pending, refresh, error } = await initListApiCallback({
        page:page.value,
        limit:limit.value
    })
    const rows = computed(() => data.value?.rows ?? []);
    const total = ref(data?.count)

    const handlePageChange = (p) => {
        navigateTo({
          params: {
            ...route.params,
            page: p,
          },
          query: {
            ...route.query,
          },
        });
      };

      return {
        page,limit,data,pending,error,refresh,rows,total,handlePageChange
      }
}