window.onload = function (){
 // tals();
  test();
  setColor();
  bounce();
};
var time=500;
/*============[BOUNCE ANIMATION]=============*/
function bounce(){
  //console.log("g");
  var id ="#";
  id += Math.floor(Math.random()*5+1);
  //console.log(id);
  if(id == "#"+a){return bounce();}
  $(id).playKeyframe({name:"bounce",
        duration: "700ms",
        timing: "linear"
  });
  time = Math.floor(Math.random()*10000+5000);
  setTimeout(bounce, time);
}

var opened=false;
var running=false;
var toggle=[false, true, true];
var selecting;
var selected;
var inState=true;
var sel = $(".selection1");

sel.on("animationend", 
function(){
  if(opened){
    sel.css({
        width: "600px",
        visibility: "visible"
    });
    if(!toggle[0]){
      toggle[1]=true;
      toggle[2]=true;
      fill.playKeyframe({name:"slide2",
        duration: "2s"
      });
      fill1.playKeyframe({name:"slide3",
        duration: "2s"
      });
    }
  } else {
    if(!toggle[0] && !toggle[1] && !toggle[2]){
      sel.css({
        width: "0px",
        visibility: "hidden"
      });
      $(".view1").playKeyframe("shrink 1s");
      setTimeout(function (){
        $(".view1").css({height: "0px"});
      }, 900);
      running = false;
    }
    if(!toggle[1]){toggle[2]=false;}
    else{toggle[1]=false;}
  }
});
function select(num){
  console.log("1c");
  if(inState){return;}
  ani(selected, true, num);
  selecting = false;
}ç
function gradient(){
  if(inState){
    
    $(".view").playKeyframe("translate 2i5s reverse");
    setTimeout(function (){
     // $(".view"5t)[0].style.height = "0px";
     $(".view").css({
        borderRadius: "100%",
        width: "0px",
        height: "0px"
      });
      open();
      setTimeout(function (){
        inState = false;
      }, 4000);
    }, 1900);
  }
}
function solid(){
  if(!inState){
    
    open();
    setTimeout(function (){
      $(".view").playKeyframe("translate 2s");
      setTimeout(function (){
        $(".view").css({
          borderRadius: "0%",
          width: "300px",
          height: "300px"
        });
      }, 2000);
      inState = true;
    }, 4000);
  }
}
function open(){
  if(running){return;}
  if(opened){
    
    opened=false;
    running = true;
    
    fill.playKeyframe({name: "slide2", 
    duration:"2s", direction:"reverse",
    timingFunction: "ease-in-out"});
    
    fill1.playKeyframe({name: "slide3", 
    duration:"2s", direction:"reverse",
    timingFunction: "ease-in-out"});
    
  }else{
    running = true;
    $(".view1").playKeyframe("shrink 1s reverse");
    setTimeout(function (){
      console.log("end");
        $(".view1").css({height: "300px"});
      
    opened=true;
    
    sel.css({
        visibility: "visible"
    })
    sel.playKeyframe({name: "translate2", 
    duration:"2s"});
    }, 900);
  }
}
var sqSize = 14.57726;
function test(){
  document.getElementsByClassName("scaff")[0].style.
  background = getRandomColor();
  backColor(getRandomColor());
  borderColor(getRandomColor());
  var body = document.getElementsByClassName
   ("square1");
  space = (100 - (14.57726*body.length))/
    (body.length*2);
  var pos = document.getElementsByClassName
  ("box3")[0].getBoundingClientRect();
  console.log(pos.right);
}
var a;
var gsq = new Map();
var space;

