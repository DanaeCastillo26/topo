var content_hoyos=document.getElementById('content-hoyos');
var img_topo="topo.jpeg";
var img_hoyo="hoyo.webp";
var intervalo, tiempo;
var conteo=0;
var fallos=0;
var caja_velocidad=document.getElementById('caja-velocidad');
var caja_texto=document.getElementById('caja-texto');
var velocidad=Number(caja_velocidad.value);
var content_puntaje=document.getElementById('content-puntaje');
var content_fallos=document.getElementById('content-fallos');
var btn_iniciar=document.getElementById('btn-iniciar');

this.content_puntaje.innerHTML="Puntaje: "+this.conteo;
this.content_fallos.innerHTML="Intentos: "+this.fallos;
this.caja_texto.innerHTML="Velocidad quietos ( "+(this.velocidad/1000)+" segundos )";

caja_velocidad.addEventListener("change",()=>{
	this.velocidad=Number(caja_velocidad.value);
	this.caja_texto.innerHTML="Velocidad quietos ( "+(this.velocidad/1000)+" segundos )";
	clearInterval(this.intervalo);
	clearTimeout(this.tiempo);
	this.generarHoyos();
	this.juego();
});

btn_iniciar.addEventListener("click",()=>{
	this.conteo=0;
	this.fallos=5;
	this.content_puntaje.innerHTML="Puntaje: "+this.conteo;
	this.content_fallos.innerHTML="Intentos: "+this.fallos;
	clearInterval(this.intervalo);
	clearTimeout(this.tiempo);
	this.generarHoyos();
	this.juego();
});

generarHoyos();
function generarHoyos(){
	this.content_hoyos.innerHTML="";
	for(let a=0; a<9; a++){
		let img=document.createElement("img");
		img.setAttribute("src",this.img_hoyo);
		img.setAttribute("class","topo");
		img.setAttribute("id","img"+a);
		img.addEventListener("click",()=>{
			if(this.fallos>0){
				this.golpe(a);
			}else{
				alert("Da click en el bóton iniciar para jugar");
			}
		});
		this.content_hoyos.appendChild(img);
	}
}

function golpe(posi){
	let img=document.getElementById("img"+posi);
	if(img.getAttribute("src")==this.img_topo){
		document.getElementById("img"+posi).setAttribute("src",this.img_hoyo);
		clearTimeout(this.tiempo);
		document.getElementById("img"+posi).setAttribute("src",this.img_hoyo);
		this.conteo+=20;
		this.content_puntaje.innerHTML="Puntaje: "+this.conteo;
	}else{
		this.fallos--;
		this.content_fallos.innerHTML="Intentos: "+this.fallos;
	}
}

function generarTopo(){
	let num=Math.round(Math.random()*8);
	document.getElementById("img"+num).setAttribute("src",this.img_topo);
	this.tiempo=setTimeout(()=>{
		document.getElementById("img"+num).setAttribute("src",this.img_hoyo);
	},this.velocidad);
}

function existeTopo(num,exepciones){
	for(let a=0; a<exepciones.length; a++){
		if(exepciones[a]==num || document.getElementById("img"+num).getAttribute("src")==this.img_topo){
			return true;
		}
	}
	return false;
}

function juego(){
	this.intervalo=setInterval(()=>{
		this.generarTopo();
		if(this.fallos<=0){
			this.parar();
		}
	},this.velocidad);
}

function parar(){
	clearInterval(this.intervalo);
	clearTimeout(this.tiempo);
	alert("Perdiste, Tu puntaje fue de "+this.conteo);
}