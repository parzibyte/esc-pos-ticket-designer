import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { translations } from "./translations"

import App from './App.vue'
import router from './router'
const i18n = createI18n({
    locale: "es",
    fallbackLocale: "en",
    messages: translations,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n);

app.mount('#app')
