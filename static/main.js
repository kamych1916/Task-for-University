Vue.component('table-matches', {
  template: `
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Таблица Матчей</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="550px">
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
                  <div style="visibility: hidden; position:absolute">
                    <v-text-field v-model="editedItem.NameGorod" label="Город"></v-text-field>
                  </div>
                  <v-select v-model="editedItem.NameGorod" :items="cities" :rules="rules.rule_for_city" color="pink" label="Город" required ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <div style="visibility: hidden; position:absolute">
                      <v-text-field v-model="editedItem.Hoz" label="Хозяин"></v-text-field>
                    </div>
                    <v-select v-model="editedItem.Hoz" :items="HozMatch" :rules="rules.rule_for_Hoz" color="pink" label="Хозяин" required ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                    <div style="visibility: hidden; position:absolute">
                      <v-text-field v-model="editedItem.Gos" label="Гость"></v-text-field>
                    </div>
                    <v-select v-model="editedItem.Gos" :items="GosMatch" :rules="rules.rule_for_Gos" color="pink" label="Гость" required ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <div style="visibility: hidden; position:absolute">
                    <v-text-field v-model="editedItem.Sud" label="Судья"></v-text-field>
                  </div>
                  <v-select v-model="editedItem.Sud" :items="SudMatch" :rules="rules.rule_for_Sud" color="pink" label="Судья" required ></v-select>
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
    <v-alert :value="alert" type="error" > Выбранными вами судья не имеет права судить матч, который из того-же города что и одна из команд</v-alert>
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
          <v-icon small class="mr-2" @click="editItem(props.item)" > edit </v-icon>
          <!--<v-icon small class="mr-2" @click="deleteItem(props.item)" > delete </v-icon>-->
          <v-dialog v-model="dialogFC" max-width="550px">
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="change(props.item)"> error </v-icon>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Исключение в матче</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap row>
                    <v-flex>
                      <p>№ {{editedItem.id}}</p>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                        <div style="visibility: hidden; position:absolute">
                          <v-text-field v-model="editedItem.Hoz" label="Хозяин"></v-text-field>
                        </div>
                        <v-select v-model="editedItem.Hoz" :items="HozMatch" :rules="rules.rule_for_Hoz" color="pink" label="Хозяин" required ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                        <div style="visibility: hidden; position:absolute">
                          <v-text-field v-model="editedItem.Gos" label="Гость"></v-text-field>
                        </div>
                        <v-select default="1" v-model="editedItem.Gos"  :items="GosMatch" :rules="rules.rule_for_Gos" color="pink" label="Гость" required ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <div style="visibility: hidden; position:absolute">
                        <v-text-field v-model="editedItem.Sud" label="Судья"></v-text-field>
                      </div>
                      <v-select v-model="editedItem.Sud" :items="SudMatch" :rules="rules.rule_for_Sud" color="pink" label="Судья" required ></v-select>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close()">Отмена</v-btn>
                <v-btn color="blue darken-1" flat @click="exclusion()">Ислючить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </td>
      </template>
    </v-data-table>

  </div>
  `,
  data: () => ({
      alert: false,
      dialog: false,
      dialogFC: false,
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
      },
      rules: {
        rule_for_city: [val => (val || '').length > 0 || 'Это поле обязательное!'],
        rule_for_Hoz: [val => (val || '').length > 0 || 'Это поле обязательное!'],
        rule_for_Gos: [val => (val || '').length > 0 || 'Это поле обязательное!'],
        rule_for_Sud: [val => (val || '').length > 0 || 'Это поле обязательное!'],
      },
      cities: [],
      HozMatch: [],
      GosMatch: [],
      SudMatch: [],
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Добавить матч' : 'Изменить матч. Возможно изменение только Судьи и Результат матча'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initializeTableMatch()
      this.initializeGorodMatch()
      this.initializeHozMatch()
      this.initializeGosMatch()
      this.initializeSudMatch()
    },

    methods: {
      initializeTableMatch() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTableMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.matches.push(data.meth[i]);
            }
          }
        }
        xhr.send()
      },
      initializeGorodMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGorodMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.cities.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeHozMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeHozMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.HozMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeGosMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGosMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.GosMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeSudMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeSudMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.SudMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },

      editItem(item) {
        this.editedIndex = this.matches.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      // deleteItem (item) {
      //   const index = this.matches.indexOf(item)
      //   var xhr = new XMLHttpRequest();
      //   var self = this;
      //   data = {
      //     m_id: index + 1,
      //   }
      //   data_s = JSON.stringify(data)
      //   xhr.withCredentials = true;
      //   xhr.open('POST', '/delete_match', true)
      //   xhr.setRequestHeader('Content-Type', 'application/json');
      //   xhr.onreadystatechange= function(){
      //     if (this.readyState == 4){
      //       var json_s = this.responseText
      //       var data = JSON.parse(json_s)
      //       confirm('Вы действительно хотите удалить этот матч?') && self.matches.splice(index, 1)
      //     }
      //   }
      //   console.log(data_s)
      //   xhr.send(data_s)
      //
      // },

      close () {
        this.dialog = false
        this.dialogFC = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          var xhr = new XMLHttpRequest();
          var self = this;
          data = {
            m_id: this.editedItem.id,
            m_NameReferee: this.editedItem.Sud,
            m_RezH: this.editedItem.RezH,
            m_RezG: this.editedItem.RezG,
          }
          data_s = JSON.stringify(data)
          xhr.withCredentials = true;
          xhr.open('POST', '/edit_match', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              if (data.code == '1'){
                self.alert = true
              }
              else{
                Object.assign(self.matches[self.editedIndex], self.editedItem)
              }
            }
          }
          xhr.send(data_s)
        } else {
          var xhr = new XMLHttpRequest();
          var self = this;
          data = {
            m_id: this.editedItem.id,
            m_Gorod: this.editedItem.NameGorod,
            m_Hoz: this.editedItem.Hoz,
            m_Gos: this.editedItem.Gos,
            m_NameReferee: this.editedItem.Sud,
            m_Dat: this.editedItem.Dat,
            m_RezH: this.editedItem.RezH,
            m_RezG: this.editedItem.RezG,
            m_Stat: this.editedItem.Stat,
          }
          data_s = JSON.stringify(data)
          xhr.withCredentials = true;
          xhr.open('POST', '/add_match', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              if (data.code == '2'){
                self.alert = true
              }
              else if (data.code == '1'){
                alert('ошибка ввода (вы выбрали "гостя" и "хозяина" как одну команду)')
              }
              else{
                self.matches.push(self.editedItem)
              }
            }
          }
          xhr.send(data_s)
        }
        this.close()
      },
      change(item){
        this.editedIndex = this.matches.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogFC = true
        this.editedItem.Hoz = ''
        this.editedItem.Gos = ''
        this.editedItem.Sud = ''
      },
      exclusion(){
        var xhr = new XMLHttpRequest();
        var self = this;
        data = {
          m_id: this.editedItem.id,
          m_Hoz: this.editedItem.Hoz,
          m_Gos: this.editedItem.Gos,
          m_NameReferee: this.editedItem.Sud,
          m_Stat: this.editedItem.Stat,
        }
        data_s = JSON.stringify(data)
        xhr.withCredentials = true;
        xhr.open('POST', '/exclusion_match', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            Object.assign(self.matches  [self.editedIndex], self.editedItem)
          }
        }
        xhr.send(data_s)
      }
    }
})

