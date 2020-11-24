<template>
  <a-result status="500" :title="$system_functions.get_label('msg_loading_failed_title')" :sub-title="$system_functions.get_label('msg_loading_failed_message')">
    <template #extra>
      <a-button onclick="window.location.reload();" type="primary">{{$system_functions.get_label('button_refresh_page')}}</a-button>  
    </template>
  </a-result>
</template>