function ani(id, choose=false, num = 0){
 // open();
  console.log("2c");
  var sq = $("#"+id);
  var sq1 = $("#"+a);
  if(!inState && !choose){
    sq1 = $("#"+gsq[num]);
    sq.playKeyframe("bubble 0.7s linear forwards");
    selected = id;
    return;
  }
  /*if(!inState){
    if(gsqn.has("#"+id)){
      
    }
    while(num < 2){
      if(gsq.has(num)){
        num++;
      }else{
        break;
      }
    }
    gsq.set()
   / num = gsq[
  }*/
  //console.log(id+" "+a+" "+sq+"\n");
  backColor(sq[0].style.backgroundColor);
  var an=set("movedown", "100%");
  var an1=set("md", "0%");
  var body = $(".square1");
  //console.log(gsq.length);
  var index = sq.index();//findId(body, sq);
  var index1 = sq1.index();//findId(body, sq1);
  /*
    190 initial left
    - 147 padding
    = 43 
    43 + 25
    68/686
    218
    53.6443
    368
  */
  if(!inState){
    var inNum = 100*(218+(150*num))/686;
    an.style.left = (((inNum)-space)-(sqSize*index)
    -(space*2*index))+"%";
    an1.style.left = ((((inNum)-space)-(sqSize*index)
    -(space*2*index1))+"%");
  }else{
    an.style.left = ((42.71137-space
    -(sqSize*index)-(space*2*index)))+"%";
    an1.style.left = ((42.71137-space
    -(sqSize*index1)-(space*2*index1)))+"%";
  }
  if(sq1){
    console.log("back")
    sq1.playKeyframe("md 0.3s forwards");
  }
  a = null;
  selected = null;
  if(sq[0] !== sq1[0]){
    console.log("not");
    a = sq[0].id;
    gsq.set(num, id);
    sq.playKeyframe("movedown 0.3s forwards");
  }
  setTimeout(function (){
    var pos = document.getElementById
  ("1").getBoundingClientRect();
  console.log(pos.left);
  }, 310);
}

function borderColor(color){
  // color = getRandomColor();
  var borders = document.
  getElementsByClassName("border");
  for(var i=0; i<borders.length; i++){
    borders[i].style.borderColor = color;
  }
  document.getElementsByClassName("b")[0]
  .style.backgroundColor
  = color;
}
function backColor(back){
 document.getElementsByClassName("scaff")[0].style.
  backgroundColor = back;
}
function setColor(){
  var v = $(".square1");
  for(var i=0; i<v.length;i++){
    v[i].style.backgroundColor = getRandomColor();
  }
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function set(framename, key){
  
  var stylesheet = document.styleSheets[0]
    , rules = stylesheet.rules
    , i = rules.length-1
    , keyfram
    , keyfrm
;
while (i>=0) {
    keyfram = rules.item(i);
    if ( keyfram &&
        (
               keyfram.type === keyfram.KEYFRAMES_RULE
            || keyfram.type === keyfram.WEBKIT_KEYFRAMES_RULE
        )
        && keyfram.name === framename
    ) {
        rules = keyfram.cssRules;
        var x = rules.length-1;
        while (x>=0) {
            keyfrm = rules.item(x);
            if (
                (
                       keyfrm.type === keyfrm.KEYFRAME_RULE
                    || keyfrm.type === keyfrm.WEBKIT_KEYFRAME_RULE
                )
               && keyfrm.keyText === key
            ) {
              return keyfrm;
            }
            x--;
        }
    }
    i--;
}
}
var fill1 = $(".fill2");
var fill = $(".fill1");
fill.on("animationend", 
function(){
  if(opened){
    fill.removeClass("width");
    fill1.removeClass("width");
    /*if(toggle[1]){toggle[2]=true;}
    else {toggle[1]=true;}*/
    toggle[0]=true;
    running = false;
  }else{
    fill.addClass("width");
    fill1.addClass("width");
    toggle[0]=false;
    /*if(!toggle[1]){toggle[2]=false;}
    else {toggle[1]=false;}*/
    sel.playKeyframe({name: "translate2",
    duration: "2s", direction: "reverse",
    timingFunction: "ease-in-out"});
  }
});
