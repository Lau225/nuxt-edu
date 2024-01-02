<template>
  <div id="mse">

  </div>
</template>

<script setup>
    const player = ref(null)
    const props = defineProps({
        url:String
    })
    onMounted(()=>{
        player.value = new Player({
            id:'mse',
            url:props.url,
            width:null,
            height:450,
            playsinline:true
        })
    })

    onBeforeUnmount(()=>player.value.destroy())
</script>

<style>

</style>