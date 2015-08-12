var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	res.render('index');
});

router.post('/save', function(req, res) {

	var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

 	MongoClient.connect('mongodb://127.0.0.1:27017/datos', function(err, db) 
 	{
   		if(err)console.log(err)

	    console.log('conexion hecha ');
	    var collection = db.collection('puntos');
	    	var documento = {'name': req.body.name,'longitud':req.body.longitud ,'latitud':req.body.latitud };
	    	collection.insert(documento, function(err, docs) {
	      	res.status(200).json({'estado':true,'data':docs});
	    });
  	});
});

router.post('/find', function(req, res) {

	var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

 	MongoClient.connect('mongodb://127.0.0.1:27017/datos', function(err, db) 
 	{
   		if(err)console.log(err)

	    console.log('conexion hecha ');
	    var collection = db.collection('puntos');

	    collection.find().toArray(function(err, results)
		{
        	res.status(200).json(results);
       
        db.close();
      });
  	});
});



module.exports = router;
