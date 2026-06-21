AOS.init({
duration:1200
});

// Loader

window.addEventListener("load",()=>{

setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1000);

});

// Counter

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const inc=target/100;

if(count<target){

counter.innerText=Math.ceil(count+inc);

setTimeout(update,20);

}
else{
counter.innerText=target+"+";
}

}

update();

});

// Back To Top

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}

});

topBtn.onclick=()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
};

// Floating Petals

const container=document.getElementById("petals-container");

for(let i=0;i<25;i++){

let petal=document.createElement("div");

petal.classList.add("petal");

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";

petal.style.animationDuration=
Math.random()*5+5+"s";

container.appendChild(petal);

}

const timelineSteps = document.querySelectorAll(".timeline-step");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            },index*250);

        }

    });

},{threshold:0.3});

timelineSteps.forEach(step=>{

    step.style.opacity="0";
    step.style.transform="translateY(80px)";
    step.style.transition="all .8s ease";

    observer.observe(step);

});