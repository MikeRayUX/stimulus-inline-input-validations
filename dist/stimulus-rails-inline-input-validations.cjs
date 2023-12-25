var r=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var f=Object.prototype.hasOwnProperty;var g=(t,e,i)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var b=(t,e)=>{for(var i in e)r(t,i,{get:e[i],enumerable:!0})},v=(t,e,i,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of c(e))!f.call(t,a)&&a!==i&&r(t,a,{get:()=>e[a],enumerable:!(l=h(e,a))||l.enumerable});return t};var x=t=>v(r({},"__esModule",{value:!0}),t);var m=(t,e,i)=>(g(t,typeof e!="symbol"?e+"":e,i),i);var A={};b(A,{InputValidator:()=>s});module.exports=x(A);var p=require("@hotwired/stimulus");var y={presence(t,e){t.trim().length===0&&e.push({type:"presence",message:"Can't be blank"})},length(t,e,i){t.length<i.min&&e.push({type:"length-min",message:`Too short. Minimum ${i.min} characters`}),t.length>i.max&&e.push({type:"length-max",message:`Too long. Maximum ${i.max} characters`})},numericality(t,e){if(!t.length)return;/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(t)||e.push({type:"numericality",message:"Must be a number"})}},d=y;var u=t=>t.getAttribute("data-field");var s=class extends p.Controller{connect(){this.textFieldTargets.forEach(t=>{t.setAttribute("data-action","input->input-validator#validateInput")})}validateMultiple(t,e){}handleValidations(t,e,i){if(t.hasAttribute("data-validations")&&this.validateMultiple(e,i),t.hasAttribute("data-validate-presence")&&t.getAttribute("data-validate-presence")!="false"&&d.presence(e,i),t.hasAttribute("data-validate-length")&&t.getAttribute("data-validate-length").length>2){let[l,a]=t.getAttribute("data-validate-length").split(",").map(Number);d.length(e,i,{min:l,max:a})}t.hasAttribute("data-validate-numericality")&&t.getAttribute("data-validate-numericality")!="false"&&d.numericality(e,i)}validateInput({params:{validations:t},target:e,target:{value:i}}){let l=u(e),[a]=this.errorsTargets.filter(n=>n.getAttribute("data-field")==l);a.innerHTML="";let o=[];this.handleValidations(e,i,o),o.length?o.forEach(n=>{a.innerHTML+=`<div error="${n.type}" class="text-sm text-red-500">${n.message}</div>`,a.style.visibility="visible"}):a.style.visibility="invisible"}};m(s,"targets",["textField","errors"]);
