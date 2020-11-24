<template>
  <a-result status="500" :title="$system_functions.get_label('msg_site_offline_title')" :sub-title="$system_functions.get_label('msg_site_offline_message')">
    <template #extra>
      <a-button onclick="window.location.reload();" type="primary">{{$system_functions.get_label('button_refresh_page')}}</a-button>  
    </template>
  </a-result>
</template>