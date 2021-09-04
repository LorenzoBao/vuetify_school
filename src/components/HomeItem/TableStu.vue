<template>
  <v-container fluid>

    <v-dialog
        v-model="dialog"
        max-width="500px"
    >


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
                <v-text-field
                    v-model="editedItem.sid"
                    label="学号"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="editedItem.name"
                    label="姓名"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
<!--                <template>-->
<!--                  <v-file-input-->
<!--                      show-size-->
<!--                      accept="image/*"-->
<!--                      label="照片"-->
<!--                      v-model="editedItem.image"-->
<!--                  ></v-file-input>-->
<!--                </template>-->
              </v-col>
              <v-textarea
                  v-model="editedItem.remarks"
                  label="请添加描述"
              ></v-textarea>
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
              添加学生
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
              :key="item.sid"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card>

              <v-card-title class="subheading font-weight-bold">
<!--                <img :src="item.image" width="150px" height="200px" >-->



              </v-card-title>

              <v-divider></v-divider>
              学生姓名:{{ item.name }}

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
          <span class="grey--text">Items per page</span>
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
            Page {{ page }} of {{ numberOfPages }}
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
import {addStuListFromApi, deleteStuListFromApi, getStuFromApi, updateStuListFromApi} from "../../network/stuApi";
import {ifthen} from "../../network/FN";

export default {
  name:'TableStu',
  data () {
    return {
      addItem:{},
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      editedIndex: -1,
      dialog: false,
      dialogDelete:false,
      editedItem: {
        name: null,
        sid: null,
        remarks: null,
       // image:null
      },
      defaultItem: {
        name: null,
        sid: null,
        remarks: null,
      //  image:null

      },
      keys: [
        'Name',
        'Sid',
        'Remarks',

      ],
      items: [
        {

        }
      ],
    }
  },
  props:{
    pid:{
      type:String
    }
  },
  created() {
    getStuFromApi(this.pid)
        .then(res=>{
          if(ifthen(res)){

          this.items=[]
          for(let i=0;i<res.data.list.length;i++) {
            this.addItem['name']= res.data.list[i].name
            this.addItem['sid']= res.data.list[i].sid
            this.addItem['remarks']= res.data.list[i].remarks

            this.items.push(this.addItem);
            this.addItem=[]
          }
          }
        })
        .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取学生信息失败请重新尝试或检查网络连接'})
  },
  computed: {
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
        if(this.editedItem.name&&this.editedItem.sid&&this.editedItem.remarks){

          updateStuListFromApi(this.editedItem,this.pid)
            .then((res)=>{
              if(ifthen(res)) {
                Object.assign(this.items[this.editedIndex], this.editedItem)
                this.close()
              }
            })
              .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'})

        }else{
          alert('请输入完整')
        }
      } else {

        if(this.editedItem.sid&&this.editedItem.name&&this.editedItem.remarks){
         //this.imageToBase64(this.editedItem.image)
          addStuListFromApi(this.editedItem,this.pid)
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
      this.editedItem=item
    },

    deleteItemConfirm () {
      deleteStuListFromApi(this.editedItem)
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

    //  imageToBase64 (file) {
    //   let reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onload = () => {
    //     this.editedItem.image=reader.result
    //   }
    //   reader.onerror = function (error) {
    //   }
    // }

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