<template>
  <div>
      <div v-if="$system_variables.status_task_loaded==1">
        <a-card>
          This is HomePage
        </a-card>
        
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  mounted:function()
  {
      this.$system_variables.status_task_loaded=1;  
      this.$system_variables.status_data_loaded=1;   
           
  },
  data() {
    return {
      value: '',
      
    }
  },
  methods: {    
    
    
    
  },
}
</script>
