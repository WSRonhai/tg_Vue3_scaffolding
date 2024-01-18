import type { App } from 'vue'
import permission from './permission'

const directives = {
    permission,
}

export default {
    install(app: App<Element>) {
        Object.keys(directives).forEach(() => {
            app.directive(key, directives[key])
        })
    }
}