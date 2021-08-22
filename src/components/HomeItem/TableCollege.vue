<template>

  <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :expanded.sync="expanded"
      item-key="cid"
      show-expand
      single-expand
      no-data-text="未查询到数据"
  >

    <template v-slot:top>
      <v-toolbar
          flat
      >
        <failDialogs ref="failDialogs"></failDialogs>

        <v-toolbar-title>学院管理</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              添加学院
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="15"
                      sm="9"
                      md="8"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        label="学院名字"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        :disabled="isDisabled"
                        v-model="editedItem.cid"
                        label="学院ID"
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
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定要删除这个学院吗？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
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
    </template>

    <template v-slot:expanded-item="{ headers, item }">

      <td :colspan="headers.length">
        <TableClass :ClassName=item ></TableClass>

      </td>
    </template>


  </v-data-table>
</template>
<script>
import TableClass from "./TableClass";
import failDialogs from "./failDialogs";
import {
  addCollegeFromApi,
  deleteCollegeFromApi,
  getcollegeFromApi,
  updateCollegeFromApi
} from "../../network/collegeApi";
import {ifthen} from "../../network/FN";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    expanded: [],
    isDisabled:true,
    headers: [
      { text: '学院名称', align: 'start', value: 'name', },
      { text: '学院ID', value: 'cid' },
      { text: '操作', value: 'actions', sortable: false },
      { text: '展开', value: 'data-table-expand',sortable: false  },

    ],
    addItem:{},
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      cid: null,

    },
    defaultItem: {
      name: '',
      cid: null,

    },


  }),

  computed: {

    formTitle () {
      this.editedIndex === -1 ? this.isDisabled=false : this.isDisabled=true
      return this.editedIndex === -1 ? '添加学院' : '修改学院信息'
    },
  },
components:{
  TableClass,
  failDialogs
},
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    getcollegeFromApi()
      .then(res=>{
        if(ifthen(res)) {

          this.desserts = []
          for (let i = 0; i < res.data.list.length; i++) {
            this.addItem['name'] = res.data.list[i].name
            this.addItem['cid'] = res.data.list[i].cid
            this.desserts.push(this.addItem);
            this.addItem = []
          }
        }
      })
        .catch(()=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='获取学院信息失败请重新尝试或检查网络连接'})

  },

  methods: {


    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

    },

    deleteItem (item) {

          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true

    },

    deleteItemConfirm () {
      console.log(this.editedItem);
      deleteCollegeFromApi(this.editedItem)
        .then((res)=>{
          if(ifthen(res)) {

            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
          }
        })
          .catch((err)=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='删除失败请重新尝试或检查网络连接'})

    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {

      if (this.editedIndex > -1) {
        console.log('修改');
        updateCollegeFromApi(this.editedItem.cid,this.editedItem.name)
            .then((res)=>{
              if(ifthen(res)) {

                Object.assign(this.desserts[this.editedIndex], this.editedItem)
                this.close()
              }

            })
            .catch((err)=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'})

      } else {
        console.log('新增');
        addCollegeFromApi(this.editedItem.cid,this.editedItem.name)
            .then((res)=>{
              if(ifthen(res)){
              this.desserts.push(this.editedItem)
                this.close()
              }
            })
            .catch((err)=>{this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='添加失败请重新尝试或检查网络连接';})

      }

    },
  },
}
</script>

<style scoped>

</style>