<template>
  <div>
    <v-row>
        <v-col v-for='n in numDays' :key='n' :cols='3' v-show="isShowDay[n - 1]">
            <v-hover v-slot='{ hover }'>
                <v-card class='mx-auto' max-width='400' :elevation='hover ? 12 : 2'>
                <v-card>
                    <v-img
                    class="white--text align-end"
                    :src='cardImg[n % cardImg.length]'
                    :gradient='getGradient(hover)'
                    height='250'
                    >
                        <v-card-title><h2> Day {{ n }} </h2></v-card-title>
                    </v-img>
                </v-card>
                <v-card-text class='py-0'>
                    <v-timeline align-top dense>
                    <v-timeline-item v-for='i in 6' :key='i' :color='getTimelineColor(n, i)' small>
                        <v-row class='pt-1'>
                        <v-col cols='4'>
                            <strong v-text='getTime(n, i, 6)'></strong>
                        </v-col>
                        <v-col @click="nextIntro(n, i)">
                            <strong><div v-text='getRandomContent(n, i-1, "title")'></div> </strong>
                            <div class='caption' v-text='getRandomContent(n, i-1, "content")'></div>
                        </v-col>
                        </v-row>
                    </v-timeline-item>
                    </v-timeline>
                </v-card-text>
                </v-card>
            </v-hover>
        </v-col>
        <v-col cols='3'>
            <div v-for='n in 3' :key='n' v-show="isShowCard[n - 1]">
                <v-card
                :loading="loading"
                >
                    <v-img
                        height="250"
                        :src="cardImg[n]"
                    ></v-img>
                    <v-card-title v-text='getRandomContent(0, n, "title")'></v-card-title>
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
                        <div v-text='getRandomContent(0, n, "content")'></div>
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
                          color="deep-purple lighten-3"
                          text
                          @click="triggerDialog(2)"
                        >
                          Reserve
                          <v-dialog
                            v-model="dialog[2]"
                            hide-overlay
                            persistent
                            width="400"
                          >
                            <v-card
                              color="deep-purple lighten-2"
                              dark
                              class="pt-2"
                            >
                              <v-card-text>
                                <div style="color:white" v-html='btnMsg[2]'></div>
                                <v-progress-linear
                                  indeterminate
                                  color="white"
                                  class="mb-0"
                                ></v-progress-linear>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </v-btn>
                        <v-btn
                          color="orange lighten-2"
                          text
                          @click="showExt = !showExt;videoIdx = n-1"
                        >
                            Explore
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          @click="showExt = !showExt;videoIdx = n-1"
                        >
                            <v-icon>{{ showExt ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="showExt">
                            <v-divider></v-divider>
                            <v-card-text>
                              <v-file-input
                                small-chips
                                counter
                                show-size
                                prepend-icon="mdi-camera"
                                label="Upload Image"
                              ></v-file-input>
                              <v-textarea
                                auto-grow
                                count
                                outlined
                                clearable
                                color="deep-purple lighten-3"
                                clear-icon="mdi-close-circle"
                                label="Comment"
                                ref="inputRef"
                                v-model="commentContent"
                              ></v-textarea>
                              <div
                                v-for='i in 2'
                                :key='i'
                                style='display: inline-block;'
                              >
                                <v-btn
                                  :loading="dialog[i-1]"
                                  text
                                  color="deep-purple lighten-3"
                                  @click="triggerDialog(i-1)"
                                >
                                  <div v-html='btnTitle[i-1]'></div>
                                  <v-icon
                                    right
                                    dark
                                  >
                                    {{i == 1 ? 'mdi-cloud-upload' : 'mdi-comment' }}
                                  </v-icon>
                                  <v-dialog
                                    v-model="dialog[i-1]"
                                    hide-overlay
                                    persistent
                                    width="400"
                                  >
                                    <v-card
                                      color="deep-purple lighten-2"
                                      dark
                                      class="pt-2"
                                    >
                                      <v-card-text>
                                        <div style="color:white" v-html='btnMsg[i-1]'></div>
                                        <v-progress-linear
                                          indeterminate
                                          color="white"
                                          class="mb-0"
                                        ></v-progress-linear>
                                      </v-card-text>
                                    </v-card>
                                  </v-dialog>
                                </v-btn>
                                <v-snackbar
                                  v-model="snackbar"
                                  multi-line
                                >
                                  Success!
                                  <template v-slot:action="{ attrs }">
                                    <v-btn
                                      color="primary lighten-2"
                                      text
                                      v-bind="attrs"
                                      @click="snackbar = false"
                                    >
                                      Close
                                    </v-btn>
                                  </template>
                                </v-snackbar>
                              </div>
                              <div
                                v-for='i in 2'
                                :key="n + '_' + i"
                                style='display: inline-block;'
                              >
                                <v-btn
                                  small
                                  color="red lighten-3"
                                  text
                                  dark
                                  @click.stop="triggerAPIDialog(i-1)"
                                >
                                  API
                                </v-btn>
                                <v-dialog
                                  v-model="APIDialog[i-1]"
                                  :max-width="APIDialogWidth"
                                >
                                  <v-card>
                                    <v-card-title v-html="APIIntroTitle[i-1]">
                                    </v-card-title>
                                    <v-card-text v-html="APIIntroContent[i-1]">
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        color="grey lighten-1"
                                        text
                                        @click="triggerAPIDialog(i-1)"
                                      >
                                        Close
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                </v-card>
            </div>
        </v-col>
        <v-col cols='6' v-show="showExt">
          <div class='mx-0'>
            <iframe id="ytplayer" type="text/html" width="720" height="405"
            :src="introVideo[videoIdx]"
            frameborder="0"></iframe>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="red lighten-3"
            text
            dark
            @click.stop="triggerAPIDialog(2)"
          >
            API
          </v-btn>
          <v-dialog
            v-model="APIDialog[2]"
            :max-width="APIDialogWidth"
          >
            <v-card>
              <v-card-title v-html="APIIntroTitle[2]">
              </v-card-title>
              <v-card-text v-html="APIIntroContent[2]">
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey lighten-1"
                  text
                  @click="triggerAPIDialog(2)"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-divider class="mb-2" width="720"></v-divider>
          <div>
            <img
                src='https://www.google.com/maps/vt/data=G9pqpSLmZPMniI-NvV4bw_Nvlo9fSeGeCpgkgTkLHEWOaUghPUqz-nHS5fXCBqKaPGDQdopkXu6mFFTW0qBUhNSYX28s6hfnyjHMs0Fut5cYE1ddF7Um9ORzc6oRPEiLWTN6QooR-aYOqcM3Gm9rrlG-XOe9JfToh6aqIp7ZWWKY9IZLPrToXVnJBU6mVMMVOFkdHkkytJQRrrqkMWytPKJ0sBl7GSiCN9YDwjy3T4Ns-vKiBNGsDLtH'
                width="720" height="405"
            />
          </div>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="red lighten-3"
            text
            dark
            @click.stop="triggerAPIDialog(3)"
          >
            API
          </v-btn>
          <v-dialog
            v-model="APIDialog[3]"
            :max-width="APIDialogWidth"
          >
            <v-card>
              <v-card-title v-html="APIIntroTitle[3]">
              </v-card-title>
              <v-card-text v-html="APIIntroContent[3]">
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey lighten-1"
                  text
                  @click="triggerAPIDialog(3)"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-divider class="mb-2" width="720"></v-divider>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols='3'>
        <v-pagination
          v-model="showDayIdx"
          :length="numDays"
          @input="nextShowDay"
        ></v-pagination>
      </v-col>
    </v-row>
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
      isShowCard: [false, false, false],
      showCardIdx: 0,
      loading: false,
      showExt: false,
      lastRNI: 0,
      timeout: 3000,
      snackbar: false,
      videoIdx: 0,
      showDayIdx: 1,
      uploading: false,
      commenting: false,
      commentContent: '',
      dialog: [false, false, false],
      APIDialog: [false, false, false],
      APIDialogWidth: 500,
      btnTitle: ['upload', 'comment'],
      btnMsg: [
        'Uploading an image... <div class="text-right"><i>by Flickr</i></div>',
        'Sending a comment...  <div class="text-right"><i>by Travel Portal</i></div>',
        'Submitting an order...  <div class="text-right"><i>by Travel Portal</i></div>'
      ],
      snackMsg: [
        'Upload an image successfully! <div class="text-right"><i>by Flickr</i></div>',
        `Send a comment successfully! <div class="text-right"><i>by Travel Portal</i></div>`,
        'Submit an order successfully! <div class="text-right"><i>by Travel Portal</i></div>'
      ],
      APIIntroTitle: [
        'Introduction to Flickr',
        'Introduction to Travel Portal',
        'Introduction to Youtube',
        'Introduction to Google Maps'
      ],
      APIIntroContent: [
        'Here is the feature provided by <i>Flickr</i>.',
        'Here is the feature provided by <i>Travel Portal</i>.',
        'Here is the feature provided by <i>Youtube</i>.',
        'Here is the feature provided by <i>Google Maps</i>.'
      ],
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
    this.numDays = parseInt(this.$route.params.numDays)
    if (isNaN(this.numDays)) {
      this.numDays = 4
    }
    this.isShowDay = Array(this.numDays).fill(false)
    this.isShowDay[0] = true
  },
  methods: {
    triggerDialog (i) {
      this.$set(this.dialog, i, true)
      let that = this
      setTimeout(() => {
        that.$set(that.dialog, i, false)
        that.snackbar = true
        that.commentContent = ''
      }, 3000)
    },
    triggerAPIDialog (i) {
      this.$set(this.APIDialog, i, !this.APIDialog[i])
    },
    nextShowDay () {
      for (let i = 0; i < this.isShowDay.length; i++) {
        this.$set(this.isShowDay, i, false)
      }
      this.$set(this.isShowDay, this.showDayIdx - 1, true)
    },
    nextIntro (n, i) {
      if (this.isShowCard[this.showCardIdx] === true) {
        this.$set(this.isShowCard, this.showCardIdx, false)
        this.showExt = false
      } else {
        if (this.lastRNI !== n * 10 + i) {
          this.showCardIdx = (this.showCardIdx + 1) % this.introVideo.length
        }
        this.$set(this.isShowCard, this.showCardIdx, true)
        this.lastRNI = n * 10 + i
      }
    },
    getRandomContent (key, item, type) {
      let arr = (type === 'title') ? this.title : this.content
      if (!(key in arr)) {
        arr[key] = []
        let arrLipsum = this.lipsum.split(' ')
        for (let j = 0; j < 10; j++) {
          let shuffled = arrLipsum.slice(0)
          let i = arrLipsum.length
          let min = i - (type === 'title' ? 2 : (5 + Math.floor((3 + 1) * Math.random())))
          let temp
          let index
          while (i-- > min) {
            index = Math.floor((i + 1) * Math.random())
            temp = shuffled[index]
            shuffled[index] = shuffled[i]
            shuffled[i] = temp
          }
          arr[key].push(shuffled.slice(min).join(' '))
        }
      }
      return arr[key][item]
    },
    getRandomContent1 (key, item) {
      if (!(key in this.content)) {
        this.content[key] = []
        let arr = this.lipsum.split(' ')
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
          this.content[key].push(shuffled.slice(min).join(' '))
        }
      }
      return this.content[key][item]
    },
    getTime (n, i, r) {
      if (!(n in this.time)) {
        var seq = this.getRandomArrayElements([...Array(this.timeSequence.length).keys()], r + 1)
        seq.sort()
        this.time[n] = []
        for (var idx of seq) {
          this.time[n].push(this.timeSequence[idx])
        }
      }
      return this.time[n][i]
    },
    getTimelineColor (n, i) {
      if (!(n in this.color)) {
        this.color[n] = []
        for (var temp = 0; temp < 10; temp++) {
          var index = Math.floor((this.timelineColor.length + 1) * Math.random())
          this.color[n].push(this.timelineColor[index])
        }
      }
      return this.color[n][i]
    },
    getGradient (hover) {
      if (hover === true) {
        return 'to top, rgba(0,0,0,0), rgba(0,0,0,0)'
      } else {
        return 'to top, rgba(0,0,0,.44), rgba(0,0,0,.44)'
      }
    },
    getRandomArrayElements (arr, count) {
      let shuffled = arr.slice(0)
      let i = arr.length
      let min = i - count
      let temp
      let index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    }
  }
}
</script>

<style scoped>
@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";
@import "https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css";
</style>
