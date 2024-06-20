import './assets/main.css'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'



const app = createApp(App)
const pinia = createPinia();

const i18n = createI18n({
    legacy: false,
    locale: 'de',
    fallbackLocale: 'en',
    messages:{
        en:{
            message: {
                headline: 'weather forecast',
                humidity: 'Humidity',
                alert: 'Warnings',
                rain: 'Rain'
            }
        },
        de:{
            message: {
                headline: 'Wettervorhersage',
                humidity: 'Luftfeuchtigkeit',
                alert: 'Wetterwarnungen',
                rain: 'Regen'
            }
        }
    }
})

app.use(i18n)
app.use(pinia)
app.mount('#app')