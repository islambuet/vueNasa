import Vue from 'vue'
import '@/assets/system_variables.js'
var system_functions= new Vue(
{    
    methods:{
        //language file
        load_languages:function()        
        {    
            var language_files=[
                {language:this.$system_variables.language,file:'languages/action.js'},
                {language:this.$system_variables.language,file:'languages/button.js'},
                {language:this.$system_variables.language,file:'languages/label.js'},
                {language:this.$system_variables.language,file:'languages/message.js'},
                {language:this.$system_variables.language,file:'languages/response.js'},
              ];
              
            this.$system_variables.labels={};
            try
            {
                for (var i = 0; i < language_files.length; i++) 
                {
                    var language=language_files[i].language;                
                    var filedata = require(`@/${language_files[i].file}`);               
                    for(var item in filedata.labels)
                    {
                        this.$system_variables.labels[item]=filedata.labels[item][language]?filedata.labels[item][language]:item;
                    }
                }          
            }
            catch(error){
                console.log(error);
            }
          
        },
        load_task_languages:function(language_files)        
        {     
            this.$system_variables.labels_task={};
            try
            {
                for (var i = 0; i < language_files.length; i++) 
                {
                    var language=language_files[i].language;                
                    var filedata = require(`@/${language_files[i].file}`);               
                    for(var item in filedata.labels)
                    {
                        this.$system_variables.labels_task[item]=filedata.labels[item][language]?filedata.labels[item][language]:item;
                    }
                }          
            }
            catch(error){
                console.log(error);
            }
          
        },
        get_label(key){        
            return this.$system_variables.labels[key]?this.$system_variables.labels[key]:key;
        },
        get_label_task(key){        
            return this.$system_variables.labels_task[key]?this.$system_variables.labels_task[key]:key;
        },
        set_page_title(title)
        {
            document.title=title;
        },
        get_form_data_with_auth(form_data)
        {
            form_data.append ('language', this.$system_variables.language);
            form_data.append ('token_auth', this.$system_variables.user.token_auth);
            form_data.append ('token_csrf', this.$system_variables.user.token_csrf);
            return form_data;
        },
        set_user: function(data)
        {
            // data == object {token_auth: 'value'}, ...
            for (var item in data){
                this.$system_variables.user[item] = data[item];
            }
        },
        get_msg_response_error: function()
        {
          return '<h4 class="alert-heading">'+this.get_label('msg_response_error_title')+'</h4>'+'<hr>'+
                  '<p>'+this.get_label('msg_response_error_body')+'</p>'+
                  '<p>'+this.get_label('msg_contact_with_admin')+'</p>';                    
        },
        response_error_task: function(response)
        {
            if(response.data.error_type=='SITE_OFF_LINE'){
                this.$system_variables.status_task_loaded=-3;
            } 
            else if(response.data.error_type=='UNAUTHORIZED'){
                this.$system_variables.status_task_loaded=-2;
            }            
            else {
                //var default_err_body='<p>'+this.get_label('msg_response_error_body')+'</p>\n\r'+'<p>'+this.get_label('msg_contact_with_admin')+'</p>'; 
                //var default_err_body=[h('p', 'Example Text'),h('p', 'Example Text')];
                //var err_body = (response.data.error_type==this.get_label(response.data.error_type)) ? default_err_body:response.data.error_type;                
                this.$notification.error({
                    message: this.get_label('msg_response_error_title'),                    
                    duration:10,
                    description: h => {
                        return h(
                          'div',             
                          [h('p', this.get_label('msg_response_error_body')),h('p', this.get_label('msg_contact_with_admin'))]
                        );
                      },
                  });
                
            }
        },
        
        //display seconds to string
        display_date:function(time)
        {
            if(parseInt(time) !=NaN)
            {
                var date=new Date(time * 1000);
                var day=date.getDate();
                if(day<10)
                {
                    day='0'+day;
                }
                return day+'-'+date.toLocaleString('en-GB', { month: 'short' })+'-'+date.getFullYear();
                //return date.toDateString().substr(0,19);
            }
            else
            {
                return '';
            }            
        },        
        /*//filter section
        //get display formated columns. columns=columns.display_columns
        get_display_columns:function(columns)
        {
            var display_columns=[];
            for(var field in columns)
            { 
                var column=columns[field];
                if(!column['hidden'])
                { 
                    var display_column = {};
                    display_column['key']=field;
                    display_column['label']=column['label'];
                    if(column['sticky_column'])
                    {
                        display_column['stickyColumn']=column['sticky_column'];
                    }
                    if(column['field_type']=='date')
                    {
                        var thisObj=this;
                        display_column['field_type']='date';
                        display_column['formatter']=function(value, key, item){ return thisObj.$system_functions.display_date(value)};
                    }
                    if(column['sortable'])
                    {
                        display_column['sortable']=column['sortable'];             
                    }   
                    display_columns.push(display_column);      
                }
            }  
            return display_columns;            
        },
        //for filter drop down on change
        on_change_filter_option:function(event,columns, field) 
        {
            if(columns[field]['child'])
            {
                //resttings childs
                for (var i=0; i < columns[field]['child']['reset_fields'].length; i++)
                {
                    var reset_field = columns[field]['child']['reset_fields'][i];                    
                    columns[reset_field].options = [];
                    columns[reset_field].value = columns[reset_field].default_value;
                }
                //setting childs options
                columns[columns[field]['child']['field']]['options']=columns[field]['child']['options'][columns[field]['value']];
            }
        },
        //b-table filtering filter_coulumns=columns.filter_columns
        get_filter_items:function (items,filter_columns)
        {   
            return items.filter((item)=>{            
                for(var field in filter_columns)
                {
                    var filter_column=filter_columns[field];
                    if(filter_column['filter_type']=='list')
                    {
                        if(filter_column['value']!='')
                        {                     
                            if(item[field]!=filter_column['value'])
                            {                         
                                return false;
                            }                    
                        }
                    }
                    else if(filter_column['filter_type']=='number')
                    {   
                        if(filter_column['fitler_from']['value'].length>0)
                        {
                            if(parseFloat(item[field])<parseFloat(filter_column['fitler_from']['value']))
                            {                        
                                return false;
                            }
                        }
                        if(filter_column['fitler_to']['value'].length>0)
                        {
                            if(parseFloat(item[field])>parseFloat(filter_column['fitler_to']['value']))
                            {                        
                                return false;
                            }
                        }
                    }
                    else if(filter_column['filter_type']=='date')
                    {
                        if(filter_column['fitler_start']['value'].length>0)
                        {                            
                            var starttime=new Date(filter_column['fitler_start']['value']).getTime() / 1000;
                            if(parseFloat(item[field])<starttime)
                            {                        
                                return false;
                            }
                        }
                        if(filter_column['fitler_end']['value'].length>0)
                        {                            
                            var endtime=new Date(filter_column['fitler_end']['value']).getTime() / 1000;
                            if(parseFloat(item[field])>endtime)
                            {                        
                                return false;
                            }
                        }
                    }
                    else
                    {
                        if(filter_column['value'].length>0)
                        {
                                                        
                            if(item[field].toLowerCase().indexOf(filter_column['value'].toLowerCase())==-1)
                            {
                                return false;
                            }                          
                        }
                    }
                  
                }                
                return true;}) 
        },
        //b-table data to csv        
        export_csv: function(headers,datas)
        {
            var csvStr="";
            for(var i=0;i<headers.length;i++)
            {
                csvStr=csvStr+'"'+headers[i].label+'",';
            }
            csvStr+="\n";
            for (var j=0;j<datas.length;j++)
            {
                for(var i=0;i<headers.length;i++)
                {
                    if(headers[i].fieldType=='date')
                    {
                        csvStr=csvStr+'"'+this.displayDate(datas[j][headers[i].key])+'",';
                    }
                    else
                    {
                        csvStr=csvStr+'"'+datas[j][headers[i].key]+'",';
                    }  
                }
                csvStr+="\n";
            }
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvStr);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'output.csv';
            hiddenElement.click();            
        }
        // set_user: function(data){
        //     if(data['session']) // Local Storage
        //     {
        //         for (const item in data.session){
        //             localStorage.setItem(item, data.session[item])
        //         }
        //     }
        //     if('system_variable' in data) // System Variable
        //     {
        //         for (const item in data.system_variable){
        //             if(typeof (data.system_variable[item]) === 'object'){
        //                 for(var info of data.system_variable[item]){
        //                     var key = String(Object.keys(info));  
        //                     this.$system_variables.user[item][key] = info[key];
        //                 }
        //             } else {
        //                 this.$system_variables.user[item] = data.system_variable[item];
        //             }
        //         }
        //     }
        // },
        // get_user: function(){
        //     return this.$system_variables.user;
        // },*/
    }
});
Vue.prototype.$system_functions=system_functions