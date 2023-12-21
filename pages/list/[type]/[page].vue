<template>
    <div>
      公共列表{{ $route.params.type }} ~ {{ $route.params.page }}
    </div>
  </template>
  
  <script setup>
  useHead({
        title:'公共列表',
        meta:[
        {name:"description",content:"公共列表描述"},
        {name:"keywords",content:"公共列表关键词"}
      ],
    })
  </script>
  
  <style>
  
  </style>