Vue.component('table-teams', {
    template: `
    <v-flex class="md5 mt-5">
      <v-toolbar flat color="white">
        <v-toolbar-title>Таблица Команд</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="520px">
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
                  <div style="visibility: hidden; position:absolute">
                  <v-text-field v-model="editedItem.NameGorod" label="Город" ></v-text-field>
                  </div>
                  <v-select v-model="editedItem.NameGorod" :items="cities" :rules="rules.rule_for_city" color="pink" label="Выберите город" required ></v-select>
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
      <v-data-table :headers="headers" :items="teams" hide-actions class="elevation-1 mt-2" >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.NameTeam }}</td>
          <td>{{ props.item.NameGorod }}</td>
          <td class=" layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)" > edit </v-icon>
            <!--<v-icon small @click="deleteItem(props.item)" > delete </v-icon>-->
          </td>
        </template>
      </v-data-table>
    </v-flex>
    `,
    data: () => ({
        label_city: '',
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
        },
          rules: {
            rule_for_city: [val => (val || '').length > 0 || 'Это поле обязательное!'],
          },
          cities: [],
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
        this.initializeTableKomanda()
        this.initializeGorodKomanda()
      },

      methods: {
        initializeTableKomanda() {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.withCredentials = true;
          xhr.open('GET', '/initializeTableKomanda', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              for (var i = 0; i < data.meth.length; i++){
                self.teams.push(data.meth[i]);
              }
            }
          }
          xhr.send()
        },
        initializeGorodKomanda() {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.withCredentials = true;
          xhr.open('GET', '/initializeGorodKomanda', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              for (var g = 0; g < data.meth.length; g++){
                self.cities.push(data.meth[g])
              }
            }
          }
          xhr.send()
        },

        editItem (item) {
          this.editedIndex = this.teams.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        // deleteItem (item) {
        //   const index = this.teams.indexOf(item)
        //   var xhr = new XMLHttpRequest();
        //   var self = this;
        //   data = {
        //     s_id: index + 1,
        //   }
        //   data_s = JSON.stringify(data)
        //   xhr.withCredentials = true;
        //   xhr.open('POST', '/delete_comanda', true)
        //   xhr.setRequestHeader('Content-Type', 'application/json');
        //   xhr.onreadystatechange= function(){
        //     if (this.readyState == 4){
        //       var json_s = this.responseText
        //       var data = JSON.parse(json_s)
        //       confirm('Вы действительно хотите удалить эту команду?') && self.teams.splice(index, 1)
        //     }
        //   }
        //   xhr.send(data_s)
        // },

        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              s_id: this.editedItem.id,
              s_NameTeam: this.editedItem.NameTeam,
              s_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/edit_comanda', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                Object.assign(self.teams[self.editedIndex], self.editedItem)
              }
            }
            console.log(data_s)
            xhr.send(data_s)
          } else {
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              s_id: this.editedItem.id,
              s_NameTeam: this.editedItem.NameTeam,
              s_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/add_comanda', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                self.teams.push(self.editedItem)
              }
            }
            console.log(data_s)
            xhr.send(data_s)
          }
          this.close()
        }
      }
})

