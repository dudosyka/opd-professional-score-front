<template>
  <div class="row w-100 row-main" :class="{'justify-content-normal': btns.length == 0, 'justify-content-between': btns.length}">
    <main class="col-8 col-data">
      <h3 class="page-title">{{ table_title }}</h3>
      <table class="table">
        <thead class="thead-dark">
        <tr>
          <th v-if="numeration" scope="col">#</th>
          <th v-for="key in labels" scope="col">{{ key }}</th>
          <th v-if="moveable" scope="col">Порядок</th>
          <th v-if="inlineBtns.length" scope="col">Управление</th>
        </tr>
        </thead>
        <tbody>
        <tr class="profession-row" @click="select(key)" :class="{'active': item.selected}" v-for="(item, key) in pagination">
          <th v-if="numeration" scope="row">{{ realIndex(key) + 1 }}</th>
          <template v-for='oKey in Object.keys(item)'>
            <td v-if="keys.includes(oKey)">
              {{ Object.keys(formatters).includes(oKey) ? formatters[oKey](item[oKey]) : item[oKey] }}
            </td>
          </template>
          <td v-if="moveable">
            <ArrowUpDown @up="moveUp(key)" @down="moveDown(key)" />
          </td>
          <td v-if="inlineBtns.length">
            <SmallButton class="m-1" v-for="btn in inlineBtns" @click="btn.click(realIndex(key))">{{ btn.title }}</SmallButton>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="needPagination" class="d-flex row justify-content-between">
        <button @click="prev" class="btn btn-light w-fit-content"> &lt; </button>
        <button @click="next" class="btn btn-light w-fit-content"> > </button>
      </div>
    </main>
    <aside class="col-3" v-if="btns.length">
      <div class="row mb-3" v-for="btn in btns" >
        <SmallButton @click="btn.click($event, pagination)">{{ btn.title }}</SmallButton>
      </div>
    </aside>
  </div>
</template>

<script>
import SmallButton from "@/components/SmallButton.vue";
import ArrowUpDown from "@/components/ArrowUpDown.vue";

export default {
  name: "PaginationTable",
  components: {ArrowUpDown, SmallButton},
  props: {
    table_title: {
      type: String,
      default: ""
    },
    needPagination: {
      type: Boolean,
      default: true,
    },
    labels: {
      type: Array,
      default: []
    },
    keys: {
      type: Array,
      default: []
    },
    elements: {
      type: Array,
      default: []
    },
    btns: {
      type: Array,
      default: []
    },
    selectFunc: {
      type: Function,
      default: () => {}
    },
    unselectFunc:  {
      type: Function,
      default: () => {}
    },
    itemsOnPage: {
      type: Number,
      default: 5
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    numeration: {
      type: Boolean,
      default: true
    },
    formatters: {
      type: Object,
      default: {}
    },
    moveable: {
      type: Boolean,
      default: false,
    },
    inlineBtns: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curPage: 1,
      data: [],
      minimalSerial: 1,
      maximumSerial: 9999,
    }
  },
  created() {
    this.data = this.elements.map((el, key) => {
      if (!el)
        return {};
      if (el.selected)
        return {
          ...el,
          serial: el.serial ? el.serial : key + 1
        };
      else
        return {
          ...el,
          selected: false,
          serial: el.serial ? el.serial :  key + 1
        }
    })
    console.log(this.data);
  },
  computed: {
    pagination() {
      let items = this.data;
      
      if (this.needPagination)
        items = this.data.slice((this.curPage - 1) * this.itemsOnPage, this.curPage * this.itemsOnPage)

      const res = items.sort((a,b) => a.serial - b.serial)
      if (res.length) {
        this.minimalSerial = res[0].serial;
        this.maximumSerial = res[res.length - 1].serial;
      }
      
      return res;
    }
  },
  methods: {
    initData() {
      this.data = this.elements.map(el => ({
        ...el,
        selected: false,
      }))
    },
    select(key) {
      if (!this.selectable)
        return;

      if (!this.multiselect)
        this.initData();

      const old = this.pagination[key].selected;
      this.pagination[key].selected = !this.pagination[key].selected;

      if (old) {
        this.unselectFunc(this.data.filter(el => el.selected))
      } else {
        this.selectFunc(this.data.filter(el => el.selected));
      }
    },
    next() {
      if (this.curPage + 1 > Math.ceil(this.elements.length / this.itemsOnPage))
        return;
      this.curPage++;
    },
    prev() {
      this.curPage--;
      if (this.curPage < 1)
        this.curPage = 1;
    },
    realIndex(index) {
      return (this.curPage - 1) * this.itemsOnPage + index;
    },
    find(serial) {
      for (const item of this.data)
        if (item.serial == serial)
          return this.data.indexOf(item)
    },
    moveUp(key) {
      const index = this.realIndex(key);
      const target = this.data[index];
      if (target.serial == this.minimalSerial)
        return;
      const newSerial = target.serial - 1;
      const oldItem = this.find(newSerial);
      this.data[oldItem].serial++;
      this.data[index].serial--;
      this.data = this.data.sort((a, b) => a.serial - b.serial)
    },
    moveDown(key) {
      const index = this.realIndex(key);
      const target = this.data[index];
      if (target.serial == this.maximumSerial)
        return;
      const newSerial = target.serial + 1;
      const oldItem = this.find(newSerial);
      this.data[oldItem].serial--;
      this.data[index].serial++;
      this.data = this.data.sort((a, b) => a.serial - b.serial)
    },
  }
}
</script>

<style scoped>
  .active {
    background: #a2a2a2;
  }

  .w-fit-content {
    width: fit-content !important;
  }
  
  td {
    cursor: pointer;
  }
  .row-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%!important;
  }
  .col-data {
      width: 90%;
      padding: 0!important;
  }
  .page-title {
      font-size: 1.4rem;
      text-align: center;
      color: #313131;
  }
</style>