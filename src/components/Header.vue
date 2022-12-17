<template>
  <nav class="header" id="header-id">
    <div class="header__logo-title">
      <div class="header__logo">
        <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8806 25.6055V30.0586L10.3142 32.4336L4.7478 30.0586V25.6055L10.3142 23.3789L15.8806 25.6055Z"
                fill="#B8C7E6"/>
          <path d="M15.8806 16.6992V21.1523L10.3142 23.3789L4.7478 21.1523V16.6992L10.3142 14.4727L15.8806 16.6992Z"
                fill="#B8C7E6"/>
          <path d="M15.8806 21.1523V16.6992L10.3142 14.4727V23.3789L15.8806 21.1523Z" fill="#A3B4D9"/>
          <path d="M15.8806 30.0586V25.6055L10.3142 23.3789V32.4336L15.8806 30.0586Z" fill="#A3B4D9"/>
          <path
              d="M14.7673 11.1328H5.86108C5.23757 11.1328 4.7478 11.6226 4.7478 12.2461V16.6992H15.8806V12.2461C15.8806 11.6226 15.3908 11.1328 14.7673 11.1328Z"
              fill="#CDD9F2"/>
          <path
              d="M15.8806 30.0586V32.4336C15.8806 32.723 15.7692 33.0125 15.5466 33.2128L11.0934 37.6659C10.8931 37.8887 10.6037 38 10.3142 38C10.0248 38 9.7353 37.8887 9.53499 37.6659L5.08186 33.2128C4.85921 33.0125 4.7478 32.723 4.7478 32.4336V30.0586H15.8806Z"
              fill="#CDD9F2"/>
          <path d="M4.7478 21.1523H15.8806V25.6055H4.7478V21.1523Z" fill="#CDD9F2"/>
          <path
              d="M10.3142 38C10.6037 38 10.8931 37.8887 11.0934 37.6659L15.5466 33.2128C15.7692 33.0125 15.8806 32.723 15.8806 32.4336V30.0586H10.3142V38Z"
              fill="#B8C7E6"/>
          <path d="M10.3142 21.1523H15.8806V25.6055H10.3142V21.1523Z" fill="#B8C7E6"/>
          <path d="M14.7673 11.1328H10.3142V16.6992H15.8806V12.2461C15.8806 11.6226 15.3908 11.1328 14.7673 11.1328Z"
                fill="#B8C7E6"/>
          <path
              d="M2.52124 8.12708V12.2461C2.52124 12.8695 3.01101 13.3594 3.63452 13.3594H16.9939C17.6174 13.3594 18.1072 12.8695 18.1072 12.2461V8.12708L10.3142 5.90051L2.52124 8.12708Z"
              fill="#B8C7E6"/>
          <path
              d="M16.9939 13.3594C17.6174 13.3594 18.1072 12.8695 18.1072 12.2461V8.12708L10.3142 5.90051V13.3594H16.9939Z"
              fill="#A3B4D9"/>
          <path
              d="M20.0666 5.18796L18.1072 8.12703H2.52128L0.561902 5.18796C-0.105918 4.18601 -0.195055 2.87227 0.383852 1.78125C0.962758 0.690234 2.09838 0 3.34511 0H8.08768C8.71119 0 9.20096 0.48977 9.20096 1.11328C9.20096 1.73679 9.69073 2.22656 10.3142 2.22656C10.9378 2.22656 11.4275 1.73679 11.4275 1.11328C11.4275 0.48977 11.9173 0 12.5408 0H17.2834C18.5301 0 19.6657 0.690234 20.2446 1.78125C20.8236 2.87227 20.7344 4.16367 20.0666 5.18796V5.18796Z"
              fill="#E5EDFF"/>
          <path
              d="M18.1072 8.12703L20.0666 5.18796C20.7344 4.16367 20.8235 2.87219 20.2446 1.78125C19.6657 0.690309 18.5301 0 17.2834 0H12.5408C11.9173 0 11.4275 0.48977 11.4275 1.11328C11.4275 1.73679 10.9377 2.22656 10.3142 2.22656V8.12703H18.1072Z"
              fill="#CDD9F2"/>
        </svg>
      </div>
      <div class="header__title">
        <router-link :to="{name: 'ListView'}" class="header__title-font-size">Virtueller Assistent</router-link>
      </div>
    </div>
    <a @click="showResponsiveNavigation" href="#" class="header__toggle-button">
      <span class="header__bar"></span>
      <span class="header__bar"></span>
      <span class="header__bar"></span>
    </a>
    <div class="header__links">
      <ul>
        <li>
          <router-link :to="{name: 'ListView'}">Home</router-link>
        </li>
        <li><a href="https://quizzical-keller-9651b4.netlify.app/" target="_blank">Auftragsübersicht</a></li>
        <li><a href="https://quizzical-keller-9651b4.netlify.app/" target="_blank">Neuer Auftrag</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    showResponsiveNavigation() {
      const navbarLinks = document.getElementsByClassName('header__links')[0]
      navbarLinks.classList.toggle('navMobileActive')
    }
  }
}
</script>