Vue.component('table-referee', {
    template: `
    <v-flex class="md5 mt-5">
      <v-toolbar flat color="white">
        <v-toolbar-title>Таблица Судей</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="520px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Добавить Судью</v-btn>
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
                    <v-text-field v-model="editedItem.NameReferee" label="Имя"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                  <div style="visibility: hidden; position:absolute">
                    <v-text-field v-model="editedItem.NameGorod" label="Город" ></v-text-field>
                  </div>
                  <v-select v-model="editedItem.NameGorod" :items="cities" :rules="rules.rule_for_city" color="pink" label="Выберите город" required ></v-select>
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
      <v-data-table :headers="headers" :items="sudii" hide-actions class="elevation-1 mt-2">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.NameReferee }}</td>
          <td>{{ props.item.NameGorod }}</td>
          <td class=" layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)" > edit </v-icon>
            <!-- <v-icon small @click="deleteItem(props.item)" > delete </v-icon> -->
          </td>
        </template>
      </v-data-table>
    </v-flex>
    `,
    data: () => ({
        label_city: '',
        dialog: false,
        headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Имя', value: 'NameReferee', sortable: false },
          { text: 'Город', value: 'NameGorod', sortable: false },
        ],
        sudii: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          NameReferee: '',
          NameGorod: '',
        },
        defaultItem: {
          id: 0,
          NameReferee: '',
          NameGorod: '',
        },
          rules: {
            rule_for_city: [val => (val || '').length > 0 || 'Это поле обязательное!'],
          },
          cities: [],
      }),
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Добавить судью' : 'Изменить судью'
        }
      },

      watch: {
        dialog (val) {
          val || this.close()
        }
      },

      created () {
        this.initializeTableSudia()
        this.initializeGorodSudia()
      },

      methods: {
        initializeTableSudia() {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.withCredentials = true;
          xhr.open('GET', '/initializeTableSudia', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              for (var i = 0; i < data.meth.length; i++){
                self.sudii.push(data.meth[i]);
              }
            }
          }
          xhr.send()
        },
        initializeGorodSudia() {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.withCredentials = true;
          xhr.open('GET', '/initializeGorodSudia', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              for (var g = 0; g < data.meth.length; g++){
                self.cities.push(data.meth[g])
              }
            }
          }
          xhr.send()
        },
        editItem (item) {
          this.editedIndex = this.sudii.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        // deleteItem (item) {
        //   const index = this.sudii.indexOf(item)
        //   var xhr = new XMLHttpRequest();
        //   var self = this;
        //   data = {
        //     s_id: index + 1,
        //   }
        //   data_s = JSON.stringify(data)
        //   xhr.withCredentials = true;
        //   xhr.open('POST', '/delete_sudia', true)
        //   xhr.setRequestHeader('Content-Type', 'application/json');
        //   xhr.onreadystatechange= function(){
        //     if (this.readyState == 4){
        //       var json_s = this.responseText
        //       var data = JSON.parse(json_s)
        //       confirm('Вы действительно хотите удалить этого судью?') && self.sudii.splice(index, 1)
        //     }
        //   }
        //   xhr.send(data_s)
        // },

        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              s_id: this.editedItem.id,
              s_NameReferee: this.editedItem.NameReferee,
              s_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/edit_sudia', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                Object.assign(self.sudii[self.editedIndex], self.editedItem)
              }
            }
            console.log(data_s)
            xhr.send(data_s)
          } else {
            alert('pushing')
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              s_id: this.editedItem.id,
              s_NameReferee: this.editedItem.NameReferee,
              s_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/add_sudia', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                self.sudii.push(self.editedItem)
              }
            }
            console.log(data_s)
            xhr.send(data_s)
          }
          this.close()
        }
      }
})

