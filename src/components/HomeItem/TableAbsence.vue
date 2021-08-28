<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :loading="isLoading"
      loading-text="加载数据中"
      multi-sort
      no-data-text="未查询到数据"

  >
    <!--    show-group-by-->
    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title>缺勤管理</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-col cols="3" id="t">
          <timePicker ref="times"></timePicker>
        </v-col>

        <v-col  cols="2.7">
          <v-autocomplete
              v-model="collegeValue"
              :items="collegeItem"
              :loading="isLoading"
              dense
              filled
              label="学院"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2.7">
          <v-autocomplete
              v-model="ClassValue"
              :items='ClassItem'
              :loading="isLoading"
              dense
              filled
              label="班级"
              no-data-text="请选择学院"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2.8">
          <v-autocomplete
              v-model="StuValue"
              :items="StuItem"
              :loading="isLoading"
              dense
              filled
              label="学生"
              no-data-text="请选择班级"
          ></v-autocomplete>
        </v-col>
        <template >
          <v-btn
              color="primary"
              @click="exportTable()"
          >导出表格</v-btn>
        </template>
        <failDialogs ref="failDialogs"></failDialogs>


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
                @click="nowTime"
            >
              添加缺勤学生
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
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.time"
                        label="时间"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.number"
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
                    <v-text-field
                        v-model="editedItem.course"
                        label="科目"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-radio-group v-model="editedItem.LorT">
                      <v-radio value="迟到" key="1" label="迟到"></v-radio>
                      <v-radio value="旷课" key="2" label="旷课"></v-radio>
                      <v-radio value="早退" key="3" label="早退"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-textarea
                      v-model="editedItem.describe"
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
  </v-data-table>
</template>

<script>
import { ifthen, retimeData, timeData} from "../../network/FN";
import timePicker from "../timeData/timePicker";

import failDialogs from "./failDialogs";
import {getClassFromApi, getClassTableFromApi} from "../../network/classApi";
import {
  addStuFromApi,
  deleteStuFromApi,
  getStuFromApi,
  getStuTableFromApi,
  updateStuFromApi,
  exportTableFromApi
} from "../../network/stuApi";
import {getcollegeFromApi} from "../../network/collegeApi";


