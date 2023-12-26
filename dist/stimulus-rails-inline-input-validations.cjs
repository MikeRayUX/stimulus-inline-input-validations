var d=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var f=(t,e,a)=>e in t?d(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var g=(t,e)=>{for(var a in e)d(t,a,{get:e[a],enumerable:!0})},b=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of h(e))!c.call(t,i)&&i!==a&&d(t,i,{get:()=>e[i],enumerable:!(l=p(e,i))||l.enumerable});return t};var x=t=>b(d({},"__esModule",{value:!0}),t);var m=(t,e,a)=>(f(t,typeof e!="symbol"?e+"":e,a),a);var y={};g(y,{InputValidator:()=>n});module.exports=x(y);var u=require("@hotwired/stimulus");var v={presence(t,e){t.trim().length===0&&e.push({type:"presence",message:"Can't be blank"})},length(t,e,a){t.length<e.min&&a.push({type:"length-min",message:`Too short. Minimum ${e.min} characters`}),t.length>e.max&&a.push({type:"length-max",message:`Too long. Maximum ${e.max} characters`})},numericality(t,e){/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(t)||e.push({type:"numericality",message:"Must be a number"})},email(t,e){/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)||e.push({type:"email",message:"Invalid email format"})}},s=v;var o=t=>t.getAttribute("data-field");var n=class extends u.Controller{connect(){this.textFieldTargets.forEach(t=>{t.setAttribute("data-action","input->input-validator#validateInput"),t.addEventListener("blur",e=>{this.validateInput(e)})})}validateMultiple(t,e){}handleValidations(t,e,a){if(t.hasAttribute("data-validate-presence")&&t.getAttribute("data-validate-presence")!="false"&&s.presence(e,a),t.hasAttribute("data-validate-length")&&t.getAttribute("data-validate-length").length>2){let[l,i]=t.getAttribute("data-validate-length").split(",").map(Number);s.length(e,{min:l,max:i},a)}t.hasAttribute("data-validate-numericality")&&t.getAttribute("data-validate-numericality")!="false"&&s.numericality(e,a),t.hasAttribute("data-validate-email")&&t.getAttribute("data-validate-email")!="false"&&s.email(e,a)}validateInput({target:t,target:{value:e}}){let a=o(t),[l]=this.errorsTargets.filter(r=>r.getAttribute("data-field")==a);l.innerHTML="";let i=[];this.handleValidations(t,e,i),i.length?i.forEach(r=>{l.innerHTML+=`<div error="${r.type}" class="text-sm text-red-500">${r.message}</div>`,l.style.visibility="visible"}):l.style.visibility="invisible"}};m(n,"targets",["textField","errors"]);
