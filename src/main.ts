/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the root component.
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import Strona_Glowna from './Strona_Glowna.vue'

// Styles
import 'unfonts.css'

const app = createApp(Strona_Glowna)

registerPlugins(app)

app.mount('#app')
