var numberofdrums=document.querySelectorAll("button").length;
for(var i=0;i<numberofdrums;i++){
document.querySelectorAll(".drum")[i].addEventListener("click",function (){
    this.style.color="white";
});
}
