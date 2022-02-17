
<template>
  <transition-group name="notifications" tag="div">
    <div class="notification" v-for="notif in notifs" :key="notif.id" role="log">
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7058 1.70837C16.0971 1.31855 16.0982 0.685382 15.7084 0.294159C15.3185 -0.097063 14.6854 -0.0981957 14.2942 0.291629L15.7058 1.70837ZM5.96774 10L5.2619 10.7084C5.65213 11.0972 6.28335 11.0972 6.67358 10.7084L5.96774 10ZM1.70584 4.34163C1.31462 3.9518 0.681454 3.95294 0.291629 4.34416C-0.0981957 4.73538 -0.097063 5.36855 0.294159 5.75837L1.70584 4.34163ZM14.2942 0.291629L5.2619 9.29163L6.67358 10.7084L15.7058 1.70837L14.2942 0.291629ZM6.67358 9.29163L1.70584 4.34163L0.294159 5.75837L5.2619 10.7084L6.67358 9.29163Z" fill="black"/>
      </svg>
      <span>{{ notif.text }}</span>
    </div>
  </transition-group>
</template>

<script>
import emitter from 'tiny-emitter/instance'

export default {
  data() {
    return {
      notifs: []
    }
  },
  mounted() {
    emitter.on('pushNotification', (text) => {
      const id = this.notifsNbr ? this.notifsNbr++ : this.notifsNbr = 1
      this.notifs.push({ text, id })
      
      setTimeout(() => {
        this.notifs = this.notifs.filter(notif => notif.id !== id)
      }, 1000)
    })
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/var';

.notification {
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: $color-white;
  min-width: 100px;
  padding: 8px 24px 8px 18px;
  font-size: 18px;
  animation: fadein 200ms ease;
  box-shadow: 0 0 10px #0004;
  border-radius: 5px;
  border-left: solid 6px $color-black;
  text-align: center;
  transition: all 140ms;

  > svg {
    margin-right: 8px;
  }
}

.notifications-enter-active {
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(.48,0,.91,1.31);
}
.notifications-leave-active {
  transition-timing-function: ease-out;
}

.notifications-enter-from,
.notifications-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(150%);
}
</style>