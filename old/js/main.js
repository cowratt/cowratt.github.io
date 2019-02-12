var app = function() {
    Vue.config.devtools = true;
    var self = {};

    Vue.config.silent = false; // show all warnings


    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            //booleans
            page_loaded: false,
            mode: "none",
            showSidebar: false,
            cards: [
                {
                    "title": "Music",
                },
                {
                    "title": "Art",
                },
                {
                    "title": "Code",
                },

            ],
        },
        methods: {
            onload: function() {
               
            },
            setMode: function(m) {
                if(m === self.vue.mode) return;
                if(self.vue.showSidebar){
                    self.vue.showSidebar = false;
                    window.setTimeout(
                        function () {
                            self.vue.setMode(m);
                        }, 550);
                }else{
                    if (self.vue.mode == "title"){
                        self.vue.mode = m;
                        window.setTimeout(
                            function () {
                                if(m == "Music" || m == "Art" || m == "Code"){
                                    self.vue.showSidebar = true;
                                }
                                else self.vue.showSidebar = false;
                            }, 550);
                    }
                    else{
                        self.vue.mode = m;
                        if(m == "Music" || m == "Art" || m == "Code"){
                                    self.vue.showSidebar = true;
                            }
                            else self.vue.showSidebar = false;
                    }
                }


                
            },
        }

    });

    $("#vue-div").show();
    self.vue.mode = "title";
    return self;
};

var APP = null;


// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});


function fadeIn(element) {
    element.className += " fadeIn infinite";
    console.log(element.className);
}
const image = new Image();
image.src = "../img/code.jpg";