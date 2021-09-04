<template>
  <v-container fluid >
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
      <failDialogs ref="failDialogs"></failDialogs>


      <v-card>
        <v-card-title >
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
                <v-text-field
                    v-model="editedItem.pid"
                    label="班级ID"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="16"
                  sm="10"
                  md="8"
              >
                <v-text-field
                    v-model="editedItem.name"
                    label="班级名"
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

    <v-data-iterator
        :item-key="cid"
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        no-data-text="未查询到数据"
        hide-default-footer

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
            添加班级
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card  class="card"    @click="goClass(item.pid)" >
              <v-card-title class="subheading font-weight-bold title">
                <span>{{ item.name }}</span>

                <v-icon

                    small
                    class="mr-2 btn"
                    @click.stop="editItem(item)"
                    color="green"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    class="btn"
                    small
                    @click.stop="deleteItem(item)"
                    color="red"
                >
                  mdi-delete
                </v-icon>
              </v-card-title>

              <v-divider></v-divider>

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


          <v-spacer></v-spacer>

          <span
              class="mr-4
            grey--text"
          >
            第 {{ page }} 到 {{ numberOfPages }}
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
  addClassListFromApi,
  deleteClassListFromApi,
  getClassFromApi,
  updateClassListFromApi
} from "../../network/classApi";
import {ifthen} from "../../network/FN";

export default {
  data () {
    return {
      search: '',
      filter: {},
      addItem:{},
      page: 1,
      itemsPerPage: 12,
      sortBy: 'name',
      editedIndex: -1,
      dialog: false,
      dialogDelete:false,
      editedItem: {
        name: null,
        pid: null,
      },
      defaultItem: {
        name: null,
        pid: null,
      },
      keys: [
        'Name',
        'Pid',

      ],
      items: [
        {
        }
      ],
    }
  },
  props:{
    ClassName:{
      type:Array,

    }
  },
  created() {
    getClassFromApi(this.ClassName.cid)
        .then(res=>{
          if(ifthen(res)) {

            this.items = []
            for (let i = 0; i < res.data.list.length; i++) {
              this.addItem['name'] = res.data.list[i].name
              this.addItem['pid'] = res.data.list[i].pid
              this.items.push(this.addItem);
              this.addItem = []
            }
          }
        })
        .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取班级信息失败请重新尝试或检查网络连接'})
  },
  computed: {
    cid(){
      return this.ClassName.cid+''
    },
    formTitle () {
      return this.editedIndex === -1 ? '新增学生信息' : '编辑学生信息'
    },
    numberOfPages () {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  methods: {
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
        if(this.editedItem.name&&this.editedItem.pid){

          updateClassListFromApi(this.editedItem,this.ClassName.cid)
              .then((res)=>{
                if(ifthen(res)) {
                  this.$set(this.items,this.editedIndex,this.editedItem)
                  this.close()
                }
              })
              .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'})


        }else{
          alert('请输入完整')
        }
      } else {
        if(this.editedItem.pid&&this.editedItem.name){

          addClassListFromApi(this.editedItem,this.ClassName.cid)
              .then((res)=>{
                if(ifthen(res)) {
                  this.items.push(this.editedItem)
                  this.close()
                }
              })
              .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='添加失败请重新尝试或检查网络连接'})


        }else{
          alert('请输入完整')
        }
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
        deleteClassListFromApi(this.editedItem)
          .then((res)=>{
            if(ifthen(res)) {
              this.items.splice(this.editedIndex, 1)
              this.closeDelete()
            }
              })
          .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='删除失败请重新尝试或检查网络连接'})



    },
    goClass(pid){
      this.$router.push('/ClassCr/'+pid)
    },
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },

  },
  components:{
    failDialogs
  },
  watch:{
    ClassName(val){
      getClassFromApi(this.ClassName.cid)
          .then(res=>{
            if(ifthen(res)) {
              this.items = []
              for (let i = 0; i < res.data.list.length; i++) {
                this.addItem['name'] = res.data.list[i].name
                this.addItem['pid'] = res.data.list[i].pid
                this.items.push(this.addItem);
                this.addItem = []
              }
            }
          })
          .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取班级信息失败请重新尝试或检查网络连接'})
    },

    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  }
}
</script>
<style scoped>
.title{
  min-height: 100px;
  min-width: 285px;

}
 .card:hover{
  box-shadow: #c0ccda 7px 7px;
}
 .btn:hover{
   box-shadow: #c0ccda 2px 2px;

 }
</style>