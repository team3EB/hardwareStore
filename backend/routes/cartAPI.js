/**
 * Created by alexadam on 19.01.16.
 */


module.exports=function(app){


    app.get('/cart',function(req, res){
        console.log(req.headers);
        console.log('hallo from server');
        // sessionstorage.setItem(1,'asdasd')
        //console.log('sessionstorage'+ sessionstorage.getItem(1));

    });


}