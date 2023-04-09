<template>
  <nav>
    <div class="navbar">
      <div class="container nav-container">
        <div class="menu-items">
          <slot name="first"></slot>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
}
</script>

<style scoped>
.container {
  width: 90%;
  margin: auto;
}

.navbar {
  width: 100%;
    padding: 0;

}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90vh;
    padding: 0;
    margin: 0;
}

.navbar .menu-items {
  display: flex;
    
}

.navbar .nav-container li {
  list-style: none;
}

.navbar .nav-container a {
  text-decoration: none;
  color: #0e2431;
  font-weight: 500;
  font-size: 1.2rem;
}

.navbar .nav-container a:hover{
  font-weight: bolder;
}

.nav-container {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100%;
}

.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 20px;
  left: 20px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.nav-container .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.navbar .menu-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-in-out;
  text-align: center;
}

.logo {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 1.2rem;
  color: #0e2431;
}

.nav-container input[type="checkbox"]:checked ~ .menu-items {
  transform: translateX(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
  transform: rotate(-45deg);
}

.nav-container input[type="checkbox"]:checked ~ .logo{
  display: none;
}
</style>