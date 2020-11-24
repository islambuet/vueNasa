<template>
<a-layout-sider
      v-model="sidebar_inactive"     
      collapsedWidth=0
      :style="{height: '100vh','z-index':'100'}"
      :width="250"
      :collapsible="true"      
      :class="'d-print-none'"
      :id="'sidebar_left'"
    >
    <div :style="{overflow: 'auto',height: '100%'}">
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item @click="on_task_click"> <router-link to="/">{{$system_functions.get_label('label_dashboard')}}</router-link></a-menu-item>        
        <sub-menu v-for="item in $system_variables.user.tasks" :key="item.id" :menu-info="item" :on_task_click="on_task_click"/> 
      </a-menu>             
    </div>
    </a-layout-sider>
</template>
<script>
import SubMenu from "./SubMenu.vue";
export default {
  name: 'Sidebar',  
  components:{SubMenu},  
  data() {
    return {
      sidebar_inactive:false
    };
  },
  mounted: function()//before create
  {
    //console.log(window.innerWidth); 
    //console.log(screen.width); 
    if(window.innerWidth<992)
    {
      this.sidebar_inactive=true
    }
  },
  methods: {    
    on_task_click()
    {
      if(window.innerWidth<992)
      {
        this.sidebar_inactive=true;        
      }
    }
      
  },
};

</script>

