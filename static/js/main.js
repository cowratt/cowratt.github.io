var app = new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    data: {
      found_pages: [],

      version: 1,
      user_name: 'World',
      forgettable: false,
      temp_forgotten: false,
      main_page_5_seconds: false,
      //about page
      temp_user_name: '',
      about_show_greeting: false,
      about_show_more_info: false,
      //art page
      song_over: false,
      art_progress: 0,
    },
    watch: {
      temp_user_name: function(value){
        //behavior for when about name is changed
        setTimeout(()=>{
          if(value == this.temp_user_name && value != this.user_name){
            this.submit_user_name()
          }
        }, 4000)
      },
      $data: {
        handler: (before,after)=>{
          //autosave all data changes
          processUpdate(before, after)
        },
        deep: true
      }
    },
    beforeMount(){
      //load cookies
      var data = Cookies.get()
      console.log(data)
      if (data["version"] == this['version']){
        for (var key in data){
          var temp = data[key]
          try{
            this[key] = JSON.parse(temp)
          }
          catch{
            this[key] = temp
          }
          console.log(this)
        }
      }

      //check if this is the first time visiting page
      var title = document.title
      console.log("title index", this.found_pages.indexOf(title) )
      if (this.found_pages.indexOf(title) == -1  ){
        this.found_pages.unshift(title)
      }
    },
    computed:{
      num_found_pages: function(){
        return this.found_pages.length
      }

    },
    methods: {
      submit_user_name(){
        this.about_show_greeting = true;
        this.user_name = this.temp_user_name;
        this.forgettable = true;
        setTimeout(()=>{
          this.about_show_more_info = true;
        },1300)
      },
      clearData(){
        //delete all data
        var data = Cookies.get()
        for (var key in data){
          Cookies.remove(key)
        }
        //display "forgotten" and redirect
        this.temp_forgotten = true
        setTimeout(()=>{
          window.location.replace("/");
        },1000)
      },
      art_advance(){
        this.art_progress += 1;
      }
    }
  });

var last = {}
function processUpdate(v1, v2){
  var diffs = find_diff(last,v2)
  Object.assign(last,v2)
  if (diffs == {}) return;
  for (key in diffs){
    if(!key.startsWith("temp")){
      Cookies.set(key, JSON.stringify(v2[key]),{ sameSite: 'strict' })
    }
  }
}

function find_diff(v1, v2){
  diff = {}
  for (var key in v2){
    //console.log(key, v1[key], v2[key])
    if(v1[key] != v2[key]) diff[key] = v2[key]
  }
  return diff
}
