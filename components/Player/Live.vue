<template>
    <div id="video" class="rounded">
  
    </div>
  </template>
  
  <script setup>
      const player = ref(null)
      const props = defineProps({
          url:String
      })
      onMounted(()=>{
          player.value = new FlvPlayer({
              id:'video',
              url:props.url,
              width:null,
              height:450,
              playsinline:true,
              isLive:true
          })
      })
  
      onBeforeUnmount(()=>player.value.destroy())
  </script>
  
  <style>
  
  </style>