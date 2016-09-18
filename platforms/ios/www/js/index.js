var URLESTABLECIMIENTOS = "https://establecimientos.grupomedios.com/";
var URLNOTICIAS = "https://www.dondeir.com/";
var URLDESCUENTOS = "http://www.grupomedios.com/";
var APIKEYGOOGLE = "AIzaSyDafy35NM4TR5UPgBwguekM40CGHqiwWj0";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    }
};

$(document).ready(function(){
    $('#menu').click(function(e){
        $('#contenedormenu').slideToggle('fast');
    });
    $.ajax({
            url : "templates/home.html",
             beforeSend : function(){
            },
            success : function(data){
               $('#content').html(data);
            }
        });
    $('#menuprincipal').addClass('animated bounceIn');
    /* CONTROLADOR NAVEGACIÓN */
    $(document).on("click", "a.navegar", function(e) { 
        e.preventDefault();
        $('#contenedormenu').hide();
        enlace = $(this).attr('href');
        id_single = $(this).attr('rel');
        $.ajax({
            url : enlace,
             beforeSend : function(){
                $('#loading').slideDown('fast');
            },
            success : function(data){
                $('#content').html(data);
                switch(enlace) {
                    /* HISTÓRICO DE RESTAURANTES */
                    case 'templates/restaurantes.html':
                    urlajax = URLESTABLECIMIENTOS+"api/v1/establecimientos?column=nombre&search=k&count=20&page=1&categoria=3"
                    var output = "";
                    $.ajax({
                        url : urlajax,
                        success : function(data){
                            $.each(data.marca, function(i, item) {
                                output += '<div class="restaurante"><a class="navegar " href="templates/single-restaurante.html" rel="'+item.id+'"><img src="'+item.img_donde+'" alt="" class="w100"></a><div class="descripcionrestaurante"><a class="navegar" href="templates/single-restaurante.html" rel="'+item.id+'"><h2>'+item.nombre+'</h2></a></div></div>';
                            });
                            $('#contenedorestaurantes').html(output);
                        $('#loading').slideUp('fast');
                        }
                    });
                    $('#loading').fadeOut('fast');
                    break;
                     /* HISTÓRICO DE noticias */
                    case 'templates/noticias.html':
                    urlajax = URLNOTICIAS+"api/get_recent_posts/";
                    var output = "";
                    $.ajax({
                        url : urlajax,
                        success : function(data){
                            $.each(data.posts, function(i, item) {
                                if (typeof(item.thumbnail_images) !=='undefined') {
                                    imagen = item.thumbnail_images.full.url;
                                }else{
                                    imagen = item.attachments.url;
                                }
                                titulo = item.title;
                                output += '<div class="restaurante"><a class="navegar " href="templates/single-noticia.html"><img src="'+imagen+'" alt="" class="w100"></a><div class="descripcionrestaurante"><a class="navegar" href="templates/single-restaurante.html"><h2>'+titulo+'</h2></a></div></div>';
                            });
                            $('#contenedornoticias').html(output);
                        $('#loading').slideUp('fast');
                        }
                    });
                    $('#loading').fadeOut('fast');
                    break;
                     /* HISTÓRICO DE descuentos */
                    case 'templates/descuentos.html':
                    urlajax = URLDESCUENTOS+"intranet/wsdesclub/?m=descuentos&o=0&l=10&c=21,50,53,62,63,64,65";
                    var output = "";
                    $.ajax({
                        url : urlajax,
                        success : function(data){
                            console.log(data);
                            $.each(data.Descuentos, function(i, item) {
                                imagen = item.logo_grande;
                                if(imagen == "http://www.grupomedios.com/intranet/imagenes/establecimientos/logos/"){
                                    imagen = item.logo_chico;
                                }
                                titulo = item.Marca;
                                output += '<div class="restaurante"><a class="navegar " href="templates/single-noticia.html"><img src="'+imagen+'" alt="" class="w100"></a><div class="descripcionrestaurante"><a class="navegar" href="templates/single-restaurante.html"><h2>'+titulo+'</h2></a></div></div>';
                            });
                            $('#contenedordescuentos').html(output);
                        $('#loading').slideUp('fast');
                        }
                    });
                    $('#loading').fadeOut('fast');
                    break;
                     /* HISTÓRICO DE antros y bares */
                    case 'templates/antros-y-bares.html':
                    urlajax = URLESTABLECIMIENTOS+"api/v1/establecimientos?column=nombre&search=k&count=20&page=1&categoria=4"
                    var output = "";
                    $.ajax({
                        url : urlajax,
                        success : function(data){
                            $.each(data.marca, function(i, item) {
                                imagen = item.img_donde;
                                if(imagen=="https://establecimientos.grupomedios.com/media/img/default.png"){
                                    imagen = "img/default.jpg";
                                }
                                output += '<div class="restaurante"><a class="navegar " href="templates/single-restaurante.html"><img src="'+imagen+'" alt="" class="w100"></a><div class="descripcionrestaurante"><a class="navegar" href="templates/single-restaurante.html"><h2>'+item.nombre+'</h2></a></div></div>';
                            });
                            $('#contenedorantrosybares').html(output);
                        $('#loading').slideUp('fast');
                        }
                    });
                    $('#loading').fadeOut('fast');
                    break;
                     /* SINGLE RESTAURANTE */
                    case 'templates/single-restaurante.html':
                    urlajax = URLESTABLECIMIENTOS+'/api/v1/establecimientos?column=id&query='+id_single+'&search=q';
                    $.ajax({
                        url : urlajax,
                        success : function(data){
                            item = data.marca[0];
                            console.log(item.sucursal);
                            $('#titulosingle').html(item.nombre);
                            $('#imagensingle').attr("src",item.img_donde);
                            $('#resenasingle').html(item.cms_resena);
                            var output="";
                            $.each(item.sucursal, function(i, sucursal) {
                                console.log(sucursal);
                                output += '<div class="sucursal"><h3>'+sucursal.nombre+'</h3><div class="mapa"><img src="https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=300x250&maptype=roadmap&markers=color:blue%7C'+sucursal.latitud+','+sucursal.longitud+'&key=AIzaSyDafy35NM4TR5UPgBwguekM40CGHqiwWj0"/></div></div>';

                            });
                            $('#sucursalessingle').html(output);
                        }
                    });
                    $('#loading').fadeOut('fast');
                    break;
                }
            }
        });
    });
})