export default {

  name: "Table",

  data: () => ({
    collegeItem:['加载中'],
    ClassItem:['请选择学院'],
    StuItem:['请选择班级'],
    ClassIdName:{},
    StuIdName:{},
    collegeItemName:{},
    schoolYearValue:null,
    collegeValue: null,
    ClassValue:null,
    StuValue:null,
    isLoading:false,
    dialog: false,
    dialogDelete: false,
    deleteAPI:null,
    editAPI:null,
    aItem:null,
    headers: [
      { text: '时间',align: 'start', value: 'time',width:250},
      { text: '学号', value: 'number' },
      { text: '姓名', value: 'name' },
      { text: '科目', value: 'course' },
      { text: '事件', value: 'LorT',},
      { text: '描述', value: 'describe', sortable: false },
      { text: '操作', value: 'actions', sortable: false },
    ],
    desserts: [      ],

    editedIndex: -1,
    editedItem: {
      time: null,
      number: null,
      name: null,
      course: null,
      LorT: null,
      describe:null,
      oldTime:null
    },
    addItem: {
      time: null,
      number: null,
      name: null,
      course: null,
      LorT: null,
      describe:null,
      createDate:null,
      oldTime:null

    },
    defaultItem: {
      time: null,
      number: null,
      name: null,
      course: null,
      LorT: null,
      describe:null,
      oldTime:null

    },
  }),

  computed: {
    formTitle () {
      this.editedIndex === -1 ? this.editedItem.time=this.nowTime:this.editedItem.time=this.desserts[this.editedIndex].time
      return this.editedIndex === -1 ? '新增学生信息' : '编辑学生信息'
    },


  },

  watch: {

    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },


    collegeValue(val){
      console.log(val);
      this.isLoading=true
      // this.ClassItem=null
      val=this.collegeItemName[val]
      getClassFromApi(val)
          .then(res=>{
            if(ifthen(res)) {
              this.StuItem = []
              this.ClassItem = []
              for (let i = 0; i < res.data.list.length; i++) {
                this.$set(this.ClassItem, i, res.data.list[i].name)
                this.ClassIdName[res.data.list[i].name] = res.data.list[i].pid

              }
              this.isLoading = false
            }
          })
          .catch(()=>{this.ClassItem=['未查询到数据'];
          this.isLoading=false;
            this.$refs.failDialogs.dialog=true;
            this.$refs.failDialogs.text='获取班级信息失败请重新尝试或检查网络连接'})

    },
    ClassValue(val){
      let pid=this.ClassIdName[val]
      // this.StuIdName=''
      // this.StuItem=''
      this.isLoading=true

      getStuFromApi(this.ClassIdName[val])
          .then(res=>{
            if(ifthen(res)) {

              this.StuItem = []
              for (let i = 0; i < res.data.list.length; i++) {
                if (res.data.list[i].pid === this.ClassIdName[val]) {
                  this.$set(this.StuItem, i, res.data.list[i].name)
                  this.StuIdName[res.data.list[i].name] = res.data.list[i].sid
                }

              }
              this.isLoading = false
            }
          })
          .catch(()=>{this.StuItem=['未查询到数据'];
          this.isLoading=false;
          this.$refs.failDialogs.dialog=true;
          this.$refs.failDialogs.text='获取学生信息失败请重新尝试或检查网络连接'
          })

      getClassTableFromApi(pid,this.$refs.times.dates[0],this.$refs.times.dates[1])
          .then(res=>{
            if(ifthen(res)) {

              this.desserts = []
              for (let i = 0; i < res.data.list.length; i++) {
                for (let j = 0; j < res.data.list[i].detailsList.length; j++) {
                  this.addItem['oldTime'] = res.data.list[i].detailsList[j].createDate
                  this.addItem['number'] = res.data.list[i].detailsList[j].sid
                  this.addItem['course'] = res.data.list[i].detailsList[j].course
                  this.addItem['name'] = res.data.list[i].student.name
                  this.addItem['LorT'] = res.data.list[i].detailsList[j].reason
                  this.addItem['describe'] = res.data.list[i].detailsList[j].remarks
                  this.addItem['time'] = timeData(this.addItem['oldTime'])
                  this.desserts.push(this.addItem);
                  this.addItem = {}
                }
              }

              // this.$set(this.desserts, i, res.data.list[i].name)
              // this.ClassIdName[res.data.list[i].name]=res.data.list[i].pid

              this.isLoading = false
            }
          })
          .catch(()=>{
            this.$refs.failDialogs.dialog=true
            this.isLoading=false

            this.$refs.failDialogs.text='获取班级缺勤信息失败请重新尝试或检查网络连接'
          })
    },


    StuValue(val){
      console.log(val);
      let sid=this.StuIdName[val]
      this.isLoading=true
      this.desserts=[]
      this.addItem=[]
      getStuTableFromApi(sid,this.$refs.times.dates[0],this.$refs.times.dates[1])
          .then(res=>{
            if(ifthen(res)) {

              for (let i = 0; i < res.data.list.length; i++) {
                this.addItem['oldTime'] = res.data.list[i].createDate
                this.addItem['number'] = res.data.list[i].sid
                this.addItem['course'] = res.data.list[i].course
                this.addItem['name'] = this.StuValue
                this.addItem['LorT'] = res.data.list[i].reason
                this.addItem['describe'] = res.data.list[i].remarks
                this.addItem['time'] = timeData(this.addItem['oldTime'])

                this.desserts.push(this.addItem);
                this.addItem = []
              }
              this.isLoading = false
            }
          })
          .catch(()=>{this.isLoading=false;
          this.$refs.failDialogs.dialog=true;
          this.$refs.failDialogs.text='获取学生缺勤信息失败请重新尝试或检查网络连接'})

    }


  },

  created() {
    getcollegeFromApi()
        .then(res=>{
          if(ifthen(res)) {

            for (let i = 0; i < res.data.list.length; i++) {
              this.$set(this.collegeItem, i, res.data.list[i].name)
              this.collegeItemName[res.data.list[i].name] = res.data.list[i].cid
            }
          }
        })
        .catch(()=>{this.$refs.failDialogs.dialog=true;
        this.$refs.failDialogs.text='获取学院信息失败请重新尝试或检查网络连接'})

  },

  methods: {
    nowTime(){
      const myDate = new Date();
      this.editedItem.time=myDate.toLocaleDateString()+' '+myDate.getHours()+':'+myDate.getMinutes()
    },
    exportTable(){
      let val
      let ID
      this.StuValue?val='student':val='class'
      this.StuValue?ID=this.StuIdName[this.StuValue]:ID=this.ClassIdName[this.ClassValue]
      exportTableFromApi(val,this.$refs.times.dates[0],this.$refs.times.dates[1],ID)
      .then((res) => {

          console.log('res', res);
          const blob = res;
          const reader = new FileReader();
          reader.responseType = 'blob';
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            const a = document.createElement('a');
            const name = res.headers;
            console.log(name);
            a.download = this.$refs.times.dates[0] + '到' + this.$refs.times.dates[1] + this.collegeValue + '学院' + this.ClassValue + this.StuValue + `.xlsx`;
            // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
            a.href = e.target.result;
            document.body.appendChild(a);
            console.log(a.href);
            a.click();
            document.body.removeChild(a);
          };

      })
      .catch(()=>{this.$refs.failDialogs.dialog=true;
      this.$refs.failDialogs.text='获取文件失败请重新尝试或检查网络连接'})

    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.editAPI=item
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      //this.deleteAPI=item

    },

    deleteItemConfirm () {
      deleteStuFromApi(this.editedItem)
          .then((res)=>{
            if(ifthen(res)) {
              this.desserts.splice(this.editedIndex, 1)
              this.closeDelete()
            }
          })
          .catch(()=>{this.$refs.failDialogs.dialog=true;
          this.$refs.failDialogs.text='删除失败请重新尝试或检查网络连接'})

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
        if(this.editedItem.course&&this.editedItem.name&&this.editedItem.time&&this.editedItem.number){

          updateStuFromApi(this.editedItem)
              .then((res)=>{
                if(ifthen(res)) {

                  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                }
               })
              .catch(()=>{this.$refs.failDialogs.dialog=true;
              this.$refs.failDialogs.text='修改失败请重新尝试或检查网络连接'})
        }else{
          this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='请输入完整'
        }
      } else {
        if(this.editedItem.course&&this.editedItem.name&&this.editedItem.time&&this.editedItem.number){
          let time=retimeData(this.editedItem.time)

          addStuFromApi(this.editedItem,time)
              .then((res)=>{
                if(ifthen(res)) {

                  this.desserts.push(this.editedItem);
                  this.close()
                }
              })
              .catch(()=>{this.$refs.failDialogs.dialog=true;
              this.$refs.failDialogs.text='添加失败请重新尝试或检查网络连接'})
        }else{
          this.$refs.failDialogs.dialog=true;this.$refs.failDialogs.text='请输入完整'
        }
      }


    },





  },
  components:{
    timePicker,
    failDialogs
  }
}
</script>

<style scoped>
.col{
  height: 80px;
}
#t{
  height: 50px;
}
</style>