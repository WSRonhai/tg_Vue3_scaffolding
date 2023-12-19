import { defineStore } from 'pinia'

interface teamType {
  id: number
  name: string
}
export const useHomeStore = defineStore(
  'home',
  () => {
    const ip = ref('')
    const port = ref('')
    const teamId = ref(0) as Ref<number>

    const teamList: Array<teamType> = reactive([
      {
        id: 1,
        name: '1组',
      },
      {
        id: 2,
        name: '2组',
      },
      {
        id: 3,
        name: '3组',
      },
      {
        id: 4,
        name: '4组',
      },
      {
        id: 5,
        name: '5组',
      },
      {
        id: 6,
        name: '6组',
      },
      {
        id: 7,
        name: '7组',
      },
      {
        id: 8,
        name: '8组',
      },
      {
        id: 9,
        name: '9组',
      },
      {
        id: 10,
        name: '10组',
      },
      {
        id: 11,
        name: '11组',
      },
      {
        id: 12,
        name: '12组',
      },
    ])
    const selectTeam = (item: teamType) => {
      teamId.value = item.id
    }

    const reset = () => {
      teamId.value = 0
      ip.value = ''
      port.value = ''
    }

    return { ip, port, teamId, teamList, selectTeam, reset }
  },
  {
    persist: true,
  },
)
