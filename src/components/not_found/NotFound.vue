<template>
  <a-result status="404" :title="$system_functions.get_label('msg_404_title')" :sub-title="$system_functions.get_label('msg_404_message')">
    <template #extra>
      <a-button onclick="window.location.reload();" type="primary">{{$system_functions.get_label('button_refresh_page')}}</a-button>  
    </template>
  </a-result>
</template>
<script>
export default { 
  name: "NotFound", 
  mounted:function()
  {   
    console.log('404 monted');    
  },  
  
};
</script>