class Elemento{
	
	constructor( isid, estilo ){
		this.isid = isid;
		this.estilo = estilo;
	}
	
	eliminarme(){ 
		
		this.padre.html.removeChild( this.html );
		delete this.padre.getContenido()[ this.nombre ];
		
	};
	
	iniFunc( func ){ func(); }
	
}

class Grupo extends Elemento{
	
	constructor( isid, estilo, contenido ){
		super( isid, estilo );
		this.contenido = contenido;
	}
	
	setPadre( padre ){ 
	
		this.padre = padre; 
		if( padre == document.body ){ this.padre.html = padre; } 
		else { this.padre.html = padre.html } 
		
	}
	
	getContenido(){ return this.contenido; }
	
	vaciar(){
		
		for( var i in this.contenido ){ 

			this.html.removeChild( this.contenido[i].html );
			delete this.contenido[ i ];

		}
		
	}
	
	iniciarDentro( conj ){
		
		var lista = []
		
		for( var i in conj ){ lista.push(i); }
		lista = lista_invertida( lista );
		
		for( var i in lista ){

			conj[ lista[i] ].nombre = i;

			if( !( conj[ lista[i] ] instanceof Grupo) ){ conj[ lista[i] ].padre = this; } 
			else if( conj[ lista[i] ] instanceof Grupo ){ conj[ lista[i] ].setPadre( this ); }
			conj[ lista[i] ].iniciarme();

		}
		
	}
	
	iniciarme(){
		
		if( this.html == undefined || this.html == null ){
			
			var cuerpo = document.createElement("div");
			this.html = cuerpo;
			this.html.style = this.estilo;
			
		} 
	
		this.padre.html.appendChild( this.html );
		this.iniciarDentro( this.contenido );

	}
	
	elem( nombre ){
		
		for( var i in this.contenido ){ 
			if( i == nombre ){ return this.contenido[i] } 
		}
		
	}
	
	annadir( pos, conjunto ){
		
		var cont = 0;
		var arriba = [];
		var abajo = [];
		var medio = [];

		for( var i in conjunto ){ medio.push( i ); }
		for( var i in this.contenido ){ if( cont < pos ){ arriba.push(i); cont += 1; } else { abajo.push(i); } }
		
		var lista = arriba.concat( medio.concat(abajo) ); var todo = Object.assign({}, this.contenido, conjunto); this.contenido = {};
		
		for( var i in lista ){ this.contenido[ lista[i] ] = todo[ lista[i] ]; }
		
		this.iniciarDentro( this.contenido );
		
	}
	
	eliminar( nombre ){
		
		for( var i in this.contenido ){ 
			if( i == nombre ){ 
				this.html.removeChild( this.contenido[ i ].html ); 
				delete this.contenido[ i ]; 
			} 
		}
		
	}
	
	nuevoContenido( nuevo_cnt ){
		
		this.vaciar();
		this.annadir( 0, nuevo_cnt );
		
	}
	
}

class Objeto extends Elemento{
	
	constructor( isid, tipo, estilo ){
		super( isid, estilo );
		this.tipo = tipo;
	}
	//this.nombre, this.padre

	func_estilo(cuerpo){ cuerpo.style = this.estilo; }
	
	iniciarme(){
		
		if( this.html == undefined || this.html == null ){
			
			var cuerpo = document.createElement(this.tipo);
			this.html = cuerpo;
			
			if( this.estilo != null || this.estilo != undefined ){ this.func_estilo(this.html); }
			
			this.padre.html.appendChild( cuerpo );
			
		} else { this.padre.html.appendChild( this.html ); }
		
	};
	
} 