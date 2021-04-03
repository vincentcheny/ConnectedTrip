<template>
  <div>
    <v-row v-for='r in getDayRow()' :key='r' :id='r'>
        <v-col v-for='n in getDayCol(r)' :key='n' :cols='3' v-once>
            <v-hover v-slot='{ hover }'>
                <v-card class='mx-auto' max-width='400' :elevation='hover ? 12 : 2'>
                <v-card>
                    <v-img
                    class="white--text align-end"
                    :src='cardImg[2 * r + n - 3]'
                    :gradient='getGradient(hover)'
                    height='250'
                    >
                        <v-card-title><h2> Day {{ 2 * r + n - 2 }} </h2></v-card-title>
                    </v-img>
                </v-card>
                <v-card-text class='py-0'>
                    <v-timeline align-top dense>
                    <v-timeline-item v-for='i in 6' :key='i' :color='getTimelineColor(r, n, i)' small>
                        <v-row class='pt-1'>
                        <v-col cols='4'>
                            <strong v-text='getTime(r, n, i, 6)'></strong>
                        </v-col>
                        <v-col @click="nextIntro(r, n, i)">
                            <strong><div v-text='getRandomTitle(r, n, i-1)'></div> </strong>
                            <div class='caption' v-text='getRandomContent(r, n, i-1)'></div>
                        </v-col>
                        </v-row>
                    </v-timeline-item>
                    </v-timeline>
                </v-card-text>
                </v-card>
            </v-hover>
        </v-col>
        <v-col cols='6'>
            <div v-for='n in 3' :key='n' v-show="isShow[n - 1] && r == 1">
                <v-card
                :loading="loading"
                >
                    <template slot="progress">
                        <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                        ></v-progress-linear>
                    </template>
                    <v-img
                        height="250"
                        :src="cardImg[n]"
                    ></v-img>
                    <v-card-title v-text='getRandomTitle(0,0,n)'></v-card-title>
                    <v-card-text>
                        <v-row
                        align="center"
                        class="mx-0"
                        >
                        <v-rating
                            :value='rating[n-1]'
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$ratingFull"
                            readonly
                        ></v-rating>
                        <div class="grey--text ml-4">
                            {{rating[n-1]}} ({{numComments[n-1]}})
                        </div>
                        </v-row>
                        <div class="my-4 subtitle-1">
                        $ • Tyeery, Dto
                        </div>
                        <div v-text='getRandomContent(0, 0, n)'></div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-title>Availability on the day</v-card-title>
                    <v-card-text>
                        <v-chip-group
                        active-class="deep-purple accent-4 white--text"
                        column
                        >
                        <v-chip>5:30PM</v-chip>
                        <v-chip>7:30PM</v-chip>
                        <v-chip>8:00PM</v-chip>
                        <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="reserve"
                        >
                            Reserve
                        </v-btn>
                        <v-btn
                        color="orange lighten-2"
                        text
                        @click="showExt = !showExt"
                        >
                            Explore
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                        icon
                        @click="showExt = !showExt"
                        >
                            <v-icon>{{ showExt ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="showExt">
                            <v-divider></v-divider>
                            <v-card-text>
                                {{lipsum}}
                            </v-card-text>
                            <div class='mx-0'>
                                <iframe v-if='r==1' id="ytplayer" type="text/html" width="431" height="244"
                                :src="introVideo[n-1]"
                                frameborder="0"></iframe>
                                <img
                                    src='https://www.google.com/maps/vt/data=G9pqpSLmZPMniI-NvV4bw_Nvlo9fSeGeCpgkgTkLHEWOaUghPUqz-nHS5fXCBqKaPGDQdopkXu6mFFTW0qBUhNSYX28s6hfnyjHMs0Fut5cYE1ddF7Um9ORzc6oRPEiLWTN6QooR-aYOqcM3Gm9rrlG-XOe9JfToh6aqIp7ZWWKY9IZLPrToXVnJBU6mVMMVOFkdHkkytJQRrrqkMWytPKJ0sBl7GSiCN9YDwjy3T4Ns-vKiBNGsDLtH'
                                    width="431" height="244"
                                />
                            </div>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-col>
    </v-row>
    <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    >
        Commit an order successfully! <i>by Travel Portal</i>
    <template v-slot:action="{ attrs }">
        <v-btn
        color="teal lighten-1"
        text
        v-bind="attrs"
        @click="snackbar = false"
        >
        Close
        </v-btn>
    </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  data () {
    return {
      cardImg: [
        'https://images.pexels.com/photos/1294671/pexels-photo-1294671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        'https://cdn.vuetifyjs.com/images/cards/forest.jpg',
        'https://cdn.vuetifyjs.com/images/cards/house.jpg'
      ],
      timelineColor: [
        'blue',
        'teal',
        'pink'
      ],
      timeSequence: [
        '8am',
        '9am',
        '10-11am',
        '12am',
        '1-2pm',
        '3pm',
        '4pm',
        '5-6pm',
        '7pm',
        '8-9pm'
      ],
      rating: [3.5, 4.5, 5],
      numComments: [412, 5938, 820],
      time: {},
      color: {},
      title: {},
      content: {},
      isShow: [false, false, false],
      showIdx: 0,
      loading: false,
      showExt: false,
      lastRNI: 0,
      timeout: 3000,
      snackbar: false,
      introVideo: [
        'https://www.youtube.com/embed/MkAzZOjgM5k',
        'https://www.youtube.com/embed/CKnGXZxK7zs',
        'https://www.youtube.com/embed/DyBSGdwIIoA'
      ],
      lipsum: 'Vis ea hinc tamquam Ius id denique Nec meliore ocurreret te maiorum tacimates qualisque ius te eos te adhuc delenit Ne pri primis facilis deseruisse Eos assum soleat ei nominavi deleniti legendos per ne Aperiri dolorum deleniti cum ea munere graecis et quo vero nemore ne mel'
    }
  },
  watch: {
    overlay (val) {
      val &&
        setTimeout(() => {
          this.overlay = false
        }, 2500)
    }
  },
  created: function () {
    let arr = this.cardImg
    let random
    for (let i = 1; i < arr.length; i++) {
      random = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[random]] = [arr[random], arr[i]]
    }
  },
  methods: {
    reserve () {
      this.loading = true
      let that = this
      setTimeout(() => {
        that.loading = false
        that.snackbar = true
      }, 2000)
    },
    nextIntro (r, n, i) {
      if (this.isShow[this.showIdx] === true) {
        this.$set(this.isShow, this.showIdx, false)
      } else {
        if (this.lastRNI !== r * 10 * 10 + n * 10 + i) {
          this.showIdx = (this.showIdx + 1) % this.introVideo.length
        }
        this.$set(this.isShow, this.showIdx, true)
        this.lastRNI = r * 10 * 10 + n * 10 + i
      }
    },
    getRandomTitle (row, col, item) {
      if (!(row * col in this.title)) {
        this.title[row * col] = []
        var arr = this.lipsum.split(' ')
        for (var j = 0; j < 10; j++) {
          var shuffled = arr.slice(0)
          var i = arr.length
          var min = i - 2
          var temp
          var index
          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random())
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
          }
          this.title[row * col].push(shuffled.slice(min).join(' '))
        }
      }
      return this.title[row * col][item]
    },
    getRandomContent (row, col, item) {
      if (!(row * col in this.content)) {
        this.content[row * col] = []
        var arr = this.lipsum.split(' ')
        for (var j = 0; j < 10; j++) {
          var shuffled = arr.slice(0)
          var i = arr.length
          var min = i - 5 - Math.floor((3 + 1) * Math.random())
          var temp
          var index
          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random())
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
          }
          this.content[row * col].push(shuffled.slice(min).join(' '))
        }
      }
      return this.content[row * col][item]
    },
    getTime (row, n, i, r) {
      if (!(row * n in this.time)) {
        var seq = this.getRandomArrayElements([...Array(this.timeSequence.length).keys()], r + 1)
        seq.sort()
        this.time[row * n] = []
        for (var idx of seq) {
          this.time[row * n].push(this.timeSequence[idx])
        }
      }
      return this.time[row * n][i]
    },
    getDayRow () {
      let numDays = parseInt(this.$route.params.numDays)
      if (isNaN(numDays)) {
        numDays = 4
      }
      return parseInt((numDays + 1) / 2)
    },
    getDayCol (r) {
      let numDays = parseInt(this.$route.params.numDays)
      if (isNaN(numDays)) {
        numDays = 4
      }
      if ((numDays % 2) === 1 && r === this.getDayRow()) {
        return 1
      } else {
        return 2
      }
    },
    getTimelineColor (r, n, i) {
      if (!(r * n in this.color)) {
        this.color[r * n] = []
        for (var temp = 0; temp < 10; temp++) {
          var index = Math.floor((this.timelineColor.length + 1) * Math.random())
          this.color[r * n].push(this.timelineColor[index])
        }
      }
      return this.color[r * n][i]
    },
    getGradient (hover) {
      if (hover === true) {
        return 'to top, rgba(0,0,0,0), rgba(0,0,0,0)'
      } else {
        return 'to top, rgba(0,0,0,.44), rgba(0,0,0,.44)'
      }
    },
    getRandomArrayElements (arr, count) {
      var shuffled = arr.slice(0)
      var i = arr.length
      var min = i - count
      var temp
      var index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    jump () {
      this.getProgress()
      if (this.progressVal === 100) {
        this.overlay = !this.overlay
        var that = this
        setTimeout(function () {
          that.$router.push({ path: '/Result' })
        }, 2500)
      } else {
        this.snackbar = true
      }
    }
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";
@import "https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css";
</style>
