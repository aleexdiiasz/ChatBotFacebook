var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var messageData = {}
const APP_TOKEN='EAApraeEkECYBADT9TZBFmZCLMcgMPeJ4cGg4ZCZB0QjidYLueFMTH1cKkrOWQqhamepFSFBQUwm2K660DXh9dS1pOgzn0cBCR8qPoCOC3S1MVFHCgS7BDqF91sLZAZACFqYWYu50oipzZBhXPjbIzx1DkIRGegN8CXeYZC6cnybZBDZB6logZAdZBRVH1ZBVa8jvNbG4ZD';

var app = express();
app.use(bodyParser.json());

// app.post('https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+APP_TOKEN),function(req,res)

var options = {
	uri: 'https://graph.facebook.com/v2.6/me/messenger_profile?access_token='+(APP_TOKEN),
	method: 'POST',
	json: {
	  "get_started":{"payload": "INICIO"}
	}
  };
  
  request(options, function (error, response, body) {
	if (!error && response.statusCode == 200) {
	  console.log(body.id) // Print the shortened url.
	}
  });

//Asignar un puerto
app.set('port', 3000) 
//////////////////////

app.listen(app.get('port'), function() {
	console.log('Servidor en linea, puerto: ', app.get('port'))
	})


app.get('/', function(req, res){
res.send('BIENVENIDO AL TALLER');
});

app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token'] === 'test_token_say_hello'){
		res.send(req.query['hub.challenge']);
	}
	else {
		res.send('NO PUEDES ENTRAR AQUI');
	}

});

app.post('/webhook', function(req, res){
var data=req.body;
if(data.object == 'page'){

	data.entry.forEach(function(pageEntry){
		pageEntry.messaging.forEach(function(messagingEvent){
			
			console.log("Entro");

			if(messagingEvent.message){
				receiveMessage(messagingEvent);
			}
		});
});

	res.sendStatus(200);
}
});

function receiveMessage(event){
var senderID = event.sender.id;
var messageText = event.message.text;

 	// console.log(senderID);
 	// console.log(messageText);

evaluateMessage(senderID, messageText);
}



