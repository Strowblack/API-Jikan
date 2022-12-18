const formulario = document.getElementById("busqueda");
const inputNombre = document.getElementById("nombre");
const divResultados = document.querySelector(".resultados");
var urlCharacters = "https://api.jikan.moe/v4/"
const anime = document.getElementById("Anime");
const pj = document.getElementById("Personajes");
const botones = document.getElementById("cuidado");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
var pagina = 1;

const anbutton = document.getElementById("anbutton");
const pjbutton = document.getElementById("pjbutton");
const mgbutton = document.getElementById("mgbutton");

const btPjTop = document.getElementById("PjTop");
const bttop = document.getElementById("AnimeTop");
const mgbttop = document.getElementById("MangaTop");
const topanime = "https://api.jikan.moe/v4/top/anime";
const topmanga = "https://api.jikan.moe/v4/top/manga";
const toppj = "https://api.jikan.moe/v4/top/characters";
//----- Busqueda de personajes anime por nombre -----//
async function getCharactersByName(name) {
    if (document.getElementById("Personajes").checked) {
        const urlFetch = urlCharacters + "characters?q=" + name + "&sfw";
        const response = await fetch(urlFetch);
        const json = await response.json();
        return json;
    } else if(document.getElementById("Mangas").checked){
        const urlFetch = urlCharacters + "manga?q=" + name;
        const response = await fetch(urlFetch);
        const json = await response.json();
    return json;
    } else { //---- Busqueda por nombre del anime ----//
        const urlFetch = urlCharacters + "anime?q=" + name + "&sfw";
        const response = await fetch(urlFetch);
        const json = await response.json();
        return json;
    }
}

async function getTop(name) {
        const urlFetch = name;
        const response = await fetch(urlFetch);
        const json = await response.json();
        return json;
}

async function getnext() {
    pagina += 1;
    if (document.getElementById("Personajes").checked) {
        var nexturlCharacters = "https://api.jikan.moe/v4/characters?page=" + pagina;
    } else if (document.getElementById("Mangas").checked){
        var nexturlCharacters = "https://api.jikan.moe/v4/manga?page=" + pagina;
    } else {
        var nexturlCharacters = "https://api.jikan.moe/v4/anime?page=" + pagina;
    }
    const urlFetch = nexturlCharacters;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getprev() {
    pagina -= 1;
    if (document.getElementById("Personajes").checked) {
        var nexturlCharacters = "https://api.jikan.moe/v4/characters?page=" + pagina;
    } else  if (document.getElementById("Mangas").checked){
        var nexturlCharacters = "https://api.jikan.moe/v4/manga?page=" + pagina;
    } else {
        var nexturlCharacters = "https://api.jikan.moe/v4/anime?page=" + pagina;
    }
    const urlFetch = nexturlCharacters;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

formulario.addEventListener("submit", e => {
    e.preventDefault();
    const name = inputNombre.value.trim();
    getCharactersByName(name)
        .then(characters => {
            console.log(characters)
            divResultados.innerHTML = "";
            if (document.getElementById("PjNombre").checked&&document.getElementById("Personajes").checked) {
                characters.data.forEach(element => {
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        if (element.about == null) {
                            var textaco = "Null";
                        } else {
                            var textaco = (element.about).substring(0, 200)
                        }
                        var template = `<div class="card2">
                                            <div >
                                                <img src="${element.images.jpg.image_url}" alt="a">
                                            </div>
                                            <div >
                                                <p>Nombre: ${element.name}</p>
                                                <p>Kanji: ${element.name_kanji}</p>
                                                <p>Fans: ${element.favorites}</p>
                                                <p>${textaco}...</p>
                                            </div>
                                        </div>`;
                        divResultados.innerHTML += template;
                        botones.style.display = "block";
                    }
                });
            } else if(document.getElementById("AnimeNombre").checked&&document.getElementById("Anime").checked) {
                console.log(characters)
                characters.data.forEach(element => {
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        var template = `<div class="card0">
                                        <div >
                                            <img src="${element.images.jpg.image_url}" alt="a">
                                        </div>
                                        <div >
                                            <p>Titulo: ${element.title}</p>
                                            <p>Rank: ${element.rank}</p>
                                            <p>Horario: ${element.broadcast.string}</p>
                                            <p>Episdios: ${element.episodes}</p>
                                            <p>Duración: ${element.duration}</p>
                                            <p>Rating: ${element.rating}</p>
                                            <p>Año: ${element.year}</p>
                                            <p>Estado: ${element.status}</p>
                                        </div>
                                    </div>`;
                        divResultados.innerHTML += template;
                        botones.style.display = "block";
                    }
                });
            } else if(document.getElementById("Mangas").checked){
                console.log(characters)
                characters.data.forEach(element => {
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        var template = `<div class="card0">
                                        <div >
                                            <img src="${element.images.jpg.image_url}" alt="a">
                                        </div>
                                        <div >
                                        <p>Nombre: ${element.title}</p>
                                        <p>Fans: ${element.favorites}</p>
                                        <p>Status: ${element.status}</p>
                                        <p>Miembros: ${element.members}</p>
                                        <p>Score: ${element.score}</p>
                                        <p>Ranking: ${element.rank}</p>
                                        <p>Volumenes: ${element.volumes}</p>
                                        </div>
                                    </div>`;
                        divResultados.innerHTML += template;
                        botones.style.display = "block";
                    }
                });
            }
            if (divResultados.innerHTML == "") {
                var template = `<div class="card0">
                <div >
                    <img src="https://ih1.redbubble.net/image.1316212321.6544/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="a">
                </div>
                <div >
                   No se ha encontrado nada, que raro.
                </div>
            </div>`;
                divResultados.innerHTML += template;
            }
        });
});

