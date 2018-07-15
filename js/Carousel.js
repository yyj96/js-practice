window.onload = function () {
    //选项卡
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

    //轮播图
    var s_ul_lis = $("carousel_top_ul").children;
    var imgindex=0;

    $("carousel_top_ul").appendChild(s_ul_lis[0].cloneNode(true));//克隆第一个li标签，添加在最后一个li后面

    for(var i=0;i<s_ul_lis.length-1;i++){
        var s_ol_li = document.createElement("li");
        $("carousel_top_ol").appendChild(s_ol_li);   //for循环根据图片的个数动态创建圆点的个数
    }
    $("carousel_top_ol").children[0].className="li-selected";

    var s_ol_lis=$("carousel_top_ol").children;
    for(var a=0;a<s_ol_lis.length;a++){
        (function(a){
            var s_ol_li=s_ol_lis[a];
            s_ol_li.onmouseover=function(){
                for(var b=0;b<s_ol_lis.length;b++){
                    s_ol_lis[b].className="";
                }
            this.className="li-selected";

            //应用定时器切换图片,要使某元素位置发生改变，则需设置其为定位流
            /***************************************************************** */
            var imgleft= $("carousel_top_ul");
            var timer=null,target=-(200*a),step=10;
            var imgleft_step= imgleft.offsetLeft<target ? step : -step;
                clearInterval(timer);
        
                timer=setInterval(function(){
                    imgleft.style.left=imgleft.offsetLeft+imgleft_step+"px";
                    console.log(imgleft.offsetLeft);
                        if(Math.abs(target-imgleft.offsetLeft)<Math.abs(imgleft_step)){
                            clearInterval(timer);
                            imgleft.style.left=target+"px";
                        }
                },50);
                imgindex=a;
            /****************************************************************** */
            // imgindex=a;
            }
        })(a)
    }
    /************************************************* */
    var imgleft= $("carousel_top_ul");
    var timer2=setInterval(function(){
        imgindex++;
        if(imgindex>s_ul_lis.length-1){
            imgleft.style.left=0;
            imgindex=1;
        }
            var timer=null,target=-(200*imgindex),step=10;
            var imgleft_step= imgleft.offsetLeft<target ? step : -step;
                clearInterval(timer);
        
                timer=setInterval(function(){
                    imgleft.style.left=imgleft.offsetLeft+imgleft_step+"px";
                    console.log(imgleft.offsetLeft);
                        if(Math.abs(target-imgleft.offsetLeft)<Math.abs(imgleft_step)){
                            clearInterval(timer);
                            imgleft.style.left=target+"px";
                        }
                },50);
    },1000)
    /************************************************* */
    // var timer2=setInterval(function(){
    //          imgindex++;
    //          if(imgindex>s_ul_lis.length-1){
    //             $("carousel_top_ul").style.left=0;
    //              imgindex=1;
    //          }
    //          constant($("carousel_top_ul"),-(200*imgindex),50);
    // },1000)
    //匀速动画
    // function constant(obj,target,step){
    //     clearInterval(obj.timer);
    
    //     var obj_step= obj.offsetLeft<target ? step : -step;    
    
    //     obj.timer=setInterval(function(){
    //         obj.style.left=obj.offsetLeft+obj_step+"px";
    //             if(Math.abs(target-obj.offsetLeft)<Math.abs(obj_step)){
    //                 clearInterval(obj.timer);
    //                 obj.style.left=target+"px";
    //             }
    //     },20);
    // }
    
    //获取id
    function $(id) {
        return typeof id ==="string" ? document.getElementById(id) :null;
    }   

}