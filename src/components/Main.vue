<script src="../js/search.js"></script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";
@import "https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css";
</style>
<template>
  <div class="searchbar">
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="200"
          color="white"
          opacity="0.2"
          width="10"
        >
          <div style="font-size:200%">Generating</div>
        </v-progress-circular>
      </v-overlay>
      <v-row>
        <v-col
          class='mt-6'
          md='10'
          offset-md='1'
        >
          <img
            src="https://i.imgur.com/JoYML88.png"
            alt="Title"
            width="100%"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md='10'
          offset-md='1'
        >
          <v-card>
            <v-card-text id='mainSelect'>
              <div
                v-for="(item, index) in preferences"
                :key="index"
              >
                <span class="subheading">{{ item.name }}</span>
                <v-autocomplete
                  v-if="item.isInput"
                  multiple
                  chips
                  :loading="loading"
                  :items="items"
                  :search-input.sync="search"
                  rounded
                  deletable-chips
                  clearable
                  item-color="blue"
                  @change="getProgress()"
                ></v-autocomplete>
                <v-chip-group
                  v-if="item.isChipGroup"
                  :multiple="item.isMultiple"
                  active-class="primary--text"
                >
                  <v-chip
                    v-for="tag in item.itemList"
                    :key="tag"
                    v-on:click="getProgress"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
                <v-range-slider
                  v-if="item.isSlider"
                  v-model="item.range"
                  :max="item.max"
                  :min="item.min"
                  :step="item.step"
                  hide-details
                  class="align-center"
                >
                  <template v-slot:prepend>
                    <v-text-field
                      :value="item.range[0]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(item.range, 0, $event)"
                    ></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field
                      :value="item.range[1]"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 60px"
                      @change="$set(item.range, 1, $event)"
                    ></v-text-field>
                  </template>
                </v-range-slider>
                <v-divider v-if="index==0" class="mb-2"></v-divider>
                <v-divider v-if="index!=0 && index!=preferences.length-1" class="my-2"></v-divider>
                <v-divider v-if="index==preferences.length-1" class="mt-3"></v-divider>
              </div>
            </v-card-text>
            <v-col>
              <v-row>
                <v-col class="my-n5" cols="11" style="{border-style:solid; border-width:5px}">
                  <v-text-field
                    label="Other requirements"
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    small
                    color="red lighten-3"
                    text
                    dark
                    @click.stop="APIDialog = true"
                    v-show="false"
                  >
                    API
                  </v-btn>
                  <v-dialog
                    v-model="APIDialog"
                    :max-width="APIDialogWidth"
                  >
                    <v-card>
                      <v-card-title v-html="APIIntroTitle">
                      </v-card-title>
                      <v-card-text v-html="APIIntroContent">
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="grey lighten-1"
                          text
                          @click="APIDialog = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-progress-linear
                color="light-blue"
                height="15"
                v-model="progressVal"
                striped
                rounded
              >
                <strong>{{ Math.ceil(progressVal) }}%</strong>
              </v-progress-linear>
            </v-col>
            <v-card-actions>
              <v-btn
                block
                x-large
                elevation="5"
                class="white--text"
                color="primary"
                @click="jump()"
              >
                Generate a plan
                <v-icon class="ml-2">mdi-airplane</v-icon>
              </v-btn>
              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
              >
                Please complete the preference sheet.
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red lighten-1"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mb-16">
        <v-col v-for="n in 6" :key="n" :cols="n%3==2?4:3" :offset-md='n%3==1?1:0'>
            <v-card
              class="mt-10"
              min-width="300"
              v-once
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="cardImg[(n-1)%6]"
              >
              <v-card-title>
                <div v-text="getRandomArrayElements(3)"></div>
              </v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">
                <div v-text="getRandomArrayElements(1)"></div>
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div><div v-text="getRandomArrayElements(2)"></div></div>
                <div><div v-text="getRandomArrayElements(5)"></div></div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Share
                </v-btn>
                <v-btn
                  color="orange"
                  text
                  @click="$router.push('/Recommend')"
                >
                  Explore
                </v-btn>
                <v-spacer></v-spacer>
                <v-avatar size="35" color="orange" v-if="n==1">
                  <span class="white--text headline">Ad</span>
                </v-avatar>
              </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "searchbar",
  data() {
    return {
      numDays: 1,
      overlay: false,
      snackbar: false,
      timeout: 2000,
      progressVal: 0,
      loading: false,
      search: null,
      items: [],
      states: ["Chi Lin Nunnery", "Disneyland", "Dragon's Back Hike", "Garden of Stars", "Hong Kong Park", "Hong Kong Skyline", "Lan Kwai Fong", "Man Mo Temple", "Ocean Park", "Repulse Bay", "Star Ferry", "Tai O Fishing Village", "Temple Street Night Market", "Ten Thousand Buddhas Monastery", "Tian Tan Buddha", "Tsim Sha Tsui", "Victoria Peak", "Wong Tai Sin Temple"],
      preferences: [
        {
          index: 0,
          name: "Destination",
          itemList: ["Chi Lin Nunnery", "Disneyland", "Dragon's Back Hike", "Garden of Stars", "Hong Kong Park", "Hong Kong Skyline", "Lan Kwai Fong", "Man Mo Temple", "Ocean Park", "Repulse Bay", "Star Ferry", "Tai O Fishing Village", "Temple Street Night Market", "Ten Thousand Buddhas Monastery", "Tian Tan Buddha", "Tsim Sha Tsui", "Victoria Peak", "Wong Tai Sin Temple"],
          isMultiple: true,
          isInput: true
        },
        {
          index: 1,
          name: "Number of days",
          itemList: Array(7-1).fill(1).map((el,i)=>1+i),
          isMultiple: false,
          isChipGroup: true
        },
        {
          index: 2,
          name: "Number of people",
          itemList: Array(7-1).fill(1).map((el,i)=>1+i),
          isMultiple: false,
          isChipGroup: true
        },
        {
          index: 3,
          name: "Room types",
          itemList: ["Single", "En suite", "Twin", "Studio"],
          isMultiple: false,
          isChipGroup: true
        },
        {
          index: 4,
          name: "Dining preferences (Multiple-Choice)",
          itemList: ["Snack", "Dessert", "Hot Pot", "Barbecue", "Buffet", "Seafood", "Fastfood", "Vegetables"],
          isMultiple: true,
          isChipGroup: true
        },
        {
          index: 5,
          name: "Budget per capita",
          min: 500,
          max: 10000,
          step: 500,
          range: [1000, 5000],
          isSlider: true,
        }
      ],
      APIDialog: false,
      APIDialogWidth: 500,
      APIIntroTitle: 'Introduction to Yonder Keyword Extraction',
      APIIntroContent: '\
        Here is the featur\
        <ul>\
        <li>Coffee</li>\
        <li>Milk</li>\
        </ul>\
        e prov<br>ided by <i>Yonder Keyword Extraction</i>.\
        ',
      cardImg: [
        'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        'https://cdn.vuetifyjs.com/images/cards/cooking.png',
        'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg',
        'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
        'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
      ],
      lipsum: 'Vis ea hinc tamquam Ius id denique commune Nec meliore ocurreret te maiorum tacimates qualisque ius te eos te adhuc delenit Ne pri primis facilis deseruisse Eos assum soleat ei nominavi deleniti legendos per ne Aperiri dolorum deleniti cum ea munere graecis et quo vero nemore ne mel',
    };
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 2500)
    },
  },
  mounted: function() {},
  methods: {
    jump () {
      this.getProgress()
      if (this.progressVal == 100) {
        this.overlay = !this.overlay
        let that = this
        let count = 0
        for (var item of document.getElementById('mainSelect').childNodes[1].children[1].children[1].children[0].children) {
          count++
          if (item.classList.contains('v-chip--active')) {
            that.numDays = count
            break
          }
        }
        setTimeout( function () {
          that.$router.push({ path: `/Result/${that.numDays}` })
        }, 2500)
      } else {
        this.snackbar = true
      }
    },
    getProgress () {
      let that = this;
      setTimeout( function () {
        if (document.getElementById('mainSelect') == null) {
          return that.defaultProgress
        }
        var activeNum = 0;
        document.getElementById('mainSelect').childNodes.forEach(function (ele, idx) {
          var rowActive = false;
          if (idx == 0) {
            if (ele.children[1].children[0].children[0].children[0].children[0].childNodes.length > 1) {
              rowActive = true;
            }
          } else if (idx < document.getElementById('mainSelect').childNodes.length-1) {
            for (var col of ele.children[1].children[1].children[0].children) {
              if (col.classList.contains('v-chip--active')) {
                rowActive = true;
                break;
              }
            }
          }
          if (rowActive == true) {
            activeNum += 1;
          }
        })
        that.progressVal = activeNum / (document.getElementById('mainSelect').childNodes.length-1) * 100
      }, 1)
    },
    getRandomArrayElements (count) {
      var arr = this.lipsum.split(' ')
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min).join(' ');
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      if (this.items.length > this.states.length) {
        this.items.shift() // update items after receiving new inputs
      }
      var queryResult = this.states.filter(e => {
        return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
      })
      if (!(v in queryResult)) {
        queryResult.unshift(v)
      }
      this.items = queryResult
      this.loading = false
    }
  }
};
</script>
