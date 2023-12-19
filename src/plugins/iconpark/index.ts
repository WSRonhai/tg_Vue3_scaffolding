import { createApp } from 'vue'
import {
  Home,
  User,
  SettingTwo,
  Permissions,
  HamburgerButton,
  DataUser,
  EveryUser,
  Avatar,
  Power,
  MenuUnfoldOne,
  MenuFoldOne,
  Gastrointestinal
} from '@icon-park/vue-next'

const iconList = [
  {
    icon: 'Home',
    module: Home,
  },
  {
    icon: 'User',
    module: User,
  },
  {
    icon: 'SettingTwo',
    module: SettingTwo,
  },
  {
    icon: 'Permissions',
    module: Permissions,
  },
  {
    icon: 'SettingTwo',
    module: SettingTwo,
  },
  {
    icon: 'HamburgerButton',
    module: HamburgerButton,
  },
  {
    icon: 'EveryUser',
    module: EveryUser,
  },
  {
    icon: 'DataUser',
    module: DataUser,
  },
  {
    icon: 'Avatar',
    module: Avatar,
  },
  {
    icon: 'Power',
    module: Power,
  },
  {
    icon: 'MenuUnfoldOne',
    module: MenuUnfoldOne,
  },
  {
    icon: 'MenuFoldOne',
    module: MenuFoldOne,
  },
  {
    icon: 'Gastrointestinal',
    module: Gastrointestinal,
  },
]

export default function IconPark(app: ReturnType<typeof createApp>) {
  /**
   * 1. https://iconpark.oceanengine.com/official
   * 2.页面使用 <alignment-horizontal-top theme="outline" size="15" fill="#fff"/>
   */
  iconList.forEach((obj) => {
    app.component(obj.icon, obj.module)
  })
}
