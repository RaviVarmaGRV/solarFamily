console.log('running');
var planets=["MERCURY","VENUS","EARTH","MARS","JUPITAR","SATURN","URANUS","NEPTUNE"]
var currentPlanet="MERCURY";
var currentView="overview";
var currentImage="planet";
var data;

var planetName=document.getElementById('name');
var content=document.getElementById('content');
var sourceAtag=document.getElementById('sourceAtag');
var planetImg=document.getElementById('planetImg');
var rotTime=document.getElementById('rotTime');
var revalTime=document.getElementById('revalTime');
var radius=document.getElementById('radius');
var temp=document.getElementById('temp');

document.querySelectorAll('.sunChildren').forEach(child => {        
    child.addEventListener('click',()=>{
        currentPlanet=child.textContent;
        call();
    })
});

var planImg=document.getElementById('planetImg');
var overView=document.getElementById('overView');
var internalStructure=document.getElementById('internalStructure');
var surfaceGeology=document.getElementById('surfaceGeology');

document.getElementById('overView').addEventListener('click',()=>{
    currentView="overview";
    currentImage="planet";
    planImg.classList.remove('smlImg');
    overView.classList.add('blueBg'); 
    internalStructure.classList.remove('blueBg');
    surfaceGeology.classList.remove('blueBg');
    call();

})

document.getElementById('internalStructure').addEventListener('click',()=>{
    currentView="structure";
    currentImage="internal";
    planImg.classList.remove('smlImg');
    overView.classList.remove('blueBg'); 
    internalStructure.classList.add('blueBg');
    surfaceGeology.classList.remove('blueBg');
    call();
})

document.getElementById('surfaceGeology').addEventListener('click',()=>{
    currentView="geology";
    currentImage="planet";
    planImg.classList.add('smlImg');
    overView.classList.remove('blueBg'); 
    internalStructure.classList.remove('blueBg');
    surfaceGeology.classList.add('blueBg');
    call();
})

async function call() {
    var response=await fetch('http://localhost:3002/planets/'+(planets.indexOf(currentPlanet)+1))
    .then((res)=>res.json())
    .then((res)=>{
        data=res;
        planetName.textContent=res.name;
        content.textContent=res[currentView].content;
        sourceAtag.href=res[currentView].source;
        console.log('yes');
        
        planetImg.style.backgroundImage='url('+res.images[currentImage]+')';
        planetImg.style.setProperty("--bg-img",`url(${res.images.geology})`);
        rotTime.textContent=res.rotation;
        revalTime.textContent=res.revolution;
        radius.textContent=res.radius;
        temp.textContent=res.temperature;
    })
}
