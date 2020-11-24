import Vue from 'vue'
import router from '@/router'

function initial_data()
{
  var language=localStorage.getItem('language')? localStorage.getItem('language'):'en';
  return {   
    language:language,
    user:{
      token_auth:localStorage.getItem('token_auth')? localStorage.getItem('token_auth'):'',
      token_csrf:localStorage.getItem('token_csrf')? localStorage.getItem('token_csrf'):'',
      token_device:localStorage.getItem('token_device')? localStorage.getItem('token_device'):'',
      id: 0,
      name:language=='en'?'Guest':'অতিথি',
      profile_picture:"",
      info:{},
      tasks:[]
    },
    visitors:{
      tasks:[]
    }, 
    status_task_loaded:0,    //Loading=0,success=1,failed=-1,acceesdenied=-2,siteoffline=-3  for all page
    status_data_loaded:0,    //Loading=0,loaded=1
    labels:{},
    labels_task:{},
  }
}
//const initialData = () => ({})

var system_variables= new Vue(
    {    
      data:function(){  
        var tempdata=initial_data();                   
        return tempdata;
      },
      methods:{
        logout: function(){
          localStorage.setItem('token_auth','');
          localStorage.setItem('token_csrf','');
          this.user=initial_data().user;
          if(router.history.current.path!= '/')
          {
            router.push("/");
            
          }
        }
      }
    }
  );
  Vue.prototype.$system_variables=system_variables