next.addEventListener("click", function () {
    divResultados.innerHTML = "";
    getnext()
        .then(characters => {
            if (document.getElementById("Personajes").checked) {
                console.log(characters);
                pagina = characters.pagination.current_page;
                characters.data.forEach(element => {
                    if (element.about == null) {
                        var textaco = "Null";
                    } else {
                        var textaco = (element.about).substring(0, 200)
                    }
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        var template = `<div class="card0">
                                        <div >
                                            <img src="${element.images.jpg.image_url}" alt="a">
                                        </div>
                                        <div >
                                            <p>Nombre: ${element.name}</p>
                                            <p>Kanji: ${element.name_kanji}</p>
                                            <p>Fans: ${element.favorites}</p>
                                            <p>${textaco}...</p>
                                        </div>
                                    </div>`;
                        divResultados.innerHTML += template;
                    }
                });
            } else if(document.getElementById("Anime").checked&&document.getElementById("AnimeNombre").checked) {
                pagina = characters.pagination.current_page;
                characters.data.forEach(element => {
                    console.log(characters)
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        var template = `<div class="card0">
                                    <div >
                                        <img src="${element.images.jpg.image_url}" alt="a">
                                    </div>
                                    <div >
                                    <p>Titulo: ${element.title}</p>
                                    <p>Rank: ${element.rank}</p>
                                    <p>Horario: ${element.broadcast.string}</p>
                                    <p>Episodios: ${element.episodes}</p>
                                    <p>Duración: ${element.duration}</p>
                                    <p>Rating: ${element.rating}</p>
                                    <p>Año: ${element.year}</p>
                                    <p>Estado: ${element.status}</p>
                                    </div>
                                </div>`;
                        divResultados.innerHTML += template;
                    } 
                });
            }else if(document.getElementById("Mangas").checked){
                console.log(characters)
                pagina = characters.pagination.current_page;
                characters.data.forEach(element => {
                    if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                        var template = `<div class="card0">
                                        <div >
                                            <img src="${element.images.jpg.image_url}" alt="a">
                                        </div>
                                        <div >
                                        <p>Nombre: ${element.title}</p>
                                        <p>Fans: ${element.favorites}</p>
                                        <p>Status: ${element.status}</p>
                                        <p>Miembros: ${element.members}</p>
                                        <p>Score: ${element.score}</p>
                                        <p>Ranking: ${element.rank}</p>
                                        <p>Volumenes: ${element.volumes}</p>
                                        </div>
                                    </div>`;
                        divResultados.innerHTML += template;
                        botones.style.display = "block";
                    }
                });
            }
        })
})


