$(function(){
    /*加载头部和底部*/
    loadHeader("pages/header.html");
    loadFooter("pages/footer.html");
    /*固定导航栏*/
    fixNav("220");
    // 置顶图标
    stickTop("1200");


    /*、导航栏*/
    $("body").on("mouseenter", ".navbar>li", function(){
        $(this).addClass("ckd").siblings().removeClass("ckd");
        $(this).children().addClass("play").parent().siblings().children().removeClass("play");
        $(this).children().slideDown(1000);
    })
    $("body").on("mouseleave", ".navbar>li,.drop", function(){
        $(this).removeClass("ckd");
        $(this).children().removeClass("play");
    })
    $("body").on("click",".shoping-cart",function(){
        $(".cartDetails").slideToggle(300);
    })
    $("body").on("mouseenter",".classify_material",function(){
        $(this).find(".classify_box").addClass("show");
    })
    $("body").on("mouseleave",".classify_material",function(){
        $(this).find(".classify_box").removeClass("show");
    })

    /*实现单页面判断*/
    /*var $oli = $(".navbar>li")*/
    $("body").on("click",".navbar>li", function () {
        loadMain("pages/goods.html");
        var i = $(this).index()
        if (i === 0) {
            loadJson("datas/sofa.json");
        } else if (i === 1) {
            loadJson("datas/table.json")
        } else if (i === 2) {
            loadJson("datas/bed.json");
        }else if (i === 3){
            loadJson("datas/storage.json");
        }else if (i === 4){
            loadJson("datas/sofa.json")
        }
    })
    /*获取主页图片*/
    $.getJSON("datas/index.json",function (data) {
        var $arr = data.imgSrc
        var $img = $(".mid_cont img")
        for (var i = 0;i<$arr.length;i++){
            $img.eq(i).attr("src",$arr[i])
        }
    })
    /*轮播*/
    /*图片轮播*/
    setInterval(tab,2000);
    /*小圆点轮播*/
    setInterval(idots,2000);
    /*小圆点点击事件*/
    idotsClick();
    /*商品详情页面*/
    var first = {
        fn:function () {
            $("body").on("click",".goods_box",function () {
                loadMain("pages/goodsdetails.html");
                $.getScript("js/details.js");
            })
        }
    }
    /*点击事件2*/
    var second = {
        fn:function () {
            $("body").on("click",".checkCart>a",function () {
                console.log(1)
                if (sessionStorage.getItem("goodsInfo") !=null){
                    loadMain("pages/shopcar.html");
                    $.getScript("js/shopcar.js");
                }else{
                    alert("购物车为空  请继续选购")
                }

            })
        }
    }
    var isClick = false
    $("body").on("click",".goods_box",function () {
        isClick == true;
        console.log(isClick)
    })
    if (isClick){
        first.fn();
        second.fn();
    }else {
        $.when(first,second).then(function () {
            second.fn();
            first.fn();
        })
    }
    /*商品列表点击事件*/
    $("body").on("click",".classify_box li",function () {
        var i = $(this).parent().parent().index()
        $(".filter").eq(i).text($(this).text())
    })
});

/*
    固定导航栏
 */
//当滑动的高为222时，固定导航栏
function fixNav(h) {
    $(document).scroll(function () {
        var slide_h = $(this).scrollTop();
        if (slide_h > h){
            $(".main-nav").addClass("fix");
        }
        else {
            $(".main-nav").removeClass("fix");
        }
    })
}

// 当滑动的高>屏幕高度，出现置顶标识与动画
function stickTop(H) {
    $(document).scroll(function () {
        var stick_h = $(this).scrollTop();
        if (stick_h > H){
            $(".stick").css("display","block");
        }else {
            $(".stick").css("display","none");
        }
        $(".stick").on("click",function () {
            // console.log(stick_h);
            $("html").animate({scrollTop:0},1000,function () {
                $(document).animate().stop();

            })

        });


    })
}