Vue.component('table-city', {
    template: `
    <v-flex class="md5 mt-5">
      <v-toolbar flat color="white">
        <v-toolbar-title>Таблица Городов</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Добавить Город</v-btn>
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
                  <v-flex xs12 sm6 md8>
                    <v-text-field v-model="editedItem.NameGorod" label="Наименование"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
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
      <v-data-table :headers="headers" :items="goroda" hide-actions class="elevation-1 mt-2">
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.NameGorod }}</td>
          <td class=" layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)" > edit </v-icon>
            <!-- <v-icon small @click="deleteItem(props.item)" > delete </v-icon> -->
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
          { text: 'Город', value: 'NameGorod', sortable: false },
        ],
        goroda: [],
        editedIndex: -1,
        editedItem: {
          id: 0,
          NameGorod: '',
        },
        defaultItem: {
          id: 0,
          NameGorod: '',
        },
      }),
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Добавить город' : 'Изменить город'
        }
      },

      watch: {
        dialog (val) {
          val || this.close()
        }
      },

      created () {
        this.initializeTableGorod()
      },

      methods: {
        initializeTableGorod() {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.withCredentials = true;
          xhr.open('GET', '/initializeTableGorod', true)
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onreadystatechange= function(){
            if (this.readyState == 4){
              var json_s = this.responseText
              var data = JSON.parse(json_s)
              for (var i = 0; i < data.meth.length; i++){
                self.goroda.push(data.meth[i]);
              }
            }
          }
          xhr.send()
        },
        editItem (item) {
          this.editedIndex = this.goroda.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
        // deleteItem (item) {
        //   const index = this.goroda.indexOf(item)
        //   var xhr = new XMLHttpRequest();
        //   var self = this;
        //   data = {
        //     s_id: index + 1,
        //   }
        //   data_s = JSON.stringify(data)
        //   xhr.withCredentials = true;
        //   xhr.open('POST', '/delete_gorod', true)
        //   xhr.setRequestHeader('Content-Type', 'application/json');
        //   xhr.onreadystatechange= function(){
        //     if (this.readyState == 4){
        //       var json_s = this.responseText
        //       var data = JSON.parse(json_s)
        //       confirm('Вы действительно хотите удалить этот город?') && self.goroda.splice(index, 1)
        //     }
        //   }
        //   xhr.send(data_s)
        // },

        close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              g_id: this.editedItem.id,
              g_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/edit_gorod', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                Object.assign(self.goroda[self.editedIndex], self.editedItem)
              }
            }
            xhr.send(data_s)
          } else {
            var xhr = new XMLHttpRequest();
            var self = this;
            data = {
              g_id: this.editedItem.id,
              g_NameGorod: this.editedItem.NameGorod,
            }
            data_s = JSON.stringify(data)
            xhr.withCredentials = true;
            xhr.open('POST', '/add_gorod', true)
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange= function(){
              if (this.readyState == 4){
                var json_s = this.responseText
                var data = JSON.parse(json_s)
                self.goroda.push(self.editedItem)
              }
            }
            xhr.send(data_s)
          }
          this.close()
        }
      }
})

Vue.component('admin-panel', {
  template: `
  <v-container style="background: white">
    <table-matches></table-matches>
    <v-layout row>
      <table-teams></table-teams>

      <v-spacer></v-spacer>

      <table-referee></table-referee>
    </v-layout>
    <table-city></table-city>
  </v-container>
  `,
  data: () => ({

  }),
})

Vue.component('sign-in', {
  template: `
    <div>
    <v-container style="height: 100vh; background: white">
        <v-layout fill-height wrap justify-center align-content-center>
          <v-flex xs12 md6>
            <v-alert :value="alert" type="error" > Неправильный логин или пароль </v-alert>
            <v-card class="pt-4 pb-5 pl-5 pr-5 mb-5">
              <v-card-title primary-title>
                  <div class="headline" style="margin: auto">Войти в систему</div>
              </v-card-title>
              <v-text-field label="Логин" v-model="login" clearable required outline ></v-text-field>
              <v-text-field :rules="passwordRules" label="Пароль" v-model="pass" clearable required outline></v-text-field>

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
    pass: '',
    passwordRules: [
      v => !!v || 'Введите пароль',
      v => v.length >= 8 || 'Минимально 8 символов',
    ],
    alert: false
  }),
  methods: {
    login_request(){
      var xhr = new XMLHttpRequest();
      var self = this;
      data = {
        username: this.login,
        password: this.pass,
      }
      data_s = JSON.stringify(data)
      xhr.withCredentials = true;
      xhr.open('POST', '/sign_in', true)
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange= function(){
        if (this.readyState == 4){
          var json_s = this.responseText
          var data = JSON.parse(json_s)
          if (data.code == '0'){
            self.$router.push('/admin_panel')
          }
          else{
            self.alert = true;
          }
        }
      }
      xhr.send(data_s)
    },
    emailInputText() {
      alert(this.login)
    },
    passwordInputText() {
      alert(this.password, )
    }
  },
})