prev.addEventListener("click", function () {
    if (pagina < 2) {
        pagina += 1;
    } else {
        divResultados.innerHTML = "";
        getprev()
            .then(characters => {
                if (document.getElementById("Personajes").checked) {
                    console.log(characters);
                    pagina = characters.pagination.current_page;
                    characters.data.forEach(element => {
                        if (element.about == null) {
                            var textaco = "Null";
                        } else {
                            var textaco = (element.about).substring(0, 200)
                        }
                        if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                            var template = `<div class="card0">
                                            <div >
                                                <img src="${element.images.jpg.image_url}" alt="a">
                                            </div>
                                            <div >
                                                <p>Nombre: ${element.name}</p>
                                                <p>Kanji: ${element.name_kanji}</p>
                                                <p>Fans: ${element.favorites}</p>
                                                <p>${textaco}...</p>
                                            </div>
                                        </div>`;
                            divResultados.innerHTML += template;
                        }
                    });
                } else if(document.getElementById("Anime").checked){
                    characters.data.forEach(element => {
                        console.log(characters)
                        pagina = characters.pagination.current_page;
                        if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                            var template = `<div class="card0">
                                        <div >
                                            <img src="${element.images.jpg.image_url}" alt="a">
                                        </div>
                                        <div >
                                        <p>Titulo: ${element.title}</p>
                                        <p>Rank: ${element.rank}</p>
                                        <p>Horario: ${element.broadcast.string}</p>
                                        <p>Episodios: ${element.episodes}</p>
                                        <p>Duración: ${element.duration}</p>
                                        <p>Rating: ${element.rating}</p>
                                        <p>Año: ${element.year}</p>
                                        <p>Estado: ${element.status}</p>
                                        </div>
                                    </div>`;
                            divResultados.innerHTML += template;
                        }
                    });
                }else if(document.getElementById("Mangas").checked){
                    console.log(characters)
                    pagina = characters.pagination.current_page;
                    characters.data.forEach(element => {
                        if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                            var template = `<div class="card0">
                                            <div >
                                                <img src="${element.images.jpg.image_url}" alt="a">
                                            </div>
                                            <div >
                                            <p>Nombre: ${element.title}</p>
                                            <p>Fans: ${element.favorites}</p>
                                            <p>Status: ${element.status}</p>
                                            <p>Miembros: ${element.members}</p>
                                            <p>Score: ${element.score}</p>
                                            <p>Ranking: ${element.rank}</p>
                                            <p>Volumenes: ${element.volumes}</p>
                                            </div>
                                        </div>`;
                            divResultados.innerHTML += template;
                            botones.style.display = "block";
                        }
                    });
                }
            })
    }
})

document.addEventListener("click",function(){
    if(document.getElementById("Personajes").checked){
        anbutton.style.display="none";
        pjbutton.style.display="block";
        mgbutton.style.display="none";
    }else if(document.getElementById("Mangas").checked){
        anbutton.style.display="none";
        pjbutton.style.display="none";
        mgbutton.style.display="block";
    }else if(document.getElementById("Anime").checked){
        anbutton.style.display="block";
        pjbutton.style.display="none";
        mgbutton.style.display="none";
    }
});
btPjTop.addEventListener("click",function(){
    var name = toppj;
    getTop(name)
    .then( result => {
        divResultados.innerHTML="";
        console.log(result)
        result.data.forEach(element => {
            if (element.about == null) {
                var textaco = "Null";
            } else {
                var textaco = (element.about).substring(0, 200)
            }
            if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                var template = `<div class="card0">
                                <div >
                                    <img src="${element.images.jpg.image_url}" alt="a">
                                </div>
                                <div >
                                    <p>Nombre: ${element.name}</p>
                                    <p>Kanji: ${element.name_kanji}</p>
                                    <p>Fans: ${element.favorites}</p>
                                    <p>${textaco}...</p>
                                </div>
                            </div>`;
                divResultados.innerHTML += template;
            }
        });
        document.getElementById("cuidado").style.display="none";
    }
    )
});
mgbttop.addEventListener("click",function(){
    var name = topmanga;
    getTop(name)
    .then( result => {
        divResultados.innerHTML="";
        console.log(result)
        result.data.forEach(element => {
            if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                var template = `<div class="card0">
                                <div >
                                    <img src="${element.images.jpg.image_url}" alt="a">
                                </div>
                                <div >
                                    <p>Nombre: ${element.title}</p>
                                    <p>Fans: ${element.favorites}</p>
                                    <p>Status: ${element.status}</p>
                                    <p>Miembros: ${element.members}</p>
                                    <p>Score: ${element.score}</p>
                                    <p>Ranking: ${element.rank}</p>
                                    <p>Volumenes: ${element.volumes}</p>
                                </div>
                            </div>`;
                divResultados.innerHTML += template;
            }
        });
        document.getElementById("cuidado").style.display="none";
    }
    )
});
bttop.addEventListener("click",function(){
    var name = topanime;
    getTop(name)
    .then( result => {
        divResultados.innerHTML="";
        console.log(result)
        result.data.forEach(element => {
            if (element.images.jpg.image_url == "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png") { } else {
                var template = `<div class="card0">
                                <div >
                                    <img src="${element.images.jpg.image_url}" alt="a">
                                </div>
                                <div >
                                    <p>Nombre: ${element.title}</p>
                                    <p>Horario: ${element.broadcast.string}</p>
                                    <p>Fans: ${element.favorites}</p>
                                    <p>Duración: ${element.duration}</p>
                                    <p>Miembros: ${element.members}</p>
                                    <p>Score: ${element.score}</p>
                                    <p>Rating: ${element.rating}</p>
                                    <p>Año: ${element.year}</p>
                                </div>
                            </div>`;
                divResultados.innerHTML += template;
            }
        });
        document.getElementById("cuidado").style.display="none";
    }
    )
});

