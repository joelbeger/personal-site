<template>
  <!-- LIGHT MODE BACKGROUND -->
  <div
    class="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden z-0
           bg-transparent dark:hidden"
  >
    <div class="light-bg-container">
      <div class="hero-circle circle-small"></div>
      <div class="hero-circle circle-medium"></div>
      <div class="hero-circle circle-large"></div>
      <div class="hero-circle circle-xlarge"></div>
      <div class="hero-circle circle-xxlarge"></div>
    </div>
  </div>

<!-- DARK MODE BACKGROUND -->
<div
  class="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden dark:block"
>
  <div id="stars"></div>
  <div id="stars2"></div>
  <div id="stars3"></div>

  <div id="shooting-stars">
    <div class="meteor"></div>
    <div class="meteor"></div>
    <div class="meteor"></div>
    <div class="meteor"></div>
  </div>
</div>

</template>

<style scoped>
/* ---------------------------------- */
/* LIGHT MODE ANIMATION (Gradient + Circles) */
/* ---------------------------------- */

.light-bg-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00adef 0%, #0076e5 100%);
}

.hero-circle {
  position: absolute;
  border-radius: 50%;
  animation: circle-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(.6, 0, .4, 1);
}

/* sizes + delays - innermost circles are yellow (sun), outer circles are white (sky glow) */
.circle-small {
  top: 200px;
  right: -150px;
  width: 300px;
  height: 300px;
  background: #fff; /* bright yellow - sun core */
  opacity: 0.7;
  animation-delay: 0s;
}

.circle-medium {
  top: 50px;
  right: -300px;
  width: 600px;
  height: 600px;
  background: #fff;; /* orange-yellow - sun outer layer */
  opacity: 0.5;
  animation-delay: 0.3s;
}

.circle-large {
  top: -100px;
  right: -450px;
  width: 900px;
  height: 900px;
  background: #fff;; /* transition to white */
  opacity: 0.2;
  animation-delay: 0.6s;
}

.circle-xlarge {
  top: -250px;
  right: -600px;
  width: 1200px;
  height: 1200px;
  background: #fff;
  opacity: 0.1;
  animation-delay: 0.9s;
}

.circle-xxlarge {
  top: -400px;
  right: -750px;
  width: 1500px;
  height: 1500px;
  background: #fff;
  opacity: 0.05;
  animation-delay: 1.2s;
}

@keyframes circle-scale {
  from { transform: scale(1); }
  to   { transform: scale(1.1); }
}


/* ---------------------------------- */
/* DARK MODE STARFIELD + SHOOTING STARS */
/* ---------------------------------- */

#stars, #stars2, #stars3 {
  position: absolute;
  width: 1px;
  height: 1px;
  background: transparent;
}

#stars {
  box-shadow: v-bind('smallStars');
  animation: animStar 195s linear infinite;
}
#stars:after {
  content: "";
  position: absolute;
  top: 4000px; 
  width: 1px; height: 1px;
  box-shadow: v-bind('smallStars');
}

#stars2 {
  width: 2px; height: 2px;
  box-shadow: v-bind('mediumStars');
  animation: animStar 220s linear infinite;
}
#stars2:after {
  content: "";
  position: absolute;
  top: 4000px;  
  width: 2px; height: 2px;
  box-shadow: v-bind('mediumStars');
}

#stars3 {
  width: 3px; height: 3px;
  box-shadow: v-bind('bigStars');
  animation: animStar 250s linear infinite;
}
#stars3:after {
  content: "";
  position: absolute;
  top: 4000px;
  width: 3px; height: 3px;
  box-shadow: v-bind('bigStars');
}

#shooting-stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.meteor {
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(135deg, #ffffff, rgba(170,200,255,0.8), rgba(170,200,255,0));
  opacity: 0;
  filter: blur(1px);
  animation-name: shootingStar;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.meteor:nth-child(1) { top: 15%; left: 85%; animation-duration: 8s; animation-delay: 0s; }
.meteor:nth-child(2) { top: 35%; left: 65%; animation-duration: 9.5s; animation-delay: 2.5s; }
.meteor:nth-child(3) { top: 10%; left: 40%; animation-duration: 11s; animation-delay: 6s; }
.meteor:nth-child(4) { top: 55%; left: 90%; animation-duration: 13s; animation-delay: 9s; }

@keyframes animStar {
  from { transform: translateY(0); }
  to   { transform: translateY(-4000px); }
}

@keyframes shootingStar {
  0%   { transform: translate(0,0) rotate(-45deg); opacity: 0; }
  10%  { opacity: 1; }
  25%  { transform: translate(-700px,700px) rotate(-45deg); opacity: 0; }
  100% { opacity: 0; }
}
</style>

<script setup lang="ts">
//
// generate starfield using JS - stars need to fill 4000px height for seamless loop
//
function genStars(n: number) {
  let output = '';
  for (let i = 0; i < n; i++) {
    output += `${Math.random() * 4000}px ${Math.random() * 4000}px #FFF,`;
  }
  return output.slice(0, -1);
}

const smallStars = genStars(1400);
const mediumStars = genStars(400);
const bigStars = genStars(200);
</script>