Vue.component('table-matches-start', {
  template: `
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Матчи:</v-toolbar-title>
    </v-toolbar>
    <v-data-table dark :headers="headers" :items="matches" hide-actions class="elevation-1 mt-2" >
      <template v-slot:items="props">
        <td style="padding: 0 0 0 24px">{{ props.item.id }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.NameGorod }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.Hoz }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.Gos }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.Sud }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.Dat }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.RezH }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.RezG }}</td>
        <td style="padding: 0 0 0 24px">{{ props.item.Stat }}</td>
      </template>
    </v-data-table>
  </div>
  `,
  data: () => ({
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
      cities: [],
      HozMatch: [],
      GosMatch: [],
      SudMatch: [],
    }),
    created () {
      this.initializeTableMatch()
      this.initializeGorodMatch()
      this.initializeHozMatch()
      this.initializeGosMatch()
      this.initializeSudMatch()
    },

    methods: {
      initializeTableMatch() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTableMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.matches.push(data.meth[i]);
            }
          }
        }
        xhr.send()
      },
      initializeGorodMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGorodMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.cities.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeHozMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeHozMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.HozMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeGosMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGosMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.GosMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeSudMatch(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeSudMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.SudMatch.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
    }
})

Vue.component('table-teams-start', {
  template: `
  <v-flex class="md5 mt-5">
    <v-toolbar color="white" flat>
      <v-toolbar-title >Команды:</v-toolbar-title>
    </v-toolbar>
    <v-data-table dark :headers="headers" :items="teams" hide-actions class="elevation-1 mt-2" >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.NameTeam }}</td>
        <td>{{ props.item.NameGorod }}</td>
      </template>
    </v-data-table>
  </v-flex>
  `,
  data: () => ({
      label_city: '',
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
      teams: [], cities: [],
    }),
    created () {
      this.initializeTableKomanda()
      this.initializeGorodKomanda()
    },

    methods: {
      initializeTableKomanda() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTableKomanda', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.teams.push(data.meth[i]);
            }
          }
        }
        xhr.send()
      },
      initializeGorodKomanda() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGorodKomanda', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.cities.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
    }
})

