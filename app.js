"use strict"

const botonera_jug = document.getElementById("botonera")
const botonera_enem = document.getElementById("botonera_enem");

const input = document.getElementById("input");
const empezar = document.getElementById("empezar");

const text_jugador = document.querySelectorAll(".jug");

const selec_enem = document.getElementById("selec_enem");
const selec_jug = document.getElementById("selec_jug");

let puntos_jug = 0;
let puntos_enem = 0;

const marcador_jug = document.getElementById("punt_jug");
const marcador_enem = document.getElementById("punt_enem");

const boton_volver = document.getElementById("return");

let jugando = false;
let selec_jugador = -1;

let jugador = "jugador";
let power = true;


const winner = document.getElementById("ganador");
const winner_show = document.getElementById("ganador_show")

function comprobar_jugada (mano_enem, mano_jug)
{
    if(!(mano_enem == mano_jug))
    {
        let buscado = manos.find(
            (mano)=> mano.nombre === mano_jug
        );
    
        if( buscado.victorias.includes(mano_enem))
        {
            return 1;
        }else{
            return 2;
        }
    }else{
        console.log("empate");
        return 3;
    }

    
}

empezar.addEventListener("click",
    ()=>{
        if(input.value != "")
        {
            jugador = input.value;
            text_jugador.forEach(
                (etiqueta)=>{
                    etiqueta.innerText = jugador;
                }
            );
        }
        botonera_enem.innerHTML = "";
        botonera_jug.innerHTML = "";
        selec_enem.innerHTML = "";
        selec_jug.innerHTML = "";
        puntos_enem = 0;
        puntos_jug = 0;
        marcador_enem.innerText = puntos_enem;
        marcador_jug.innerText = `${puntos_jug}:`;
        manos.forEach(
            (mano)=>{
                botonera_enem.innerHTML += `<div class=\"cont_boton\" ><img src=\"${mano.img}\" alt=\"${mano.nombre}\"></div>`;
                botonera_jug.innerHTML += `<div class=\"cont_boton\" ><img src=\"${mano.img}\" alt=\"${mano.nombre}\"></div>`;

                const boton_jug = document.querySelectorAll("#botonera .cont_boton");
                const boton_enem = document.querySelectorAll("#botonera_enem .cont_boton");
                boton_jug.forEach(
                    (boton)=>{
                        boton.addEventListener("click",
                            ()=>{
                                if(power)
                                {
                                    selec_enem.innerHTML = "";
                                    selec_jug.innerHTML = "";
                                    boton_jug.forEach(
                                        boton=> boton.classList.remove("selected")
                                    );

                                    boton_enem.forEach(
                                        boton=> boton.classList.remove("selected")
                                    );

                                    boton.classList.remove("selected");
                                

                                    let pulsado_jug = boton;

                                    let mano_jug = pulsado_jug.firstChild.getAttribute("alt");                                
    
                                    let pulsado_jug_mostrar = pulsado_jug.outerHTML;
                                    pulsado_jug.classList.add("selected");
                                    let mostrar = pulsado_jug_mostrar.outerHTML;
    
                                    selec_jug.innerHTML += pulsado_jug_mostrar;
                                    
                                    let jugada_enem = Math.floor(Math.random()*5);
                                    let pulsado_enem = boton_enem[jugada_enem];
                                    let mano_enem = pulsado_enem.firstChild.getAttribute("alt"); 
                                    let pulsado_enem_mostrar = pulsado_enem.outerHTML;
                                    pulsado_enem.classList.add("selected");
                                    
                                    selec_enem.innerHTML += pulsado_enem_mostrar;
    
                                    console.log(mano_enem, mano_jug)
    
                                    if(comprobar_jugada(mano_enem, mano_jug) == 1)
                                    {
                                        puntos_jug++;
                                        marcador_jug.innerText = `${puntos_jug}:`;
                                    }else if(comprobar_jugada(mano_enem, mano_jug) == 2){
                                        puntos_enem++;
                                        marcador_enem.innerText = puntos_enem;
                                    }
                                    if(puntos_jug == 5 || puntos_enem == 5)
                                    {   
                                        if(puntos_jug == 5)
                                        {   
                                            winner_show.innerText = `GANA: ${jugador}`;
                                        }else{
                                            winner_show.innerText = `GANA: ENEMIGO`;
                                        }
                                        power = false;
                                        winner.classList.remove("ganador_hidden");
                                        winner.classList.add("ganador_show");
                                        empezar.setAttribute("disabled", true);
                                        boton_volver.addEventListener("click",
                                            ()=>{
                                                puntos_jug = 0;
                                                puntos_enem = 0;
                                                marcador_enem.innerText = puntos_enem;
                                                marcador_jug.innerText = puntos_jug;
                                                selec_enem.innerHTML = "";
                                                selec_jug.innerHTML = "";
                                                pulsado_jug.classList.remove("selected");
                                                pulsado_enem.classList.remove("selected");
                                                botonera_enem.innerHTML = "";
                                                botonera_jug.innerHTML = "";
                                                winner.classList.add("ganador_hidden");
                                                winner.classList.remove("ganador_show");
                                                empezar.removeAttribute("disabled");
                                                power = true;
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }
                );
            }
        );
    }
);



