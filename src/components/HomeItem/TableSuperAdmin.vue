<template>
  <v-container fluid>
    <v-dialog
        v-model="pawDialog"
        max-width="500px"
    >
      <failDialogs ref="failDialogs"></failDialogs>
      <v-card>
        <v-card-text>
          <v-container>

                <v-text-field
                    v-model="pawUserName"
                    label="请输入要重置密码的账号"
                ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="notRePaw()"
          >
            取消
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="rePaw()"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >

      <failDialogs ref="failDialogs"></failDialogs>

      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <template>
                  <v-file-input
                      show-size
                      accept="image/*"
                      label="照片"
                      v-model="editedItem.image"
                  ></v-file-input>
                </template>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.username"
                    label="账号"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.password"
                    label="密码"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.pid"
                    label="班级ID"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.remark"
                    label="描述"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.type"
                    label="权限"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.enable"
                    label="启用"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="close"
          >
            取消
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="save"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">确定要删除这个选项吗</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
          <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <failDialogs  ref="failDialogs"></failDialogs>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
        no-data-text="未查询到数据"

    >

      <template v-slot:header>
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="搜索"
          ></v-text-field>
          <v-btn
              large
              depressed
              color="blue"
              style="margin: 5px"
              @click="editItem()"
          >
            添加管理员
          </v-btn>
          <v-btn
              large
              depressed
              color="blue"
              style="margin: 5px"
              @click="pawDialog=true"
          >
            重置密码
          </v-btn>
          <template v-if="$vuetify.breakpoint.mdAndUp">

            <v-btn-toggle
                v-model="sortDesc"
                mandatory
            >
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.username"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card>

              <v-card-title class="subheading font-weight-bold">
              </v-card-title>
              <img :src="item.image" width="150px" height="200px"   alt="未获取图片">
              <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                  color="green"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  @click="deleteItem(item)"
                  color="red"
              >
                mdi-delete
              </v-icon>
              <v-list dense>

                <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                >

                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }"
                  >
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
            class="mt-2"
            align="center"
            justify="center"
        >
          <span class="grey--text">展示数</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
              class="mr-4
            grey--text"
          >
            从 {{ page }} 到 {{ numberOfPages }}
          </span>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import failDialogs from "./failDialogs";
import {
  addAdminListFromApi, addImage,
  deleteAdminListFromApi,
  getAdminFromApi, getImage, reAdminPaw,
  updateAdminListFromApi
} from "../../network/adminApi";
import {ifthen, timeData} from "../../network/FN";

export default {
  name:'TableStu',
  data () {
    return {
      pawDialog:false,
      pawUserName:'',
      addItem:{},
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'username',
      editedIndex: -1,
      dialog: false,
      dialogDelete:false,
      editedItem: {
        create:null,
        username:null,
        password:null,
        pid:null,
        remark:null,
        type:null,
        enable:null,
        image:null
      },
      defaultItem: {
        create:null,
        username:null,
        password:null,
        pid:null,
        remark:null,
        type:null,
        enable:null,
        image:null
      },

      keys: [
        'username',
        'password',
        'pid',
        'remark',
        'type',
        'enable',
        'create',

      ],
      items: [
        {

        }
      ],
    }
  },

  created() {
    getAdminFromApi()
        .then(res=>{
          if(ifthen(res)) {

            this.items = []
            for (let i = 0; i < res.data.list.length; i++) {
              getImage(res.data.list[i].username)
                  .then(res => {
                      this.addItem['image'] = res.data
                  })

              this.addItem['create'] = res.data.list[i].createTime
              this.addItem['username'] = res.data.list[i].username
              this.addItem['password'] = res.data.list[i].password
              this.addItem['pid'] = res.data.list[i].pid
              this.addItem['remark'] = res.data.list[i].remark
              this.addItem['type'] = res.data.list[i].type
              this.addItem['enable'] = res.data.list[i].enable
              this.addItem['create'] = timeData(this.addItem['create'])
              this.items.push(this.addItem);
              this.addItem = {}
            }
          }
        })
        .catch(()=>{
          this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取信息失败，请重新尝试或检查网络连接'
        })
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新增管理员' : '编辑管理员信息'
    },
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  methods: {
    notRePaw(){
      this.pawDialog=false
      this.pawUserName=''
    },
    rePaw(){
      reAdminPaw(this.pawUserName)
      .then(res=>{
        if(ifthen(res)) {
          this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='重置成功'
          this.pawDialog=false
        }
      })
      .catch(()=>{
        this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='重置失败请重新尝试或检查网络连接'
      })
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      if (this.editedIndex > -1) {
        console.log('修改');

          updateAdminListFromApi(this.editedItem)
              .then((res)=>{
                if(ifthen(res)) {
                  this.$set(this.items,this.editedIndex,this.editedItem)
                  this.close()
                }
              })
              .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'})
      } else {
        console.log('添加');
        this.addItem=this.editedItem

        this.imageToBase64(this.editedItem.image)
        console.log(this.editedItem);
        console.log(this.addItem.image);

        console.log(this.editedItem.image);
        addAdminListFromApi(this.addItem)
              .then((res)=>{
                if(ifthen(res)) {
                  addImage(this.addItem.image, this.addItem.username)
                      .then((res) => {
                          this.items.push(this.editedItem)
                          this.close()

                      })
                      .catch(() => {
                        this.$refs.failDialogs.dialog = true;
                        this.$refs.failDialogs.text = '添加图片失败请重新尝试或检查网络连接'
                      })
                }
              })

              .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='添加失败请重新尝试或检查网络连接'})
      }
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      deleteAdminListFromApi(this.editedItem)
          .then((res)=>{
            if(ifthen(res)) {
              this.items.splice(this.editedIndex, 1)
              this.closeDelete()
            }
          })
          .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='删除失败请重新尝试或检查网络连接'})




    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },

     imageToBase64 (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log('file 转 base64结果：' + reader.result)
        this.editedItem.image=reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  },
  watch:{
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  components:{
    failDialogs
  }

}
</script>

<style scoped>

</style>