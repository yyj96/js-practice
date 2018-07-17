window.onload = function () {
    //一、选项卡
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

    //二、轮播图
    
    var s_ul_lis = $("carousel_top_ul").children;
    var imgindex=0,s_ol_lis_index=0;
    
        //1、克隆第一张图片放到最后
    $("carousel_top_ul").appendChild(s_ul_lis[0].cloneNode(true));//克隆第一个li标签，添加在最后一个li后面

        //2、根据图片的个数创建选择控件（圆点），注意个数要减去克隆的那张
    for(var i=0;i<s_ul_lis.length-1;i++){
        var s_ol_li = document.createElement("li");
        $("carousel_top_ol").appendChild(s_ol_li);   //for循环根据图片的个数动态创建圆点的个数
    }
    $("carousel_top_ol").children[0].className="li-selected";

        //3、遍历选择控件（圆点），监听鼠标进入选择控件（圆点）的事件 — — 选中当前的圆点；定位到对应的图片       
    var s_ol_lis=$("carousel_top_ol").children;
    for(var a=0;a<s_ol_lis.length;a++){             //for循环遍历所有ol下的li
        (function(a){                               //使用闭包达到同步
            var s_ol_li=s_ol_lis[a];
            
            s_ol_li.onmouseover=function(){         //鼠标进入时，改变选择控件（圆点）的样式
                for(var b=0;b<s_ol_lis.length;b++){
                    s_ol_lis[b].className="";
                }
                this.className="li-selected";

            //应用定时器切换图片,要使某元素位置发生改变，则需设置其为定位流
            constant($("carousel_top_ul"),-(200*a),50);     //调用匀速动画函数，图片移动的位置跟选中的选择控件相关

            imgindex=a;
            s_ol_lis_index=a;
            }
        })(a)
    }

        //4、自动轮播 — — 图片和选择控件自动切换
    var timer1=setInterval(autoplay,1000)           //注意：autoplay后不能加括号，否则将返回函数autoplay的返回值
    
        //5、当鼠标进入图片时，停止轮播；当鼠标离开图片时，继续轮播
    $("carousel").onmouseover=function(){
        clearInterval(timer1);                      //注意：此处使用了第4步的timer1
    }
    $("carousel").onmouseout=function(){
     timer1=setInterval(autoplay,1000);             //注意：此处使用了第4步的timer1
    }

/*自动轮播*/
    function autoplay(){
            imgindex++;
            if(imgindex>s_ul_lis.length-1){            //当imgindex大于3，即加到4时，将其置1
                $("carousel_top_ul").style.left=0;  
                imgindex=1;                            //即播放到最后一张（克隆的）图片，则跳回第二张图片
            }
            constant($("carousel_top_ul"),-(200*imgindex),50);

            s_ol_lis_index++;
            if(s_ol_lis_index>s_ol_lis.length-1){                
                s_ol_lis_index=0;
            }
            for(var c=0;c<s_ol_lis.length;c++){
                s_ol_lis[c].className="";
            }
            s_ol_lis[s_ol_lis_index].className="li-selected";
    }

/*匀速动画*/
    function constant(obj,target,step){
        clearInterval(obj.timer);
    
        var obj_step= obj.offsetLeft<target ? step : -step;    
    
        obj.timer=setInterval(function(){
            obj.style.left=obj.offsetLeft+obj_step+"px";
                if(Math.abs(target-obj.offsetLeft)<Math.abs(obj_step)){
                    clearInterval(obj.timer);
                    obj.style.left=target+"px";
                }
        },20);
    }

    
    //三、弹性导航
    var nav_lis=$("navigation").getElementsByTagName("li");
    var nav_span=$("navigation").children[0];       //注意：此处用children获取，用TagName获取不到
 
    var beginx=0;                       //记录鼠标点击的位置

    for(var d=0;d<nav_lis.length;d++){
        var nav_li=nav_lis[d];

        nav_li.onmouseover=function(){
            nav_span.style.left=this.offsetLeft+"px";
            // end=this.offsetLeft;          //应用缓动动画
        }
        nav_li.onmousedown=function(){
            // nav_span.style.left=this.offsetLeft+"px";   //当鼠标离开时，图标位置又回到0px,此点击无效
            nav_span.style.left=this.offsetLeft+"px";
            beginx=this.offsetLeft;             //此处的beginx的值会给到end，当鼠标离开时，图标位置会定在点击时的位置
            // beginx=this.offsetLeft;       //应用缓动动画
        }
        nav_li.onmouseout=function(){
            // nav_span.style.left=0+"px";
            nav_span.style.left=beginx+"px";
            // end=beginx;                   //应用缓动动画
        }

    }

/*缓动动画*/ 
    // var begin=0,end=0;
    //     timer2=setInterval(function(){
    //         begin=begin+(end-begin)*0.1;
    //         nav_span.style.left=begin+"px";
    //     },20)
    

    //四、导航吸顶
    // window.onscroll=function(){
    //     if(document.documentElement.scrollTop>$("navigation").offsetTop){   //注意scroll家族的获取
    //         $("navigation").className="nav nav_a";
    //     } else{
    //         $("navigation").className="nav";
    //     }
    //     // console.log(scroll_v().top,$("navigation").offsetTop);
    // }

/*获取scroll家族的兼容性写法*/    
    function scroll_v(){
        if(window.pageYOffset!==null){
            return {
                top:window.pageYOffset,
                left:window.pageXOffset
            } 
        } else if(document.compatMode==="CSS1Compat"){
            return {
                top:document.documentElement.scrollTop,
                left:document.documentElement.scrollLeft
            }
        } else{
            return {
                top:document.body.scrollTop,
                left:document.body.scrollLeft
            }
        }
    }
    // console.log(scroll_v().top); //注意：需在监听窗口滚动的事件中才能获取该值

    //五、侧边广告
    var adver=$("advertise");
    var adv_span=adver.children[1];
    var return_top=$("return_t");
    
    var beginy=adver.offsetTop;   //非常重要，此处记录了初始的offsetTop值，该值是固定不变的
    var scroll_top=0;

    var rt_begin=0;rt_end=0,timer2=null;

    window.onscroll=function(){
        scroll_top=scroll_v().top;

        /*导航*/ 
        if(document.documentElement.scrollTop>$("navigation").offsetTop){   //注意scroll家族的获取
            $("navigation").className="nav nav_a";
        } else{
            $("navigation").className="nav";
        }
        /*侧边广告*/
        adver.style.top=beginy+scroll_top+"px";  //初始的offsetTop值+滚动的高度值
        
        /*返回顶部*/
        scroll_top>0 ? (return_top.style.display="block"):(return_top.style.display="none");  //“返回顶部”的显示和隐藏
        rt_begin=scroll_top;
    }

    /*侧边广告*/
    adv_span.onclick=function(){
        adver.style.display="none";
    }

    /*返回顶部*/
    return_top.onclick=function(){                  //此处应用缓动动画来返回顶部
        clearInterval(timer2);

        timer2=setInterval(function(){
            rt_begin=rt_begin+(rt_end-rt_begin)*0.1;
            window.scrollTo(0,rt_begin); 

            if(Math.round(rt_begin)===rt_end){      //注意：此处判断是否相等，为三个等于号
                clearInterval(timer2);              //注意：要记得事件结束后需清除定时器（写在设置的定时器里）
            }
            // console.log(rt_begin,rt_end);
        },20)

        
    }


/*获取id*/
    function $(id) {
        return typeof id ==="string" ? document.getElementById(id) :null;
    }   

}