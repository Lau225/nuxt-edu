<template>
    <div>
      问答社区{{ $route.params.bbs_id }} ~ {{ $route.params.page }}
    </div>
  </template>
  
  <script setup>
  useHead({
        title:'社区列表',
        meta:[
        {name:"description",content:"社区描述"},
        {name:"keywords",content:"社区关键词"}
      ],
    })
  </script>
  
  <style>
  
  </style>