Vue.component('table-referee-start', {
  template: `
  <v-flex class="md5 mt-5">
    <v-toolbar flat color="white">
      <v-toolbar-title>Судьи:</v-toolbar-title>
    </v-toolbar>
    <v-data-table dark :headers="headers" :items="sudii" hide-actions class="elevation-1 mt-2">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.NameReferee }}</td>
        <td>{{ props.item.NameGorod }}</td>
      </template>
    </v-data-table>
  </v-flex>
  `,
  data: () => ({
      headers: [
        {
          text: '№',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Имя', value: 'NameReferee', sortable: false },
        { text: 'Город', value: 'NameGorod', sortable: false },
      ],
      sudii: [], cities: [],
    }),
    created () {
      this.initializeTableSudia()
      this.initializeGorodSudia()
    },
    methods: {
      initializeTableSudia() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTableSudia', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.sudii.push(data.meth[i]);
            }
          }
        }
        xhr.send()
      },
      initializeGorodSudia() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGorodSudia', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.cities.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
    }
})

Vue.component('table-city-start', {
  template: `
  <v-flex class=" mt-5">
    <v-toolbar flat color="white">
      <v-toolbar-title>Города:</v-toolbar-title>
    </v-toolbar>
    <v-data-table style="width:230px" dark  :headers="headers" :items="goroda" hide-actions class="mt-2">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.NameGorod }}</td>
      </template>
    </v-data-table>
  </v-flex>
  `,
  data: () => ({
      headers: [
        {
          text: '№',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Город', value: 'NameGorod', sortable: false },
      ],
      goroda: [],
    }),
  created () {
    this.initializeTableGorod()
  },

  methods: {
    initializeTableGorod() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.withCredentials = true;
      xhr.open('GET', '/initializeTableGorod', true)
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange= function(){
        if (this.readyState == 4){
          var json_s = this.responseText
          var data = JSON.parse(json_s)
          for (var i = 0; i < data.meth.length; i++){
            self.goroda.push(data.meth[i]);
          }
        }
      }
      xhr.send()
    },
  }
})

