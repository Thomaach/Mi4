var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },
    {
    path: '/form/',
    componentUrl: './pages/form-storage.html',
    name: 'form',
 
  },
    
  {
    path: '/mainscreen/',
    url: './pages/mainscreen.html',
    name: 'mainscreen',
  },

  
  {
    path: '/login-screen-page/',
    componentUrl: './pages/login-screen-page.html',
      
  },
      {
    path: '/play/',
    componentUrl: './pages/play.html',
    on: {
        pageInit: function (e, page) {  
        
        //document.getElementById("Next").onclick(Questions(gegevens));
        //$('#Next').click(Questions(gegevens));
        var gegevens;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            gegevens = JSON.parse(this.responseText);
            Questions(gegevens);
             
        } else{
             
            return;
          }  
        }
        
        function Questions(gegevens){
            
            
        
           for (var i = 0; i <= 2; i++){
            var keuze = Math.floor(Math.random()* 4);
            if (keuze === 0){
                        
                        $('#Question').append(gegevens.data[i].Question);
            
                        var string = "<form id=vragen" + i +"><input type=radio id = "+ gegevens.data[i].Question_ID + " value="+ gegevens.data[i].Answer_Right +" name=antwoord" + i +">" + gegevens.data[i].Answer_Right + "<br><input type=radio name=antwoord>" + gegevens.data[i].Answer_Wrong1 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong3 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong2 + "</form>";
                    
                        $('#Question').append(string);
                }
            else if (keuze == "1"){
                
                        $('#Question').append(gegevens.data[i].Question);
            
                        var string = "<form id=vragen" + i +"><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong1 + "<br><input type=radio  id = "+ gegevens.data[i].Question_ID + "   value="+ gegevens.data[i].Answer_Right +" name=antwoord" + i +">" + gegevens.data[i].Answer_Right + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong3 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong2 + "</form>";
                    
                        $('#Question').append(string);
                     }
            else if (keuze == "2"){
                
                        $('#Question').append(gegevens.data[i].Question);
            
                        var string = "<form id=vragen" + i +"><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong2 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong3 + "<br><input type=radio  id = "+ gegevens.data[i].Question_ID + " value="+ gegevens.data[i].Answer_Right +" name=antwoord" + i +">" + gegevens.data[i].Answer_Right + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong1 + "</form>";
                    
                        $('#Question').append(string);
                     }
            else if (keuze == "3") {
                
                        $('#Question').append(gegevens.data[i].Question);
            
                        var string = "<form id=vragen" + i +"><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong3 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong2 + "<br><input type=radio name=antwoord" + i +">" + gegevens.data[i].Answer_Wrong1 + "<br><input type=radio  id = "+ gegevens.data[i].Question_ID + " value="+ gegevens.data[i].Answer_Right +" name=antwoord" + i +">" + gegevens.data[i].Answer_Right + "</form>";
                    
                        $('#Question').append(string);
             }
            }
                
           
           
        }
        
            
         
        
       //http://quizmobile.000webhostapp.com/dummy/public/api/v1/getQuestion
       //http://mobilequiz.epizy.com/dummy/public/api/v1/getQuestion
        xhttp.open("GET", "http://quizmobile.000webhostapp.com/dummy/public/api/v1/getQuestion", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(); 
            
      }
    }
            
    }
  ,
  // Color Themes
  {
    path: '/color-themes/',
    componentUrl: './pages/color-themes.html',
  },

  // Page Loaders
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
    // additional context
    options: {
      context: {
        foo: 'bar',
      },
    },
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
    // additional context
    options: {
      context: {
        foo: 'bar',
      },
    },
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
