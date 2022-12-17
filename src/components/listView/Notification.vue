<template>
      <div class="notification" id="notification-id" @click="decreaseNotification">
        <div class="notification__info-icon-text">
          <svg class="notification__info-icon" id="notification__info-icon-id" width="6" height="12" viewBox="0 0 6 12" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.14332 10.705L4.97565 11.3904C4.47264 11.5889 4.07084 11.7401 3.77164 11.8439C3.47211 11.9482 3.12408 12 2.72755 12C2.11861 12 1.64496 11.8508 1.30715 11.5545C0.969339 11.2571 0.80038 10.8801 0.80038 10.4228C0.80038 10.2458 0.81264 10.0637 0.83813 9.87816C0.863834 9.69243 0.904703 9.48324 0.960628 9.24943L1.58925 7.02446C1.64518 6.8114 1.69271 6.60953 1.73079 6.41863C1.7694 6.22892 1.788 6.05437 1.788 5.89724C1.788 5.61309 1.72917 5.41434 1.61205 5.3026C1.49493 5.19118 1.27144 5.13461 0.939656 5.13461C0.777149 5.13461 0.610126 5.16063 0.439876 5.21097C0.268873 5.26151 0.122713 5.31034 0 5.35573L0.168099 4.66978C0.579904 4.50211 0.973534 4.35853 1.35006 4.23937C1.72659 4.11988 2.08236 4.06008 2.41889 4.06008C3.02363 4.06008 3.49029 4.20624 3.81799 4.49856C4.14569 4.79109 4.30949 5.17031 4.30949 5.63761C4.30949 5.7343 4.29874 5.90466 4.27561 6.14815C4.25303 6.39218 4.21098 6.61577 4.14967 6.81915L3.52374 9.0352C3.47244 9.21319 3.4263 9.41667 3.38618 9.64564C3.34478 9.87311 3.32499 10.0469 3.32499 10.1635C3.32499 10.4577 3.39059 10.6586 3.52212 10.7654C3.65462 10.8722 3.88284 10.9254 4.207 10.9254C4.35918 10.9254 4.53233 10.8984 4.72474 10.8454C4.9166 10.7923 5.05653 10.7458 5.14332 10.705ZM5.30206 1.40136C5.30206 1.78746 5.15655 2.11721 4.86412 2.38834C4.57245 2.66044 4.22098 2.7966 3.80982 2.7966C3.39737 2.7966 3.04504 2.66044 2.75003 2.38834C2.45556 2.1171 2.308 1.78746 2.308 1.40136C2.308 1.01602 2.45556 0.685733 2.75003 0.41116C3.0445 0.137017 3.39747 0 3.80982 0C4.22087 0 4.57245 0.13734 4.86412 0.41116C5.15676 0.685733 5.30206 1.01612 5.30206 1.40136Z"
                fill="white"/>
          </svg>
          <p id="notification__text-id"></p>
        </div>
        <div class="notification__arrow" id="notification__arrow-id">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7201 6.88056L2.74107 6.88056L4.79796 4.82366C5.38878 4.23284 4.50255 3.34666 3.91173 3.93747L2.03846 5.81365L0.787949 7.06612C0.54559 7.30992 0.54559 7.70367 0.787949 7.94748L3.91173 11.0749C4.03058 11.197 4.19417 11.2656 4.36461 11.2641C4.92723 11.2641 5.20335 10.5788 4.79796 10.1886L2.73619 8.13174L13.7524 8.13174C14.6189 8.08874 14.5542 6.83743 13.7201 6.88056V6.88056Z" fill="white"/>
          </svg>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      fullNotification: true,
    }
  },
  mounted() {
    var i= 0
    var typingWord = "Wählen Sie alle nicht zutreffenden Gefährdungen aus und bearbeiten Sie die zutreffenden Gefährdungen."

    function typing(){
      if(i < typingWord.length){
        document.getElementById("notification__text-id").innerHTML += typingWord.charAt(i)
        i++
        setTimeout(typing, 10)
      }
    }
    typing()
  },
  methods: {
    decreaseNotification() {
      let notification = document.getElementById("notification-id")
      let textNotification = document.getElementById("notification__text-id")
      let arrowLeft = document.getElementById("notification__arrow-id")
      notification.style.transition = "1s"

      if (this.fullNotification === true) {
        notification.style.width = "5%"
        textNotification.style.display = "none"
        arrowLeft.style.display = "none"
        this.fullNotification = false
      } else {
        notification.style.width = "100%"
        arrowLeft.style.display = "flex"
        setTimeout(() => {
          textNotification.style.display = "block"
        }, 250)
        this.fullNotification = true
      }
    }
  }
}
</script>