//Easter Eggs
var arriba1 = false;
var arriba2 = false;
var abajo1 = false;
var abajo2 = false;
var izquierda1 = false;
var derecha1 = false;
var izquierda2 = false;
var derecha2 = false;
var teclab = false; 
var teclaa = false; 
var ck = false;
document.onkeydown = function(e) {
    if(ck==false){
        if(e.keyCode==38&&arriba1==false){
            arriba1=true;
        }else if(e.keyCode==38&&arriba2==false&&arriba1==true){
            arriba2=true;
        }else if(e.keyCode==40&&abajo1==false&&arriba1==true&&arriba2==true){
            abajo1=true;
        }else if(e.keyCode==40&&abajo2==false&&arriba1==true&&arriba2==true&&abajo1==true){
            abajo2=true;
        }else if(e.keyCode==37&&izquierda1==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2){
            izquierda1=true;
        }else if(e.keyCode==39&&derecha1==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2&&izquierda1==true){
            derecha1=true;
        }else if(e.keyCode==37&&izquierda2==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2&&izquierda1==true&&derecha1==true){
            izquierda2=true;
        }else if(e.keyCode==39&&derecha2==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2&&izquierda1==true&&derecha1==true&&izquierda2==true){
            derecha2=true;
        }else if(e.keyCode==66&&teclab==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2&&izquierda1==true&&derecha1==true&&izquierda2==true&&derecha2==true){
            teclab=true;
        }else if(e.keyCode==65&&teclaa==false&&arriba1==true&&arriba2==true&&abajo1==true&&abajo2&&izquierda1==true&&derecha1==true&&izquierda2==true&&derecha2==true&&teclab==true){
            teclaa=true;
            ck=true;
            console.log("Codigo Konami")
            divResultados.innerHTML = "";
            var url = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c638dc3d-fb1e-4774-b982-3b4bcd4bf834/deootv8-a9b037ed-8c10-4a92-98bd-fae70f102995.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M2MzhkYzNkLWZiMWUtNDc3NC1iOTgyLTNiNGJjZDRiZjgzNFwvZGVvb3R2OC1hOWIwMzdlZC04YzEwLTRhOTItOThiZC1mYWU3MGYxMDI5OTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Zw0okretvh0ihaGl3aqkbq0jE_PHGRcwjLGnLkWTzhw";
            document.getElementById("eastereggs").style.display="block";
            document.body.style.backgroundImage = `url(${url})`;
            document.body.style.color="rgb(254 255 208)";
            document.body.style.fontSize="15px";
        }else{
            arriba1 = false;
            arriba2 = false;
            abajo1 = false;
            abajo2 = false;
            izquierda1 = false;
            derecha1 = false;
            izquierda2 = false;
            derecha2 = false;
            teclab = false; 
            teclaa = false; 
        }
    }
};