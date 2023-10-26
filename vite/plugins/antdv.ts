import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function autoRegisterAntdV() {
    return Components({
        resolvers: [
            AntDesignVueResolver({
                importStyle: false, // css in js
            }),
        ],
    })
}