<template>
  <!-- fixed strip behind top of page -->
  <div
    class="pointer-events-none fixed inset-x-0 top-0 h-[850px] -z-10 dark:hidden"
  >
    <div class="hero-bg">
      <div class="hero-circle hero-circle-small"></div>
      <div class="hero-circle hero-circle-medium"></div>
      <div class="hero-circle hero-circle-large"></div>
      <div class="hero-circle hero-circle-xlarge"></div>
      <div class="hero-circle hero-circle-xxlarge"></div>
    </div>
  </div>
</template>

<style scoped>
.hero-bg {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00adef 0%, #0076e5 100%);
}

/* shared circle base styles */
.hero-circle {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: circle-scale 3s ease-in-out infinite alternate;
  animation-timing-function: cubic-bezier(.6, 0, .4, 1);
}

/* sizes / positions with staggered delays (still on the right) */
.hero-circle-small {
  top: 200px;
  right: -150px;
  width: 300px;
  height: 300px;
  opacity: 0.4;
  animation-delay: 0s;
}

.hero-circle-medium {
  top: 50px;
  right: -300px;
  width: 600px;
  height: 600px;
  opacity: 0.3;
  animation-delay: 0.3s;
}

.hero-circle-large {
  top: -100px;
  right: -450px;
  width: 900px;
  height: 900px;
  opacity: 0.2;
  animation-delay: 0.6s;
}

.hero-circle-xlarge {
  top: -250px;
  right: -600px;
  width: 1200px;
  height: 1200px;
  opacity: 0.1;
  animation-delay: 0.9s;
}

.hero-circle-xxlarge {
  top: -400px;
  right: -750px;
  width: 1500px;
  height: 1500px;
  opacity: 0.05;
  animation-delay: 1.2s;
}

@keyframes circle-scale {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
</style>
