/**
* KML Parser class
*/
function GXml(){}
GXml.value=value;
GXml.parse=parse;

function value(node){
   if(!node){
      return"";
   }
   var retStr="";
   if(node.nodeType==3||node.nodeType==4||node.nodeType==2){
      retStr+=node.nodeValue;
   }else if(node.nodeType==1||node.nodeType==9||node.nodeType==11){
      for(var i=0;i<node.childNodes.length;++i){
         retStr+=arguments.callee(node.childNodes[i]);
      }
   }
   return retStr;
}


function parse(textDoc){
   try{
      if(typeof ActiveXObject!="undefined"&&typeof GetObject!="undefined"){
         var b=new ActiveXObject("Microsoft.XMLDOM");
         b.loadXML(textDoc);
         return b;
      }else if(typeof DOMParser!="undefined"){
         return(new DOMParser()).parseFromString(textDoc,"text/xml");
      }else{
         return Wb(textDoc);
      }
   }
   catch(c){
      P.incompatible("xmlparse");
   }
   try{
      return Wb(textDoc);
   }
   catch(c){
      P.incompatible("xmlparse");
      return document.createElement("div");
   }
}

function P(){}
P.write=function(a,b){}
;P.writeRaw=function(a){}
;P.writeXML=function(a){}
;P.writeURL=function(a){}
;P.dump=function(a){}
;P.incompatible=function(){}
;P.clear=function(){}
;

function Wb(a){
   return null;
}

