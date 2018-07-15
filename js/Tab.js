window.onload = function () {
    var lis =  $("u_l").getElementsByTagName("li");
    var fpc = $("fp_content").getElementsByTagName("div");
    for(var i=0;i<lis.length;i++){
        
        var li = lis[i];
        li.index=i;

        li.onmouseover = function() {
            for(var j=0;j<lis.length;j++){
                lis[j].className="s ";
                fpc[j].style.display="none";
            }
        this.className="s selected";
        fpc[this.index].style.display="block";
        }
    }      

    function $(id) {
        return typeof id ==="string" ? document.getElementById(id) :null;
    }   

}