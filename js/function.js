$(function() {
    /*固定导航栏*/
    fixNav("220");
    // 置顶图标
    stickTop("1200");
});




    function loadHeader(url) {
    $.get(url,function (datas) {
        $("header").html(datas);
        judgeX();
        $("header").on("click",".user_info_box p",function () {
            window.location.href = "pages/personnal.html"
        })
        $("header").on("click",".login",function () {
            window.location.href = "pages/login.html"
        })
        $("header").on("click",".logo",function () {
            window.location.href = "../index.html"
        })

    })
}
function loadJson(url) {
    $.getJSON(url,function (goodsData) {
        // console.log(goodsData)
        for(var i = 0;i<goodsData.Title.length;i++){
            $(".title_list").append("<li class='title_item title'>" + goodsData.Title[i] + "</li>")
            goodsData.goods.forEach(function (item ,idx) {
                $(".heading").text(goodsData.goods[0].title);
                $("section img").eq(idx).attr("src",goodsData.goods[idx].src);
                $(".goods_name").eq(idx-1).text(goodsData.goods[idx].goodsName);
                $(".sales").eq(idx-1).text(goodsData.goods[idx].sales);
                $(".goods_pri").eq(idx-1).text(goodsData.goods[idx].pri)
            })
        }
    })
}
function tab(){
    var  oNext = $(".show")
    if (oNext.next().length === 0){
        $(".figure_banner img:first-child").addClass("show").siblings().removeClass("show")
    }else {
        oNext.next().addClass("show").siblings().removeClass("show")
        /*isAnita = true*/
        /*console.log(true)*/
    }
}

function idots(){
    var oNext = $(".cl")
    if (oNext.next().length === 0){
        $(".figure_ctr span:first-child").addClass("cl").siblings().removeClass("cl")
    }else {
        oNext.next().addClass("cl").siblings().removeClass("cl")
    }
}
function idotsClick() {
    var idot = $(".figure_ctr span")
    idot.bind("click", function () {
        var i = $(this).index();
        console.log(i)
        $(".figure_banner img").eq(i).addClass("show").siblings().removeClass("show")
        $(this).addClass("cl").siblings().removeClass("cl")
    })
}

function loadFooter(url) {
    $.get(url,function (datas) {
        $("footer").html(datas);
    })
}
function loadMain(url) {
    $.get(url,function (datas) {
        $("section").html(datas);
    })

}
function judgeX() {
    var oStorage = sessionStorage.getItem("curUser")
    if (oStorage != null){
        $(".user_info_box").css("display","block").html("<P>"+ "欢迎您，" + oStorage + "</p>")
        $(".login").remove()
    }else {
        return;
    }
}
/*
function loadMain(param) {
    $.get("pages/"+param.pageName+".html",function (datas) {
        $("section").html(datas);
        /!*$.getScript("js/" + param.jsName + ".js");*!/
    });

}*/
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
            console.log(stick_h);
            $("html").animate({scrollTop:0},1000,function () {
                $(document).animate().stop();

            })

        });


    })
}