////////////////////Inicio//////////////////////////////////////////////////////////
function evaluateMessage(receptorId,message){
	var finalMessage = '';
	if (isContain(message,'Empezar')){
			messageData ={
			"recipient":{
				"id":receptorId
			},
			"messaging_type": "RESPONSE",
			"message":{
				"text": "🤖 Hola, soy el Bot de AlexDev." + "\n \nEstas son algunas de las opciones con las que te puedo ayudar... 🤔",
				"quick_replies":[
				{
					"content_type":"text",
					"title":"Cotizaciones 💻",
					"payload":"<POSTBACK_PAYLOAD>",
				},{
					"content_type":"text",
					"title":"Ayuda 🔍",
					"payload":"<POSTBACK_PAYLOAD>",
				},{
					"content_type":"text",
					"title":"Acerca de ❓",
					"payload":"<POSTBACK_PAYLOAD>",
				}
				]
			}
		};
		callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////Cotizaciones/////////////////////////////////////////////////////////////
}else if(isContain(message,'Cotizaciones 💻')){
	messageData ={
		"recipient":{
			"id":receptorId
		},
		"messaging_type": "RESPONSE",
		"message":{
			"text" : "Excelente" + "\n¿Que tipo de servicio deseas cotizar? 🤔",
			"quick_replies":[
			{
				"content_type":"text",
				"title":"Pagina Web 🌐",
				"payload":"<POSTBACK_PAYLOAD>",
			},{
				"content_type":"text",
				"title":"Software 👨‍💻",
				"payload":"<POSTBACK_PAYLOAD>",
			},{
				"content_type":"text",
				"title":"Base de datos 💾",
				"payload":"<POSTBACK_PAYLOAD>",
			}
			]
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////


//.......................................................................................................................//



//.......................................................................................................................//
////////////////////////Acerca de /////////////////////////////////////////////////////////////
} else if (isContain(message,'Acerca de ❓')){
	messageData ={
		"recipient":{
			"id":receptorId
		},
		"messaging_type": "RESPONSE",
		"message":{
			"text" : "¿Que te gustaria saber acerca de AlexDev? 🤔",
			"quick_replies":[
			{
				"content_type":"text",
				"title":"Horarios 🕔",
				"payload":"<POSTBACK_PAYLOAD>",
			},{
				"content_type":"text",
				"title":"Ubicacion 🗺️",
				"payload":"<POSTBACK_PAYLOAD>",
			},{
				"content_type":"text",
				"title":"Contacto 📲",
				"payload":"<POSTBACK_PAYLOAD>",
			},{
				"content_type":"text",
				"title":"Blog Personal 🌐",
				"payload":"<POSTBACK_PAYLOAD>",
			}
			]
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////Horarios  /////////////////////////////////////////////////////////////
} else if (isContain(message,'Horarios 🕔')){
	messageData ={
		"recipient":{
			"id":receptorId
		},
		"messaging_type": "RESPONSE",
		"message":{
			"text" : "Nuestros horarios de oficina son:" +
			"\nLunes a Viernes de 9:00 a 18:00." +
			"\nSabados de 9:00 a 13:00" +
			"\nDomingos de 12:00 a 14:00" + 
			"\m💻😎",
			
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////Ubicacion /////////////////////////////////////////////////////////////
} else if (isContain(message,'Ubicacion 🗺️')){
	messageData={
		"recipient":{
			"id":receptorId
		},
		"message":{
		"attachment":{
			"type":"template",
			"payload":{
			"template_type":"button",
			"text":"Tambien puedes visitarnos en:" +
			"\nCalle Nayarit #12, Republica Mexicana, 55705, San Francisco Coacalco, Mexico. 🗺️",
			"buttons":[
				{
					"type": "web_url",
					"title": "Ver Mapa 🗺️",
					"url": "https://www.google.com/maps/place/Nayarit+12,+Republica+Mexicana,+55705+San+Francisco+Coacalco,+M%C3%A9x./@19.6220508,-99.1095351,17z/data=!3m1!4b1!4m5!3m4!1s0x85d1f6a9f2fdccff:0x8d5a20e26545d3ab!8m2!3d19.6220508!4d-99.1073464",
					"webview_height_ratio": "full"
				}
			]
			}
		}
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////Contacto /////////////////////////////////////////////////////////////
} else if (isContain(message,'Contacto 📲')){
	messageData={
		"recipient":{
			"id":receptorId
		},
		"message":{
		"attachment":{
			"type":"template",
			"payload":{
			"template_type":"button",
			"text":"Puedes llamarnos dentro del horario de oficina y te responderemos con gusto. 🕗📱",
			"buttons":[
				{
				"type":"phone_number",
				"title":"Llamar 📳👨‍💻",
				"payload":"+5215515676006"
				}
			]
			}
		}
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////Blog Personal /////////////////////////////////////////////////////////////
} else if (isContain(message,'Blog Personal 🌐')){
	messageData={
		"recipient":{
			"id":receptorId
		},
		"message":{
		"attachment":{
			"type":"template",
			"payload":{
			"template_type":"button",
			"text":"Aqui publico varios temas que podrian interesarte. 💻",
			"buttons":[
				{
					"type": "web_url",
					"title": "Blog 🌐",
					"url": "https://blog.luispastendev.com/",
					"webview_height_ratio": "full"
				}
			]
			}
		}
		}
	};
	callSendAPI(messageData);
////////////////////////////////////////////////////////////////////////////////////////////////////
//.......................................................................................................................//


	// }else if(isContain(message,'Llamar') || isContain(message,'Contacta') || isContain(message,'Contacto')){
	// 	messageData={
	// 	"recipient":{
	// 		"id":receptorId
	// 	},
	// 	"message":{
	// 	"attachment":{
	// 		"type":"template",
	// 		"payload":{
	// 		"template_type":"button",
	// 		"text":"Comunicate inmediatamente con un asesor 📞 o ingresa al sitio web 🌐",
	// 		"buttons":[
	// 			{
	// 			"type":"phone_number",
	// 			"title":"CEO Luis Pasten 👨‍💻",
	// 			"payload":"+5215515676006"
	// 			},
	// 			{
	// 				"type": "web_url",
	// 				"title": "Checa mi Blog 🌐",
	// 				"url": "https://blog.luispastendev.com/",
	// 				"webview_height_ratio": "full"
	// 			}
	// 		]
	// 		}
	// 	}
	// 	}
	// };
	// callSendAPI(messageData);
	
}else if(isContain(message,'Cotiza') || isContain(message,'Coticé')){
		messageData ={
			"recipient":{
				"id":receptorId
			},
			"messaging_type": "RESPONSE",
			"message":{
				"text": "Excelente, ¿qué tipo de servicio deseas cotizar?",
				"quick_replies":[
				{
					"content_type":"text",
					"title":"Pagina web",
					"payload":"<POSTBACK_PAYLOAD>",
					"image_url":"https://i.imgur.com/J3zSgeV.jpg"
				},{
					"content_type":"text",
					"title":"Tienda Online",
					"payload":"<POSTBACK_PAYLOAD>",
					"image_url":"https://i.imgur.com/J3zSgeV.jpg"
				},{
					"content_type":"text",
					"title":"Base de datos",
					"payload":"<POSTBACK_PAYLOAD>",
					"image_url":"https://i.imgur.com/J3zSgeV.jpg"
				}
				]
			}
		};
		callSendAPI(messageData);
	}else{
		finalMessage ='solo se repetir las cosas: ' + message;
	}
//  sendMessageText(receptorId, finalMessage);
}

function callSendAPI(messageData){
request({
	uri:'https://graph.facebook.com/v4.0/me/messages',
	qs: {access_token :  APP_TOKEN},
	method: 'POST',
	json: messageData
}, function(error,response, data){

if(error){
	console.log('ERROR ENVIO');
}else{
	console.log('ENVIADO');
}

});

}

function isContain(sentence, word){
 	return sentence.indexOf(word) > -1;

 }



