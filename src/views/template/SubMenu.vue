<template functional>
   <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
       <span>{{ props.menuInfo.name }}</span>
     </span>
     <template v-for="item in props.menuInfo.children">
       <a-menu-item @click="props.on_task_click" v-if="!item.children" :key="item.id">         
          <router-link :to="'/'+item.controller.toLowerCase()">{{ item.name}}</router-link>
        </a-menu-item>
       <sub-menu v-else :key="item.id" :menu-info="item" />
     </template>
   </a-sub-menu>
 </template>

<script>

export default {
  props: {
      menuInfo:Object,
      on_task_click:Function
    }
    
  
  
};
</script>
