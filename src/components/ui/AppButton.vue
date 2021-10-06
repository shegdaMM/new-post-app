<template>
      <button class="button">
          <slot></slot>
      </button>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.button{text-decoration:none;text-align:center;
 padding:0.5rem 2rem;
 border:solid 1px #009de0;
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius: 4px;
 font:18px Tahoma, Geneva, sans-serif;
 font-weight:bold;
 color:#00af89;
 background:#ffffff;
   -webkit-transition: background 0.57s linear;
 -moz-transition:  background 0.57s linear;
 -o-transition:  background 0.57s linear;
 transition:  background 0.57s linear;}.button:hover{
  padding:0.5rem 2rem;
 border:solid 1px #009de0;
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius: 4px;
 font:18px Tahoma, Geneva, sans-serif;
 font-weight:bold;
 color:#ffffff;
 background:#00af89;
 -webkit-box-shadow:0px 0px 2px #cc0a0a, inset 0px 0px -20px #ffffff;
 -moz-box-shadow: 0px 0px 2px #cc0a0a,  inset 0px 0px -20px #ffffff;
 box-shadow:0px 0px 2px #cc0a0a, inset 0px 0px -20px #ffffff;
 }.button:active{
 padding:0.5rem 2rem;
 border:solid 1px #009de0;
 -webkit-border-radius:4px;
 -moz-border-radius:4px;
 border-radius: 4px;
 font:18px Tahoma, Geneva, sans-serif;
 font-weight:bold;
 color:#00af89;
 background:#ffffff;
 }
</style>
