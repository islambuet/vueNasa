<template>
  <a-result status="403" :title="$system_functions.get_label('msg_loading_access_deny_title')" :sub-title="$system_functions.get_label('msg__access_deny_message')">
    <template #extra>
      <router-link to="/" class="ant-btn ant-btn-primary ant-btn-md">{{$system_functions.get_label('button_back_home_page')}}</router-link>
    </template>
  </a-result>
</template>