/**
 * ImgController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var url = require('url'),
	gm = require('gm'),
	http = require('http'),
	fs = require('fs'),
    request = require('request'),
    crypto = require('crypto');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    var imagen = 'img/original/'+filename+'.png';

    // Dounload
    request(uri).pipe(fs.createWriteStream( imagen )).on('close', callback );

  });
};

var resize = function( imagen, width, height, res ){
	// Rezise
	console.log( "Resizing... ");

    var srcData = require('fs').readFileSync( 'img/original/'+imagen+'.png' );

    if ( fs.existsSync('./img/sized/'+imagen+'_'+width+'_'+height+'.png') ) {
    	console.log( "El archivo redimensionado ya existe." );
	    res.sendfile( './img/sized/'+imagen+'_'+width+'_'+height+'.png', { maxAge: 6000000 } );
	}else{
		// returns a Buffer instance
		console.log( "Generando archivo redimensionado." );

		var m = gm( srcData ).resize( width, height ).quality( 0 ).compress('LZMA');

		m.write( 'img/sized/'+imagen+'_'+width+'_'+height+'.png', function( err, stdout, stderr ){
				if( err ) console.log( err );
				console.log('It\'s saved!');
	    		res.sendfile( './img/sized/'+imagen+'_'+width+'_'+height+'.png', { maxAge: 6000000 } );
		});
		
	}

 
};

module.exports = {
	resize: function( req, res ){
		shasum = crypto.createHash('sha1');

		var img_url = url.parse( req.param('src') );
		shasum.update( req.param('src' ) );

		console.log("Resize request");
		console.log ( req.param( 'width' ) );
		console.log ( req.param( 'height' ) );
		console.log ( req.param( 'src' ) );

		var options = {
		  filename: shasum.digest('hex'),
		  host: img_url.hostname,
		  port: 80,
		  path: img_url.path
		};

		console.log( options );

		if (fs.existsSync( 'img/original/'+options.filename+'.png' )) {
		  console.log( "El archivo solicitado ya ha sido descargado." );
		  resize( options.filename , req.param( 'width' ), req.param( 'height' ), res );
		}else{
			console.log( "Descargando archivo." );
			download( req.param('src'), options.filename , function(){
			  console.log('done');
			  resize( options.filename , req.param( 'width' ), req.param( 'height' ), res );
			});
		}

	}
};
