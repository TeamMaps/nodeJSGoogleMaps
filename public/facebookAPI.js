 window.fbAsyncInit = function() {
    FB.init({
      appId      : '224816561339578',
      xfbml      : true,
      version    : 'v2.9'
    });
    FB.AppEvents.logPageView();
   };

   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//inicijalizacija

//FB.getLoginStatus(function(response) {
//  if (response.status === 'connected') {
 //   console.log('Logged in.');
 // }
 // else {
 //   FB.login();
 // }
//});