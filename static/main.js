Vue.component('table-teams', {
    template: `
    <v-flex class="md5 mt-5">
      <v-toolbar flat color="white">
        <v-toolbar-title>Таблица Команды</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Добавить Команду</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.id" label="№"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.NameTeam" label="Наименование"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.NameGorod" label="Город"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="teams" hide-actions class="elevation-1 mt-2">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.NameTeam }}</td>
          <td>{{ props.item.NameGorod }}</td>
          <td class=" layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-flex>
    `,
    data: () => ({
        dialog: false,
        headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Наименование', value: 'NameTeam', sortable: false },
          { text: 'Город', value: 'NameGorod', sortable: false },
        ],
        teams: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          NameTeam: '',
          NameGorod: '',
        },
        defaultItem: {
          id: 0,
          NameTeam: '',
          NameGorod: '',
        }
      }),
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Добавить команду' : 'Изменить команду'
        }
      },

      watch: {
        dialog (val) {
          val || this.close()
        }
      },

      created () {
        this.initialize()
      },

      methods: {
        initialize () {
          this.teams = [
            {
              id: 1,
              NameTeam: 'ЦСКА',
              NameGorod: 'Москва',
            },
            {
              id: 2,
              NameTeam: 'УНИКС',
              NameGorod: 'Питер',
            },
            {
              id: 3,
              NameTeam: 'Альба',
              NameGorod: 'Казань',
            },
            {
              id: 4,
              NameTeam: 'Валенсия',
              NameGorod: 'Ярославль',
            }
          ]
        },

        editItem (item) {
          this.editedIndex = this.teams.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        deleteItem (item) {
          const index = this.teams.indexOf(item)
          confirm('Вы действительно хотите удалить эту команду?') && this.teams.splice(index, 1)
        },

        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.teams[this.editedIndex], this.editedItem)
          } else {
            this.teams.push(this.editedItem)
          }
          this.close()
        }
      }
})

Vue.component('table-matches', {
  template: `
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Таблица Чемпионат</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Добавить матч</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="№"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.NameGorod" label="Город"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Hoz" label="Хозяин"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Gos" label="Гость"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Sud" label="Судья"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Dat" label="Дата"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.RezH" label="Результат Хозяина"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.RezG" label="Результат Гостя"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.Stat" label="Статус"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Отмена</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="matches" hide-actions class="elevation-1 mt-2" >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.NameGorod }}</td>
        <td>{{ props.item.Hoz }}</td>
        <td>{{ props.item.Gos }}</td>
        <td>{{ props.item.Sud }}</td>
        <td>{{ props.item.Dat }}</td>
        <td>{{ props.item.RezH }}</td>
        <td>{{ props.item.RezG }}</td>
        <td>{{ props.item.Stat }}</td>
        <td class=" layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
  `,
  data: () => ({
      dialog: false,
      headers: [
        {
          text: '№',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Город', value: 'NameGorod', sortable: false },
        { text: 'Хозяин', value: 'Hoz', sortable: false },
        { text: 'Гость', value: 'Gos', sortable: false },
        { text: 'Судья', value: 'Sud', sortable: false },
        { text: 'Дата', value: 'Dat', sortable: false },
        { text: 'Рез. Хоз.', value: 'RezH', sortable: false },
        { text: 'Рез. Гос.', value: 'RezG', sortable: false },
        { text: 'Статус', value: 'Stat', sortable: false }
      ],
      matches: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        NameGorod: '',
        Hoz: '',
        Gos: '',
        Sud: '',
        Dat: '',
        RezH: 0,
        RezG: 0,
        Stat: ''
      },
      defaultItem: {
        id: 0,
        NameGorod: '',
        Hoz: '',
        Gos: '',
        Sud: '',
        Dat: '',
        RezH: 0,
        RezG: 0,
        Stat: ''
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить матч' : 'Изменить матч'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.matches = [
          {
            id: 1,
            NameGorod: 'Москва',
            Hoz: 'ЦСКА',
            Gos: 'Альба',
            Sud: 'Игорь',
            Dat: '21.03.2019',
            RezH: 90,
            RezG: 87,
            Stat: 'завершен'
          },
          {
            id: 2,
            NameGorod: 'Питер',
            Hoz: 'УНИКС',
            Gos: 'Валенсия',
            Sud: 'Виктор',
            Dat: '29.04.2019',
            RezH: 0,
            RezG: 0,
            Stat: 'Не завершен'
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.matches.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.matches.indexOf(item)
        confirm('Вы действительно хотите удалить этот матч?') && this.matches.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.matches[this.editedIndex], this.editedItem)
        } else {
          this.matches.push(this.editedItem)
        }
        this.close()
      }
    }
})


