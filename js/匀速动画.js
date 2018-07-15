
function constant(obj,target,step){
    clearInterval(obj.timer);

    var obj_step= obj.offsetLeft<target ? step : -step;    

    obj.timer=setInterval(function(){
        obj.style.left=obj.offsetLeft+obj_step+"px";
            if(Math.abs(target-obj.offsetLeft)<Math.abs(obj_step)){
                clearInterval(obj.timer);
                obj.style.left=target+"px";
            }
    },50);
}

