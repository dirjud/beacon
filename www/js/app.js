var app = new Vue({
    el: "#app",
    data : {
        ads : {}
    }
});

document.addEventListener('deviceready', () => {
    ble.startScanWithOptions(
        [],
        { reportDuplicates : true },
        function(ad) {
            ad.date = new Date();
            console.log(ad.id);
            Vue.set(app.ads, ad.id, ad);
            //app.ads.push(ad);
        },
        function() {
            console.log("Fail");
        }
    );
    setInterval(clean, 5000);
});

function clean() {
    var now = new Date();
    var del = [];
    for(var id in app.ads) {
        if(now.getTime() > app.ads[id].date.getTime() + 20000) {
            del.push(id);
        }
    }
    for(var idx=0; idx<del.length; idx++) {
        delete app.ads[del[idx]];
    }
}

//// Init F7 Vue Plugin
//Vue.use(Framework7Vue)
//
//// Init Page Components
//Vue.component('page-about', {
//  template: '#page-about'
//})
//Vue.component('page-form', {
//  template: '#page-form'
//})
//Vue.component('page-dynamic-routing', {
//  template: '#page-dynamic-routing'
//})
//
//// Handle device ready event
//// Note: You may want to check out the vue-cordova package on npm for cordova specific handling with vue - https://www.npmjs.com/package/vue-cordova
//document.addEventListener('deviceready', () => {
//    console.log("DEVICE IS READY!");
//    debugger;
//    ble.startScan(
//        [],
//        function(device) {
//            console.log("Success");
//            console.log(device);
//        },
//        function() {
//            console.log("Fail");
//            console.log(device);
//        }
//    );
//
//    
//}, false)
//
//// Init App
//new Vue({
//  el: '#app',
//  // Init Framework7 by passing parameters here
//  framework7: {
//    root: '#app',
//    /* Uncomment to enable Material theme: */
//    // material: true,
//    routes: [
//      {
//        path: '/about/',
//        component: 'page-about'
//      },
//      {
//        path: '/form/',
//        component: 'page-form'
//      },
//      {
//        path: '/dynamic-route/blog/:blogId/post/:postId/',
//        component: 'page-dynamic-routing'
//      }
//    ],
//  }
//});
//
//
//
//