Vue.component('home-page', {
  template: `
  <!-- <div style="background-image: url(https://moneydotcomvip.files.wordpress.com/2015/03/150320_ho_lede.jpg); background-size: 100% 100%; height:100vh">-->
  <v-container>
    <table-matches></table-matches>
    <table-teams></table-teams>
  </v-container>
  <!-- </div>-->

  `,
  data: () => ({

  }),
})


Vue.component('sign-in', {
  template: `
    <div style="background: #eee">
    <v-container style="height: 100vh; background: #eee">
        <v-layout fill-height wrap justify-center align-content-center>
          <v-flex xs12 md6>
            <v-card class="pt-4 pb-5 pl-5 pr-5 mb-5">
              <v-card-title primary-title>
                  <div class="headline" style="margin: auto">Войти в систему</div>
              </v-card-title>
              <v-text-field label="Логин" v-model="login" clearable required outline ></v-text-field>
              <v-text-field :rules="passwordRules" label="Пароль" v-model="password" clearable required outline></v-text-field>

              <v-card-actions class="pl-0 pr-0">
                <v-btn depressed @click="login_request()" flat style="border: 2px solid rgba(0,0,0,.54); border-radius: 4px; text-transform: none" class="ml-0">Войти</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
    </div>
  `,
  data: () => ({
    login: '',
    password: '',
    passwordRules: [
      v => !!v || 'Введите пароль',
      v => v.length >= 8 || 'Минимально 8 символов',
    ],
  }),
  methods: {
    login_request(){
      self.router.push('/home_page')
    },
    emailInputText() {
      alert(this.login, )
    },
    passwordInputText() {
      alert(this.password, )
    }
  },
})

Vue.component('start-page', {
  template: `
  <div style="background: #eee">
    <v-container style="height: 100vh; background: #eee">
      <v-layout fill-height wrap justify-center align-content-center>
        <v-flex xs12 md6>
          <v-card class="pt-4 pb-5 pl-5 pr-5 mb-5">
            <v-card-title primary-title>
              <div class="headline" style="margin: auto">БАСКЕТБОЛЬНЫЙ ЧЕМПИОНАТ</div>
            </v-card-title>
            <v-card-actions class="pl-0 pr-0">
              <v-layout column>
                <v-btn @click="go_to_home_page()" color="primary" style="border-radius: 4px; text-transform: none" class="ml-0">Посмотреть статистику</v-btn>
                <v-btn @click="go_to_sign_in()"color="error" style="border-radius: 4px; text-transform: none" class="ml-0 mt-3">Войти как администратор</v-btn>
              </v-layout>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  `,
    data: () => ({

    }),
    methods: {
      go_to_home_page(){
        self.router.push('/home_page')
      },
      go_to_sign_in(){
        self.router.push('/sign_in')
      }

    }
})

const SignIn = { template: '<sign-in></sign-in>' }
const Options = { template: '<home-page></home-page>' }
const StartPage = { template: '<start-page></start-page>' }

const routes = [
  { path: '/sign_in', component: SignIn },
  { path: '/home_page', component: Options },
  { path: '/', component: StartPage },
]

var router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  data: () => ({})
})
