import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'

import Strona_Glowna from './Strona_Glowna.vue'

import 'unfonts.css'

const app = createApp(Strona_Glowna)

registerPlugins(app)

app.mount('#app')