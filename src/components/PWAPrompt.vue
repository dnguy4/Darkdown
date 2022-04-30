<!-- Made based off this tutorial https://blog.logrocket.com/building-pwa-vue/
Original Author:  Josh Collinsworth-->
<template>
  <div v-if="shown" class="flex">

    <button class="bg-[#f2a283] rounded-lg p-3 m-auto" @click="installPWA">
      Install Darkdown?
    </button>

  </div>
</template>

<script>
export default {
  name: "PWAPrompt",
  data: () => ({
    shown: true,
  }),

  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    dismissPrompt() {
      this.shown = false
    },

    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
  }
}
</script>