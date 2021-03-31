<script src="../js/search.js"></script>
<template>
  <div class="searchbar">
    <div class="box">
      <div class="main" id="main">
        <div class="itemRow" v-for="(item,index) in list" :key="index" v-show="item.itemRowShow">
          <div class="showFrame clearfix">
            <span class="fl nameFrame">{{item.name}}</span>
            <dl class="fl clearfix">
              <dd class="fl" v-for="(items,index) in item.itemList" :key="index" :class="{active:items.nameShow}" @click="itemClick(item.index,index)">{{items.name}}</dd>
            </dl>
            <div class="btn fr" :style="{background: item.itemState? '#0086f6' : '#eef1f6' }" @click="btnClick(item.index)">
              <span>{{item.setName}}</span>
              <span>+</span>
            </div>
          </div>
          <div class="hideFrame clearfix" v-show="item.itemState">
            <div class="fl hideItem" v-for="(int,index) in item.selectList" :key="index">{{int}}</div>
          </div>
          <div class="btnFrame" v-show="item.itemState">
            <span @click="cancelClick(item.index)">Clear</span>
            <span @click="sureClick(item.index)">OK</span>
          </div>
        </div>
      </div>
      <div class="selectFrame clearfix">
        <span class="fl nameFrame" style="padding-top: 5px;">Selected</span>
        <ul class="fl selectList" id="selectList">
          <li v-for="(sureItem,index) in sureList" :key="index" @click="minItemClick(index)">
            <div class="sureName">{{sureItem.name}}</div>
            <i>-</i>
            <span v-for="(minItem,index) in sureItem.selectList" :key="index">
              {{minItem}}
            </span>
            <i>×</i>
          </li>
        </ul>
        <span class="fr reset" @click="resetClick">Reset</span>
      </div>
    </div>
  </div>
</template>,

<script>
export default {
  name: "searchbar",
  data() {
    return {
      list: [
        {
          index: 0,
          name: "Destination",
          itemList: [
            {
              name: "Tian Tan Buddha",
              nameShow: false,
            },
            {
              name: "Lan Kwai Fong",
              nameShow: false,
            },
            {
              name: "Man Mo Temple",
              nameShow: false,
            },
            {
              name: "Disneyland",
              nameShow: false,
            },
            {
              name: "Victoria Peak",
              nameShow: false,
            },
          ],
          setName: "Multiple-Choice",
          itemState: false,
          selectList: [],
          itemRowShow: true,
        },
        {
          index: 1,
          name: "Number of days",
          itemList: [
            {
              name: "4 days",
              nameShow: false,
            },
            {
              name: "7 days",
              nameShow: false,
            },
            {
              name: "10 days",
              nameShow: false,
            },
          ],
          setName: "Multiple-Choice",
          itemState: false,
          selectList: [],
          itemRowShow: true,
        },
      ],
      sureList: [],
      itemIndex: null,
      selectShow: true,
    };
  },
  mounted: function () {},
  methods: {
    itemClick(int, index) {
      this.list[int].itemList[index].nameShow = true;
      if (this.list[int].itemState) {
        //多选
        if (
          this.list[int].selectList.indexOf(
            this.list[int].itemList[index].name
          ) <= -1
        ) {
          this.list[int].selectList.push(this.list[int].itemList[index].name);
        }
      } else {
        this.list[int].selectList = [];
        this.list[int].selectList.push(this.list[int].itemList[index].name);
        this.sureList.push(this.list[int]);
        this.list[int].itemList[index].nameShow = true;
        setTimeout(() => {
          this.list[int].itemRowShow = false;
          for (var i in this.list[int].itemList) {
            this.list[int].itemList[i].nameShow = false;
          }
        }, 300);
      }
    },
    resetClick() {
      /* 清除 */
      for (var i in this.list) {
        this.list[i].itemRowShow = true;
        for (var k in this.list[i].itemList) {
          this.list[i].itemList[k].nameShow = false;
        }
        this.list[i].selectList = [];
        this.list[i].itemState = false;
      }
      this.sureList = [];
    },
    minItemClick(minIndex) {
      //已选择每项的x键
      for (var i in this.list) {
        if (this.list[i].index == this.sureList[minIndex].index) {
          this.list[i].itemRowShow = true;
          this.list[i].itemState = false;
          for (var k in this.list[i].itemList) {
            this.list[i].itemList[k].nameShow = false;
          }
        }
      }
      this.sureList.splice(minIndex, 1);
    },
    btnClick(index) {
      //多选按钮
      this.list[index].itemState = !this.list[index].itemState;
      if (this.list[index].itemState) {
        this.list[index].selectList = [];
      }
    },
    sureClick(index) {
      //多选下的确定按钮
      this.sureList.push(this.list[index]);
      setTimeout(() => {
        this.list[index].itemRowShow = false;
      }, 200);
    },
    cancelClick(index) {
      //多选下的取消按钮
      this.list[index].selectList = [];
      for (var i in this.list[index].itemList) {
        this.list[index].itemList[i].nameShow = false;
      }
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

i {
  font-style: normal;
  font-size: 14px;
  cursor: pointer;
}

.clearfix:after {
  display: block;
  content: "";
  clear: both;
}

.fl {
  float: left;
  cursor:pointer;
}

.fr {
  float: right;
  cursor:pointer;
}

li {
  list-style: none;
}

.box {
  /* width: 680px; */
  width: 70%;
  padding: 5px 15px;
  margin: 10px auto;
  font-size: 14px;
  border: 5px solid #c0e5f5;
  border-radius: 5px;
}

.main .itemRow {
  padding: 5px 0px;
}

.hideFrame {
  margin: 0px 65px 0px 60px;
  background: #5ea4de17;
}

.hideItem {
  padding: 5px;
  color: #2098fdb5;
}

.nameFrame {
  width: 150px;
  margin-right: 10px;
  font-weight:bold;
}

.btn {
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 3px;
}

.btn span:first-child {
  vertical-align: middle;
}

.main dl dd {
  margin: 0px 5px;
  border: 1px solid #fff;
  padding: 0px 5px;
  border-radius: 5px;
}

.main dl .active {
  border: 1px solid #0086f6;
  color: #0086f6;
}

.selectFrame ul li {
  margin: 3px 5px;
  float: left;
  font-size: 12px;
  background: #0476d3;
  color: #fff;
  padding: 2px 5px;
  border-radius: 5px;
}
.selectFrame ul li span {
  font-size: 10px;
}
.selectFrame .sureName {
  display: inline-block;
}

.selectFrame .sureBtn {
  color: #0086f6;
  font-size: 14px !important;
}

.btnFrame {
  text-align: right;
  padding: 5px 0px;
}

.btnFrame span {
  padding: 2px 5px;
  border: 1px solid #cdcdcd;
  color: #cdcdcd;
  border-radius: 3px;
  font-size: 10px;
  cursor:pointer;
}

.btnFrame span:last-child {
  border: 1px solid #257bf6;
  color: #257bf6;
}

.reset {
  font-size: 12px;
  color: #257bf6;
  cursor: pointer;
  margin-top: 5px;
}
</style>