Vue.component('start-page', {
  template: `
  <div style="background: white">
    <v-toolbar dark>
      <v-toolbar-title><v-btn flat @click="$vuetify.goTo('#tables', {duration: 1000})" small>Таблицы</v-btn></v-toolbar-title>
      <v-toolbar-title><v-btn flat @click="$vuetify.goTo('#sprav', {duration: 1000})" small>Справки</v-btn></v-toolbar-title>
      <v-toolbar-title><v-btn flat @click="$vuetify.goTo('#stat', {duration: 1000})" small>Статистика</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="go_to_sign_in()" small><v-icon small>fa-cog</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <v-img src="https://wallup.net/wp-content/uploads/2015/06/golden-state-warriors-nba-basketball-warrior-arena.jpg" height="91vh">
      <v-layout wrap row justify-center align-center style="background:rgba(0,0,0,.2); height: 100%">
        <v-flex class="md4">
          <v-card style="background:rgba(0,0,0,.8); color:white;">
            <v-card-title style="margin: 0 auto">
              <span class="headline" style="text-align: center">Добро пожаловать!<br> на всероссийский чемпионат по баскетболу</span>
            </v-card-title>
            <v-card-actions>
              <div style="margin:0 auto">
                <v-btn color="blue darken-1" flat @click="$vuetify.goTo('#tables', {duration: 1000})"><v-icon small flat>fa-arrow-down</v-icon></v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      </v-img>
    </div>
    <div class='mt-5'>
      <v-container id="tables">
        <h1 style="text-align: center" class="mt-3">Таблицы</h1>
        <v-divider inset class="mt-3"></v-divider>
        <table-matches-start class="mt-4"></table-matches-start>
        <v-layout row align-content-space-between>
          <div style="display: flex; width: 100%">
            <table-teams-start class="pr-5"></table-teams-start>
            <table-referee-start class="pl-5"></table-referee-start>
          </div>
          <v-spacer></v-spacer>
          <div style="display: flex">
            <table-city-start></table-city-start>
          </div>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container  id="sprav">
        <h1 style="text-align: center" class="mt-5">Справки</h1>
        <v-divider inset class="mt-3"></v-divider>

        <v-flex class="mt-5">
          <v-select color="pink" v-model="matches.NameTeam" :items="teams" label="Выберите команду" required ></v-select>
        </v-flex>
        <v-layout justify-end>
            <v-btn @click="$vuetify.goTo('#end-stat', {duration: 1000}), getStatKomanda()" small flat outline class="ml-0">Получить справки обо всех играх команды</v-btn>
        </v-layout>

        <v-flex class="mt-5">
          <v-select color="pink" v-model="matches.NameGorod" :items="citiesStat" label="Выберите город" required ></v-select>
        </v-flex>

        <v-layout justify-end>
            <v-btn @click="$vuetify.goTo('#end-stat', {duration: 1000}), getStatGorod()" small flat outline class="ml-0">Получить справки обо всех играх в городе</v-btn>
        </v-layout>

        <v-flex class="mt-5">
          <v-select color="pink" v-model="matches.NameSud" :items="sudii" label="Выберите Судью" required ></v-select>
        </v-flex>

        <v-layout justify-end>
          <v-btn @click="$vuetify.goTo('#end-stat', {duration: 1000}), getStatSud()" small flat outline class="ml-0">Полученить справки обо всех играх судьи</v-btn>
        </v-layout>

        <v-flex class="mt-5">
          <v-select v-model="matches.NameDate" color="pink" :items="date" label="Выберите дату" required ></v-select>
        </v-flex>

        <v-layout justify-end>
          <v-btn @click="$vuetify.goTo('#end-stat', {duration: 1000}), getStatDate()" small flat outline class="ml-0">Полученить справки обо всех играх заданной даты</v-btn>
        </v-layout>

        <div id="end-stat">
          <v-toolbar flat color="white">
            <v-toolbar-title>Поиск матчей:</v-toolbar-title>
          </v-toolbar>
          <v-data-table dark :headers="headers" :items="matches" hide-actions class="elevation-1 mt-2" >
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
            </template>
          </v-data-table>
        </div>

        </v-layout>
      </v-container>
    </div>

    <div>
      <v-container  id="stat">
        <h1 style="text-align: center" class="mt-5">Статистика</h1>
        <v-divider inset class="mt-3"></v-divider>
        <v-layout>
          <template>
            <v-card class="mt-5 mx-auto text-xs-center"  dark width="550px">
              <v-card-text>
                <v-sheet color="rgba(0, 0, 0, .12)">
                  <v-sparkline
                    :labels="StatHozlabels"
                    :value="StatHozValues"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="20"
                    stroke-linecap="round"
                  >
                  </v-sparkline>
                </v-sheet>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-text>
                <div class="">статистика побед команд хозяинов</div>
              </v-card-text>
            </v-card>
          </template>

          <template>
            <v-card class="mt-5 mx-auto text-xs-center"  dark width="550px">
              <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :labels="StatGoslabels"
                      :value="StatGosValues"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="20"
                      stroke-linecap="round"
                    >
                    </v-sparkline>
                  </v-sheet>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-text>
                <div class="">статистика побед команд гостей</div>
              </v-card-text>
            </v-card>
          </template>
        </v-layout>
      </v-container>
    </div>

    <template>
    <v-footer style="margin-top: 100px;width:100%; height:100%" dark  >
      <v-card style="margin: 0 auto; background: #212121" flat tile class="white--text text-xs-center" >

        <v-card-text class="white--text mt-2">
          Чемпионат по баскетболу.<br>Курсовая работа группы ИПБ-16 по предмету - База Данных.
        </v-card-text>

        <v-card-text class="mb-0 pb-0 pt-0">
          <p >Ссылка на Githab:<v-btn href="https://github.com/kamych1916/ZadorinaDB" class="mx-3 white--text" icon ><v-icon size="14px">fa-code-branch</v-icon></v-btn></p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2019 — Рахимов Камол & Илья Матаруев
        </v-card-text>
      </v-card>
    </v-footer>
  </template>
  </div>
  `,
    data: () => ({
      StatHozlabels: [],
      StatGoslabels: [],
      StatHozValues: [],
      StatGosValues: [],
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
      teams: [],
      citiesStat: [],
      sudii: [],
      date: [],
    }),
    created () {
      this.initializeGorod()
      this.initializeTeams()
      this.initializeSudii()
      this.initializeDate()

      this.showStatTeamHoz()
      this.showStatTeamGos()

    },
    methods: {
      //СТАТИСТИКА
      showStatTeamHoz(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTeamsHozStatDate', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.StatHozlabels.push(data.meth[i]);
            }
            for (var i = 0; i < data.meth1.length; i++){
              self.StatHozValues.push(data.meth1[i])
            }
          }
        }
        xhr.send()
      },
      showStatTeamGos(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeTeamsGosStatDate', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.StatGoslabels.push(data.meth[i]);
            }
            for (var i = 0; i < data.meth1.length; i++){
              self.StatGosValues.push(data.meth1[i])
            }
          }
        }
        xhr.send()
      },
      //СТАТИСТИКА

      //СПРАВКИ
      getStatKomanda(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        data = {
          m_nameTeame: this.matches.NameTeam,
        }
        console.log(this.matches)
        data_s = JSON.stringify(data)
        xhr.open('POST', '/initializeTableMatchInfoKomanda', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data1 = JSON.parse(json_s)
            if (data1.code == '1'){
              alert('У данной команды нет/не было матчей')
            }
            else{
              for (var i = 0; i < data1.meth.length; i++){
                self.matches.push(data1.meth[i]);
              }
            }
          }
        }
        xhr.send(data_s)
      },
      getStatGorod(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        data = {
          m_nameGorod: this.matches.NameGorod,
        }
        console.log(this.matches.NameGorod)
        data_s = JSON.stringify(data)
        xhr.open('POST', '/initializeTableMatchInfoGorod', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data1 = JSON.parse(json_s)
            if (data1.code == '1'){
              alert('У данного города нет/не было матчей')
            }
            else{
              for (var i = 0; i < data1.meth.length; i++){
                self.matches.push(data1.meth[i]);
              }
            }
          }
        }
        xhr.send(data_s)
      },
      getStatSud(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        data = {
          m_nameSud: this.matches.NameSud,
        }
        console.log(this.matches.NameSud)
        data_s = JSON.stringify(data)
        xhr.open('POST', '/initializeTableMatchInfoSud', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data1 = JSON.parse(json_s)
            if (data1.code == '1'){
              alert('У данного судьи нет/не было матчей')
            }
            else{
              for (var i = 0; i < data1.meth.length; i++){
                self.matches.push(data1.meth[i]);
              }
            }
          }
        }
        xhr.send(data_s)
      },
      getStatDate(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        data = {
          m_nameDate: this.matches.NameDate,
        }
        console.log(this.matches.NameDate)
        data_s = JSON.stringify(data)
        xhr.open('POST', '/initializeTableMatchInfoDate', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data1 = JSON.parse(json_s)
            if (data1.code == '1'){
              alert('В данную дату нет/не было матчей')
            }
            else{
              for (var i = 0; i < data1.meth.length; i++){
                self.matches.push(data1.meth[i]);
              }
            }
          }
        }
        xhr.send(data_s)
      },
      //СПРАВКИ

      //ОТОБРАЖЕНИЕ ТАБЛИЦ
      initializeTeams() {
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeHozMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var i = 0; i < data.meth.length; i++){
              self.teams.push(data.meth[i]);
            }
          }
        }
        xhr.send()
      },
      initializeGorod(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeGorodMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.citiesStat.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeSudii(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeSudMatch', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.sudii.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      initializeDate(){
        var xhr = new XMLHttpRequest();
        var self = this;
        xhr.withCredentials = true;
        xhr.open('GET', '/initializeDate', true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange= function(){
          if (this.readyState == 4){
            var json_s = this.responseText
            var data = JSON.parse(json_s)
            for (var g = 0; g < data.meth.length; g++){
              self.date.push(data.meth[g])
            }
          }
        }
        xhr.send()
      },
      //ОТОБРАЖЕНИЕ ТАБЛИЦ

      //ПЕРЕХОД НА СТРАНИЦУ АВТОРИЗАЦИИ
      go_to_sign_in(){
        self.router.push('/sign_in')
      }

    }
})

const SignIn = { template: '<sign-in></sign-in>' }
const Options = { template: '<admin-panel></admin-panel>' }
const StartPage = { template: '<start-page></start-page>' }

const routes = [
  { path: '/sign_in', component: SignIn },
  { path: '/admin_panel', component: Options },
  { path: '/', component: StartPage },
]

var router = new VueRouter({
  // mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  data: () => ({})
})
