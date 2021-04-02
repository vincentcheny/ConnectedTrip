<template>
  <div class="contact">
      <!-- <v-container class="mt-15"> -->
        <v-row>
          <v-col md="10" offset-md="1">
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
              <v-timeline-item color="purple lighten-2" fill-dot right>
                <v-card>
                  <v-card-title class="purple lighten-2 justify-center">
                    <h2 class="display-1 white--text">
                      CHEN YU
                    </h2>
                  </v-card-title>
                  <!-- <v-container>
                    <v-row>
                      <v-col cols="12" md="10" class="text-right">
                        1155107977@link.cuhk.edu.hk
                      </v-col>
                      <v-col class="hidden-sm-and-down text-right" md="2">
                        <v-icon size="64">
                          mdi-calendar-text
                        </v-icon>
                      </v-col>
                    </v-row>
                  </v-container> -->
                </v-card>
              </v-timeline-item>

              <v-timeline-item color="amber darken-3" fill-dot left>
                <v-card>
                  <v-card-title class="amber darken-3 justify-center">
                    <h2 class="display-1 mr-4 white--text">
                        LO NOK MAN
                    </h2>
                  </v-card-title>
                </v-card>
              </v-timeline-item>

              <v-timeline-item color="cyan lighten-1" fill-dot right>
                <v-card>
                  <v-card-title class="cyan lighten-1 justify-center">
                    <h2 class="display-1 white--text">
                      SHU QIYANG
                    </h2>
                  </v-card-title>
                </v-card>
              </v-timeline-item>

              <v-timeline-item color="red lighten-1" fill-dot left>
                <v-card>
                  <v-card-title class="red lighten-1 justify-center">
                    <h2 class="display-1 mr-4 white--text">
                      WEN ZEJING
                    </h2>
                  </v-card-title>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      <!-- </v-container> -->
  </div>
</template>
