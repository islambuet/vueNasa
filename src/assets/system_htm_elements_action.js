import Vue from 'vue'
var system_htm_elements_action= new Vue(
    {    
      methods:{
        click_change_language:function (event,language)
        {
          localStorage.setItem('language',language);  
          window.location.reload(); 
        },
        
        /*click_handler_password_eye:function (event,param)
        {
          var curelement=event.currentTarget;
          var input=$(curelement).siblings('input');
          if(input.attr('type')=='password')
          {
              $(curelement).find('i').removeClass('fe-eye').addClass('fe-eye-off');
              input.attr('type','text');
          }
          else
          {
              $(curelement).find('i').removeClass('fe-eye-off').addClass('fe-eye');
              input.attr('type','password');
          }         
        },
        
        click_task_links:function (event)
        {  
          $('#system_left_sidebar').removeClass('inactive');
          $('#system_content').removeClass('inactive_left_sidebar');
          $('#system_right_sidebar').removeClass('inactive');
          $('#system_content').removeClass('inactive_right_sidebar');  
        },*/
        
        /************
         * data-minimum-size-to-resize//1372022
         * data-resize-width//800
         * data-resize-height//600
        *************** */
        /*get_form_data_with_image_resize:async function(formid)
        {
          var inputs = document.getElementById(formid).getElementsByTagName('input');
          var formData=new FormData();
          for(var i=0;i<inputs.length;i++)
          {            
            if(inputs[i]['name'])
            {
              if(inputs[i]['type']=='file')
              {
                if(inputs[i].files[0])
                {
                  var resizedImage=null;                  
                  var file=inputs[i].files[0];
                  var file_type=file.type;
                  if(file_type && file_type.substr(0,5)=="image")
                  { 
                    var minimum_size_to_resize=1372022;//1372022=1.3mb,409600=400KB
                    if(inputs[i].hasAttribute('data-minimum-size-to-resize'))
                    {                      
                      minimum_size_to_resize=inputs[i].getAttribute('data-minimum-size-to-resize');                      
                    }
                    if(file.size>minimum_size_to_resize)
                    {
                      var resize_width = 800;;
                      if(inputs[i].hasAttribute('data-resize-width'))                      
                      {
                        resize_width=inputs[i].getAttribute('data-resize-width');   
                      }
                      var resize_height = 600;
                      if(inputs[i].hasAttribute('data-resize-height'))                      
                      {
                        resize_height=inputs[i].getAttribute('data-resize-height');   
                      }   
                      var img=new Image(); 
                      img.src=URL.createObjectURL(file);  
                      var width = img.naturalWidth;
                      var height = img.naturalHeight; 
                      if((width>resize_width)||(height>resize_height))
                      {
                        if((width/height)>(resize_width/resize_height))
                        {
                            height *= resize_width / width;
                            width = resize_width;
                        }
                        else
                        {
                            width *= resize_height / height;
                            height = resize_height;
                        }
                        var canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        var context = canvas.getContext("2d");
                        context.drawImage(img, 0, 0, width, height);
                        resizedImage=await new Promise(resolve => {
                            canvas.toBlob(function(blob)
                            {
                              resolve(blob);
                            });
                          });
                      }

                    }
                  }
                  if(resizedImage)
                  {
                    formData.set(inputs[i]['name'], resizedImage, file.name+'.png');                     
                  }
                  else
                  {
                    formData.set(inputs[i]['name'], file, file.name); 
                  }
                }
                
              }
              else
              {
                formData.set(inputs[i]['name'],inputs[i]['value']); 
              }
            }
          }          
          return  Promise.resolve(formData);
        }*/
      }
    }
  );
  Vue.prototype.$system_htm_elements_action=system_htm_elements_action