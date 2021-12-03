window.onload = function (){
  test();
  //setColor();
  bounce();
};

/*============[BOUNCE ANIMATION]=============*/
var time=500;
function bounce(){
  var id ="#";
  id += Math.floor(Math.random()*5+1);
  
  var isUp = ((id=="#"+selected) ||
  (sqPlay.indexOf(id)>=0));
  gsq.forEach(function (value){
    if(id == ("#" + value)){
      isUp = true;
    }
  });
  
  if((id == "#"+ssq) || isUp){return bounce();}

  $(id).playKeyframe({name:"bounce",
        duration: "700ms",
        timing: "linear"
  });
  time = Math.floor(Math.random()*5000+1000);
  setTimeout(bounce, time);
}

var opened=false;
var running=false;
var changeStateOn = false;
var toggle=[false, true, true];
var selecting;
var selected;
var inState=true;
var sel = $(".selection1");

function select(num, replace = false){
  if(inState 
  //|| (gsq.get(num)>=0 && !replace)
  ){return;}
  ani(selected, true, num);
  selected = null;
  selecting = false;
}
function toGradient(){
  if(inState && !changeStateOn){
    changeStateOn = true;
    clear();
    $(".sButton").css({
      background: "rgba(255, 255, 255, 0.0)"
    });
    $(".gButton").css({
      background: "rgba(255, 255, 255, 0.5)"
    });
    $(".view").playKeyframe(
    "translate 2s reverse");
    setTimeout(function (){
      $(".view").css({
        borderRadius: "100%",
        width: "0px",
        height: "0px"
      });
      open();
    }, 1950);
  }
}
function toSolid(){
  if(!inState && !changeStateOn){
    changeStateOn = true;
    clear();
    $(".gButton").css({
      background: "rgba(255, 255, 255, 0.0)"
    });
    $(".sButton").css({
      background: "rgba(255, 255, 255, 0.5)"
    });
    open();
    setTimeout(function (){
      $(".view").playKeyframe("translate 2s",
      function (){
        $(".view").css({
          borderRadius: "0%",
          width: "300px",
          height: "300px"
        });
        inState = true;
        changeStateOn = false;
      });
      
    }, 5000);
  }
}

/*=========[GRADIENT STATE TRANSITION]========*/
function open(){
  if(running){return;}
  if(opened){
    
    opened = false;
    running = true;
    
    fill1.playKeyframe({name: "slide3", 
    duration:"2s", direction:"reverse",
    timingFunction: "ease-in-out"});

    fill.playKeyframe({name: "slide2", 
    duration:"2s", direction:"reverse",
    timingFunction: "ease-in-out"});
    setTimeout( function (){
      fill.css({
        right: "125px",
        visibility: "hidden",
        width: "0px",
        height: "0px"
      });
      fill1.css({
        left: "125px",
        visibility: "hidden",
        width: "0px",
        height: "0px"
      });
      sel.playKeyframe({name: "translate2",
      duration: "2s", direction: "reverse",
      timingFunction: "ease-in-out"});
      setTimeout(function (){
        sel.css({
          width: "0px",
          visibility: "hidden"
        });
        $(".view1").playKeyframe("shrink 1s");
        setTimeout(function (){
          $(".view1").css({height: "0px"});
          running = false;
        }, 1000);
      }, 2000);
    }, 2000);
    
  }else{
    running = true;
    
    animate($(".view1"), shrink," 1s reverse");
    setTimeout(function (){
      $(".view1").css({height: "300px"});
      
      opened=true;
    
      sel.css({
        visibility: "visible"
      });
      animate(sel, stretch, {
      duration:"2s"});
      setTimeout(function (){
        sel.css({
          width: "600px",
          visibility: "visible"
        });
        
        fill1.playKeyframe({name:"slide3",
        duration: "2s" });

        animate(fill, expand, {
        duration: "2s"});
        setTimeout(function (){
          fill.css({
            right: "0px",
            visibility: "visible",
            width: "250px",
            height: "250px"
          });
          fill1.css({
            left: "0px",
            visibility: "visible",
            width: "250px",
            height: "250px"
          });
          running = false;
          inState = false;
          changeStateOn = false;
        }, 2000);
      }, 2000);
    }, 900);
  }
}
var sqSize = 14.57726;

