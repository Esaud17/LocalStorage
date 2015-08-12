$(document).ready(function () {

	console.log("aplicacion javascript");
	var chek_geolocation = false, chek_localStorage = false;
	var col = 'puntos';
	localStorage.setItem(col,null);

	var success = function(position)
	{
		var latitud = position.coords.latitude,
	    longitud = position.coords.longitude;
	}

	var success_local_storage = function(position)
	{
		var latitud = position.coords.latitude, longitud = position.coords.longitude;
		location.href="#pag3";
		console.log(" latitud: "+latitud+" longitud: "+longitud);

		var cordenadas='{"latitud":'+latitud+', "longitud":'+longitud+'}';
		var position= localStorage['length'];
		
		localStorage[col+position]= cordenadas;
		console.log(localStorage);
	}

	var  erro = function (msg) {
		console.error( msg );
	}


	if(navigator.geolocation)
	{
		console.log("geolocation True");
		chek_geolocation=true;
		$("#geolocation").prop('checked', true).checkboxradio('refresh');
		navigator.geolocation.getCurrentPosition(success, erro);

	}else
	{
		console.log("geolocation False");
		$("#geolocation").prop('checked', false).checkboxradio('refresh');
	}


	if(window.localStorage)
	{
		console.log("localStorage True");
		chek_localStorage=true;
		$("#webstorage").prop('checked', true).checkboxradio('refresh');

	}else
	{
		console.log("localStorage False");
		$("#webstorage").prop('checked', false).checkboxradio('refresh');
	}

	if(chek_geolocation==true && chek_localStorage==true)
	{
		setTimeout(function(){ location.href="#pag2"; },1000)

	}

	$("#addlocation").on('vclick',function(e){
		 console.log("obtener mis cordenadas");
		 navigator.geolocation.getCurrentPosition(success_local_storage, erro);
	 });

	$("#savelocation").on('vclick',function(e){

		console.log("save data");

		function callback (data,estado,xhr) 
	 	{
	 		console.log(data);
	 	};

		var contadorinit = localStorage['length'];
		for (var i = 1 ; i < contadorinit ; i++ )
		{
			var colum= col+(i.toString());
			 var cordenada=JSON.parse(localStorage[colum]);

			 var url='/save'
			 	,data={'name': colum,'longitud':cordenada.longitud ,'latitud':cordenada.latitud }
			 	,type ='json';

			 peticion_ajax(url,data,callback,type);
		};

		 localStorage.clear();
		 location.href="#pag4";
	 });

	$(document).on("pageshow","#pag3",function(){
		console.log(localStorage);
		var contadorinit = localStorage['length'];
		console.log("contador ="+contadorinit);
		var lista = ""
		for (var i = 1 ; i< contadorinit ; i++ )
		{
			 cordenada=JSON.parse(localStorage[col+(i.toString())])
			 lista+="<li>"+col+" #"+i+" longitud:"+cordenada.longitud +
			 "latitud:"+cordenada.latitud+"</li>";
		};
		console.log(lista);
		$("#lista").html(lista).listview('refresh');
	});

	$(document).on("pageshow","#pag4",function(){
		
		var url='/find'
	 	,data={}
	 	,type ='json';

		function callback (data,estado,xhr) 
	 	{
	 		console.log(data);
	 		var lista="";
	 		for (var i = 0 ; i< data.length; i++ )
			{
				 lista+="<li>"+data[i].name+" longitud:"+data[i].longitud +
				 "latitud:"+data[i].latitud+"</li>";
			};
	 		$("#listamongo").html(lista).listview('refresh');
	 	};

		peticion_ajax(url,data,callback,type);
	});

	function peticion_ajax(url,data,callback,type){
		$.post(url,data,callback,type);
	}

});

