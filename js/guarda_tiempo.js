
	var tiempo = [0,0,0,0,0]; empezar = 0;
	var tecladito = {}; var pulsado = 0; var nopulsado = 0;
	var gdr_in = { t0: [], t1: [], t2: [], t3: [], t4: [], tp: 0, };
	var gdr_fn = { t0: [], t1: [], t2: [], t3: [], t4: [], tp: 0, };
	var dif_tiempos = [];
			
	function keyDown(event){tecladito[event.keyCode] = true;}; function keyUp(event){tecladito[event.keyCode] = false;}; 
	window.addEventListener('keydown', keyDown); window.addEventListener('keyup', keyUp);
			
	function bucleguardatiempo(timestamp) {

		tiempo[4] += 0.0168; 
				
		if( tiempo[4] >= 10 ){ tiempo[3] += 1; tiempo[4] = 0; }
		if( tiempo[3] >= 6 ){ tiempo[2] += 1; tiempo[3] = 0; }
		if( tiempo[2] >= 10 ){ tiempo[1] += 1; tiempo[2] = 0; }
		if( tiempo[1] >= 6 ){ tiempo[0] += 1; tiempo[1] = 0; }

		if( tecladito[32] ){ nopulsado = 0; if(pulsado < 1){ 

			gdr_in.t0[gdr_in.tp] = tiempo[0]; gdr_in.t1[gdr_in.tp] = tiempo[1];
			gdr_in.t2[gdr_in.tp] = tiempo[2]; gdr_in.t3[gdr_in.tp] = tiempo[3];
			gdr_in.t4[gdr_in.tp] = tiempo[4].toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
				
			var valor = "INICIAL: " + gdr_in.t0[gdr_in.tp] + " : " + gdr_in.t1[gdr_in.tp] + gdr_in.t2[gdr_in.tp] + " : " + gdr_in.t3[gdr_in.tp] + gdr_in.t4[gdr_in.tp];
			console.log(valor); gdr_in.tp += 1;

		pulsado += 1; } else { pulsado = 2; } }
		else{ pulsado = 0; if(nopulsado < 1){ if( empezar == 1 ){ 

			gdr_fn.t0[gdr_fn.tp] = tiempo[0]; gdr_fn.t1[gdr_fn.tp] = tiempo[1];
			gdr_fn.t2[gdr_fn.tp] = tiempo[2]; gdr_fn.t3[gdr_fn.tp] = tiempo[3];
			gdr_fn.t4[gdr_fn.tp] = tiempo[4].toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
				
			var valor = "FINAL: " + gdr_fn.t0[gdr_fn.tp] + " : " + gdr_fn.t1[gdr_fn.tp] + gdr_fn.t2[gdr_fn.tp] + " : " + gdr_fn.t3[gdr_fn.tp] + gdr_fn.t4[gdr_fn.tp];
			console.log(valor); 
			
			var hor = gdr_fn.t0[gdr_fn.tp] - gdr_in.t0[gdr_fn.tp];
			var min = ( ( gdr_fn.t1[gdr_fn.tp] ) + gdr_fn.t2[gdr_fn.tp] ) - ( ( gdr_in.t1[gdr_fn.tp] ) + gdr_in.t2[gdr_fn.tp] );
			var sec = ( ( gdr_fn.t3[gdr_fn.tp] ) + gdr_fn.t4[gdr_fn.tp] ) - ( ( gdr_in.t3[gdr_fn.tp] ) + gdr_in.t4[gdr_fn.tp] );
			
			var total = ( hor * 3600 ) + ( min * 60 ) + sec; console.log(total); dif_tiempos[gdr_fn.tp] = total; console.log(dif_tiempos); gdr_fn.tp += 1;

		} nopulsado += 1; } else { nopulsado = 2; } }
		
		window.requestAnimationFrame(bucleguardatiempo);
		
		if( empezar != 1 ){ empezar = 1; }

	}window.requestAnimationFrame(bucleguardatiempo);
