<template>
  <v-app id="inspire" style="background: #f6f8fa">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
          @click="jump(link)"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-menu
          bottom
          min-width="200px"
          rounded
          offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
            class="mr-2"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text headline">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text headline">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Profile
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Setting
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer
        dark
        padless
      >
        <v-card
          class="flex"
          flat
          tile
        >
          <v-card-title class="primary">
            <strong class="subheading">Get connected with us on social networks!</strong>
            <v-spacer></v-spacer>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              dark
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>CUHK SEEM5760 Group 1</strong>
          </v-card-text>
        </v-card>
      </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    links: ['Main', 'About Us'],
    user: {
      initials: 'VC',
      fullName: 'Vincent Chen',
      email: 'vincent.chen@temp.com'
    },
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ]
  }),
  methods: {
    jump (link) {
      //  传递的参数用{{ $route.query.goodsId }}获取
      // this.$router.push({path: '/cart?goodsId=12'})
      //  this.$router.go(-2) //后退两步
      if (link === 'Main') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/' + link })
      }
    }
  }
}
</script>
