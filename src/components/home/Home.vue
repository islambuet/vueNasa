<template>
  <div>
      <div v-if="$system_variables.status_task_loaded==1">
        <a-card>
          <a-date-picker @change="onDateChange" />
          <a-button type="primary" @click="getAPOD">show data</a-button>
        </a-card>
        <a-card>
          <div v-if="loaded">
            <table>
              <tr>
                <td>Title</td>
                <td>{{data.title}}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{data.explanation}}</td>
              </tr>
            </table>      
            <img style="max-width:100%;" alt="Vue logo" :src="data.hdurl">      
          </div>
          <div v-else>
            {{message}}
          </div>
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
      date:'',
      loaded:false,
      message:'Loading api please wait',
      data:{}
      
    }
  },
  methods: {
    onDateChange(date, dateString) {
      this.date=dateString;      
    },
    getAPOD:function()
    {
      this.loaded=false;
      if(this.date==""){
        this.message="Please Select a Date";
      }
      else{
        
        this.$axios.get('https://api.nasa.gov/planetary/apod?api_key='+this.$system_variables.apiKey+'&date='+this.date)
        .then((response) => {
          if(response.data)
          {
            this.data=response.data;
            this.loaded=true;
          }
          else
          {
            this.message=response.msg;
          }
          
          
        })
        .catch(error => {  
              this.message="Api Response Error";
              
        }); 
      }
    }
    
  },
}
</script>
