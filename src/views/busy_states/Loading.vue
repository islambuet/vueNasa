<template>
    <div id="system_loading">
       <a-spin id="system_loading_spin"/>       
    </div>
</template>
<style>
#system_loading {
    text-align: center; 
    position: fixed;    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    background: rgba(0, 0, 0, 0.05);
    opacity: .5;
}  
#system_loading_spin {    
    position: absolute;    
    top:40%;
    
}  
</style>
