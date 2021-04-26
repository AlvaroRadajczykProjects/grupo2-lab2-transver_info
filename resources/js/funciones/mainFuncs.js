function var_css_a_estilo( var_css ){
	var cadena = "";
	for( i in var_css ){
		cadena += i + ": " + var_css[i] + "; ";
	}
	return cadena;
}

function lista_invertida( lista ){
	
	var lista_reserva = [];
	
	if( lista.length > 1 ){
		for( var i = 0; i < lista.length; i++ ){ lista_reserva[i] = lista[ lista.length - 1 - i ]; }
		return lista_reserva;
	} else { return lista; }
	
}

function diccionario_al_reves( conj ){
	
	var lista = [];
	
	for( var i in conj ){ lista.push( i ); }
	
	lista = lista_invertida( lista );
	
	var diccionario_invertido = {};
	for( var i in lista ){ diccionario_invertido[ lista[i] ] = conj[ lista[i] ]; }
	
	return diccionario_invertido;
	
}

function rotarTodoElTiempo( objeto_html, freq, grad ){
	
	console.log( objeto_html );
	
	var variable = 0;
	
	window.setInterval( function(){
		
		if(variable < 360){ variable += grad; } else { variable = 0; }
		
		objeto_html.style.transform = "rotate(" + variable + "deg)";
		
	}, freq );
	
}