function test(){
  $(".sButton").css({
      background: "rgba(255, 255, 255, 0.5)"
  });
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

/*========[SQUARE ANIMATION VARIABLES]========*/
var ssq = null;
var gsq = new Map([[0, -1], [1, -1]]);
var space;
var sqPlay = [];
var toClear = true;
var gradColor = {
  start: "linear-gradient(to bottom right,",
  color1: "",
  color2: "",
  end: ")"
};
  
/*===========[SQUARE IN ANIMATION]============*/
function ani(id, chooseOrClear=false, num = -1){
  if(changeStateOn && !chooseOrClear){
    return;
  }
  var sq = $("#"+id);
  var sq1 = $("#"+ssq);

  if(!inState){
    var selectable = true;
    sq1 = null;
    gsq.forEach(function(value, key){
      if(id == value){
        num = key;
        sq1 = sq;
        selectable = false;
      }
    });
    if(selected && selected != id && 
    num>-1){
      select(num, true);
      //alert("im");
      return;
    }
    if(selectable){
      sq1 = $("#"+gsq.get(num));
    }
    if(!chooseOrClear && selectable){
      if(selected){
        $("#"+selected).playKeyframe(
          "rSelect 0.5s forwards"
        );
      }
      sq.playKeyframe(
        "bubble 0.7s linear forwards"
      );
      selected = id;
      return;
    }
  }

  var index = sq.index();
  var index1 = 0;
  if(sq1){index1 = sq1.index();}
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
  var pos1, pos2;
  if(!inState){
    var inNum = 100*(218+(150*num))/686;
    pos1 = (((inNum)-space)-(sqSize*index)
    -(space*2*index))+"%";
    inNum = 100*(218+(150*num))/686;
    pos2 = (((inNum)-space)-(sqSize*index1)
    -(space*2*index1))+"%";
  }else{
    backColor(sq[0].style.backgroundColor);
    pos1 = (42.71137-space
    -(sqSize*index)-(space*2*index))+"%";
    pos2 = (42.71137-space
    -(sqSize*index1)-(space*2*index1))+"%";
  }
/*-----------[SQUARE ANIMATION BACK]-----------*/
  if(sq1[0] && (sqPlay.indexOf("#"+sq1[0].id)<0)){
  
    toClear = true;
    sqPlay.push("#"+sq1[0].id);
    animate(sq1, sqBack, " 0.5s", {
      "0%": {"left": pos2}
    });
    setTimeout(function (){
      
      if(toClear){
        ssq = null;
      
        if(gsq.has(num)&&gsq.get(num)==sq1[0].id){
          gsq.set(num, -1);
        }
      }
      //alert("in "+ssq+" "+sq1[0].id);
      sq1.css({
        left: 0,
        top: 0,
        transform: ""
      });
      //setTimeout(function (){
        sqPlay.splice(
        sqPlay.indexOf("#"+sq1[0].id), 1);
     // }, 200);
    }, 400);
  }
  
/*---------[SQUARE ANIMATION FORWARD]---------*/
  if(sq[0] !== sq1[0]){
    toClear = false;
    
    if(!inState){
      gradColor["color"+(num+1)]= 
      ((num>0)?", ":" ")+sq[0].
      style.backgroundColor;
      
      backColor({ backgroundImage:
        gradColor.start +
        gradColor.color1 +
        gradColor.color2 +
        gradColor.end
      });
      
      gsq.set(num, id);
    }else{
      ssq = sq[0].id;
    }
    animate(sq, sqForward, 
    " 0.5s", {
      "100%": {"left": pos1}
    },
    function (){
      sq.css({
        left: pos1,
        top: 225+"px",
        transform: "rotate(90deg) "+
        "scale(1.5,1.5)"
      });
      console.log("sjs");
    }, 450
    );
  }
}

/*================[CLEAR]==================*/
function clear(){
  gsq.forEach(function (x, key){
    if(x >= 0){
      ani(x, true);
    }
    setTimeout(function (){
      gsq.set(key, -1);
    }, 500);
    
  });
  if(ssq){
    ani(ssq, true);
    setTimeout(function (){
      ssq = null;
    }, 500);
  }
  
  selected = null;
}

function borderColor(color){
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
  if(typeof(back)=="object"){
    $(".scaff").css(back);
    return;
  }
  $(".scaff").css({
    backgroundImage: "",
    background: back
  });
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
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

var fill1 = $(".fill2");
var fill = $(".fill1");

var sqBack = {
  name: "sqBack",
  "0%": {
    top: "225px",
    left: "293px",
    transform: "rotate(90deg) scale(1.5,1.5)"
  },
  "100%": {
    top: "0px",
    left: "0px",
    transform: "rotate(0deg) scale(1, 1)"
  }
}
var sqForward = {
  name: "sqForward",
  "0%": {
    top: "0px",
    left: "0px",
    transform: "rotate(0deg) scale(1, 1)"
  },
  "100%": {
    top: "225px",
    left: "293px",
    transform: "rotate(90deg) scale(1.5,1.5)"
  }
}

var frameNames = {};
function animate(obj, frame, play,
valuesOrCall={}, callOrTime, time){
  var temp = frame;
  if(typeof(valuesOrCall)=="object"){
    for (const [key1, value1] of 
    Object.entries(valuesOrCall)){
      for (const [key2, value2] of 
      Object.entries(value1)){
        temp[key1][key2] = value2;
      }
    }
  }
  var anNum = 0;
  if(temp.name in frameNames){
    anNum = 1;
    while(frameNames[temp.name].
    indexOf(anNum)>=0){
      anNum++;
    }
    frameNames[temp.name].push(anNum);
  }else{
    frameNames[temp.name] = [0]
  }
  temp.name = temp.name+anNum;
  
  $.keyframe.define([
    temp
  ]);
  if(typeof(callOrTime)=="number"){
    time = callOrTime;
  }
  if(typeof(play)=="object"){
    play["name"] = temp.name;
    if(!time){
      time = parseFloat(play.duration) * 1000;
    }
    obj.playKeyframe(play);
    setTimeout(function (){
      if(typeof(valuesOrCall)=="function"){
        return valuesOrCall();
      }else if(typeof(callOrTime)=="function"){
        return callOrTime();
      }
    }, time);
    
  }else{
    if(!time){
      time = parseFloat(play)*1000;
    }
    obj.playKeyframe(temp.name+play);
    setTimeout(function (){
      if(typeof(valuesOrCall)=="function"){
        return valuesOrCall();
      }else if(typeof(callOrTime)=="function"){
        return callOrTime();
      }
    }, time);
  }
}
var shrink = {
  name: "shrink",
  from: {
    height: "300px"
  },
  to: {
    height: "0px"
  }
}
var stretch = {
  name: "stretch",
  "0%": {
    width: "0px"
  },
  "100%": {
    width: "600px"
  }
}
var expand = {
  name: "expand",
  "0%": {
    visibility: "hidden",
    right: "125px",
    width: 0,
    height: 0
  },
  "100%": {
    visibility: "visible",
    right: 0,
    width: "250px",
    height: "250px"
  }
}
