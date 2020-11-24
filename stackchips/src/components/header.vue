<template>
  <div class="header_wrapper">
    <div @click="swapNav" class="burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <header class="header"
    v-bind:class="inactiveNav">
      <div class="nav_wrapper">
        <div class="logo_box">
          <a
            @click="showSocial"
            href="JavaScript:;"><img
            class="dice-logo"
            :src="diceLogo" />
            <img
            class="dice-logo-title"
            :src="diceLogoTitle" /></a>
        </div>
        <nav class="nav_menu">
          <ul>
            <!-- <li>
              <a
                @click="showNews"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.navigation[0] }}</a>
            </li> -->
            <li>
              <a
                class="nav_link"
                @click="showWhitePaper"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.navigation[1] }}</a>
            </li>
            <li>
              <a
                class="nav_link"
                @click="showDividends"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.navigation[2] }}</a>
            </li>
            <li>
              <a
                class="nav_link"
                @click="showReferrals"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.navigation[3] }}</a>
            </li>
            <li>
              <a
                class="nav_link"
                @click="login"
                v-if="!account.name"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.login_btn }}</a>
              <div
                class="account-cell"
                v-else
                href="JavaScript:;">
                <div class="user_cell">
                  <!-- <font-awesome-icon
                    class="user_icon"
                    icon="user" /> -->
                  <span>{{account.name}}</span>
                  <font-awesome-icon
                    class="icon-logout"
                    @click="logout"
                    icon="sign-out-alt" />
                </div>
              </div>
            </li>
            <!-- <li>
              <a
                @click="showAbout"
                href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.navigation[4] }}</a>
            </li> -->
            <!-- <li class="dropdown">
              <button class="dropbtn">
                {{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.dropdown.title }}
                <img src="../assets/arrow_down.png" alt="Show games">
              </button>

              <div class="dropdown-content">
                <a v-for="(obj, ind) in GET_LOCALE[GET_CURRENT_LOCALE].HEADER.dropdown.links"
                  :key="ind"
                  :href="obj.link"
                >
                {{ obj.title }}
                </a>
              </div>
            </li> -->
          </ul>
        </nav>
        <div class="icons_box">
          <div class="social">
            <div class="my-float-social" @click="navigate('twitter')">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </div>
            <div class="my-float-social" @click="navigate('telegram')">
              <font-awesome-icon :icon="['fab', 'telegram']" />
            </div>
            <!-- <div class="my-float-social" @click="navigate('medium')">
              <font-awesome-icon :icon="['fab', 'medium-m']" />
            </div> -->
            <div class="my-float-social"  @click="navigate('reddit')">
              <font-awesome-icon :icon="['fab', 'reddit']" />
            </div>
          </div>
          <div class="tools">
            <div @click="swapNotifyVisibility" title="Turn on/off notifications">
              <div :class="{'bell': true, 'bellActive': notifyIsVisible}">
                <font-awesome-icon :icon="['fas', 'bell']" />
                <font-awesome-icon :icon="['fas', 'bell-slash']" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="icon-bar">
          <a @click.prevent="swapLocale('EN', $event.target)" :class="{'inactive_ico': loc !== 'EN'}" href="#"><img src="../assets/english.png" alt=""></a>
          <a :class="{'inactive_ico': loc !== 'RU'}" href="#"><img src="../assets/russia.png"></a>
          <a :class="{'inactive_ico': loc !== 'CN'}"  href="#"><img src="../assets/china.png" alt=""></a>
        </div> -->
      </div>
      <!-- <div class="user_plug">
        <a
          @click="login"
          v-if="!account.name"
          href="JavaScript:;">{{ GET_LOCALE[GET_CURRENT_LOCALE].HEADER.login_btn }}</a>
        <div
          class="account-cell"
          v-else
          href="JavaScript:;">
          <font-awesome-icon
            class="user_icon"
            icon="user" />
          <span>{{account.name}}</span>
          <font-awesome-icon
            class="icon-logout"
            @click="logout"
            icon="sign-out-alt" />
        </div>
      </div> -->
    </header>
  </div>
</template>

<script>
// Importing maps from VUEX
import { mapGetters, mapActions } from 'vuex';

//import network from '@/utils/network';
import eventHub from '@/utils/event';
import diceLogo from '@/assets/logo.png';
import diceLogoTitle from '@/assets/logo-title.png';

export default {
  data () {
    return {
      diceLogo, diceLogoTitle,
      loc: 'EN',
      notifyIsVisible: true,
      windowWidth: 0
    }
  },

  mounted () {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    })
  },

  methods: {

    ...mapActions(['CHANGE_LOCALE']),

    swapNotifyVisibility () {
      this.notifyIsVisible = !this.notifyIsVisible;
      eventHub.$emit('swapNotifyVisibility');
    },

    navigate(brand) {
      switch (brand) {
        case 'twitter':
          window.open('//twitter.com/chips_stack');
          break;
        case 'medium':
          window.open('//medium.com/@StackChips');
          break;
        case 'reddit':
          window.open('//www.reddit.com/user/StackChips');
          break;
        case 'telegram':
          window.open('//t.me/Stackchips_games');
          break;
      }
    },

    swapLocale(loc, target) {
      this.loc = loc;
      this.CHANGE_LOCALE(loc);
    },

    swapNav () {
      const header = document.querySelector('header');
      header.classList.toggle('inactive_nav');
    },

    swapNotify () {
      eventHub.$emit('SWAP_NOTIFY');
    },

    login() {
      eventHub.$emit('login');
    },

    logout() {
      eventHub.$emit('logout');
    },

    showAbout() {
      eventHub.$emit('SHOW_ABOUT');
    },

    showDividends() {
      eventHub.$emit('SHOW_DIVIDENDS');
    },

    showSocial() {
      eventHub.$emit('SHOW_SOCIAL');
    },

    showNews() {
      eventHub.$emit('SHOW_NEWS');
    },

    showWhitePaper() {
      window.open(`${location.href}wp.pdf`);
    },

    showReferrals() {
      eventHub.$emit('SHOW_REFERRALS');
    },

    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      // console.log(this.windowWidth);
    }

  },

  computed: {
    ...mapGetters(['GET_LOCALE', 'GET_CURRENT_LOCALE']),
    account() {
      return this.$store.state.account;
    },
    dividends() {
      return this.$store.state.dividends;
    },

    inactiveNav: function () {
      return {
        inactive_nav: this.windowWidth < 1138
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

};
</script>

<style scoped>

  .bell{
    color: #5d6d94;
    width:20px;
    text-align:center;
  }
  .bell.bellActive{
    color:#41e1ef;
  }
  .bell .fa-bell{
    display:none;
  }
  .bell .fa-bell-slash{
    display:inline-block;
  }
  .bell.bellActive .fa-bell{
    display:inline-block;
  }
  .bell.bellActive .fa-bell-slash{
    display:none;
  }

  .game_title {
    color: #5d6d94;
    font-size: 1.2em;
    justify-content: center;
    align-items: center;
  }

  .header {
    background-color: transparent;
    position: sticky;
    height:67px;
    overflow:hidden;
    top: 0;
    z-index: 500;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'hel-r';
    /* margin-left: -100px; */
  }

  .inactive_ico {
    opacity: .3;
    cursor: no-drop;
  }

  .header .nav_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width:1920px;
    position:relative;
  }

  .burger {
    width: 25px;
    display: none;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }

  .burger > span {
    display: block;
    width: 100%;
    height: 2px;
    margin-bottom: 4px;
    background: #fff;
    border-radius: 2px;
  }

  .user_icon {
    margin-right: 10px;
  }

  .header .user_plug {
    position: fixed;
    right: 0;
    top: 100px;
    padding: 20px 27px;
    box-shadow: 0 0 18px 1px rgba(0, 0, 0, 0.67);
    border-radius: 3px;
    background-color: #1c2137;
  }

  .header ul {
    display: flex;
    align-items: center;
  }

  .header ul li {
    padding:0;
    height:67px;
  }

  .header .logo_box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header .logo_box h4 {
    color: orangered;
    font-size: 18px;
  }

  .nav_menu{

  }

  .header nav a {
    position:relative;
    color: #5d6d94;
    text-decoration: none;
    display:inline-block;
    font-weight: 400;
    font-size: 16px;
    vertical-align:middle;
    line-height:67px;
    padding:0 25px;
  }

  .header button {
    padding: 0 20px;
  }

  .header nav li a:after {
    content:'';
    position:absolute;
    left:0;
    top:50%;
    margin-top:-16px;
    height:32px;
    width:1px;
    background:#394471;
  }
  .header nav li:first-child a:after{
   background:transparent;
  }

  .header nav li {
    transition: border-color .3s ease-in-out, background-color .3s ease-in-out;
    border-bottom: 3px solid transparent;
  }

  .header nav li a {
    transition: color .3s ease-in-out;
  }

  .header nav li a:after{
    transition: background-color .3s ease-in-out;
  }

  .header nav li:hover{
    background-color:rgba(65, 225, 239, .1);
    border-bottom: 3px solid #41e1ef;
  }

  .header nav li:hover a{
    color:#41e1ef;
  }

  .header nav li:hover a:after{
    background:transparent;
  }
  .header nav li:hover + li a:after{
    background:transparent;
  }

  .icons_box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 20px;
    color: #5d6d94;
    padding: 0;
    width:233px;
  }

  .header .social {
    margin-left:16px;
    display: flex;
    justify-content: center;
    align-items: center;
    order: 2;
  }

  .header .tools {
    position:relative;
    margin-right: 16px;
    order: 1;
  }
  .header .tools:after {
    content:'';
    position:absolute;
    right:-16px;
    top:50%;
    margin-top:-16px;
    height:32px;
    width:1px;
    background:#394471;
  }

  .header svg {
    cursor: pointer;
    transition: color .3s ease-in-out;
  }

  .header .account-cell {
    position:absolute;
    right:210px;
    top:24px;
    color:#5d6d94;
  }
  .header .account-cell .user_cell span{
    color:#41e1ef;
    margin-right:12px;
  }

  /*.header .account-cell > span {
    margin-right: 12px;
  }*/

  .icon-logout {
    cursor: pointer;
    position:relative;
    top:1px;
  }

  .dice-logo {
    width: 90px;
    vertical-align: middle;
    margin-right: 23px;
  }
  .dice-logo-title {
    width: 120px;
    vertical-align: middle;
  }
  .dropbtn {
    /*background-color: #1c2137;*/
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
    background: -webkit-linear-gradient(#ffa903, #ff3465);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dropbtn img {
    margin-left: 9px;
    transition: transform .3s ease-in-out;
  }

  .dropdown:hover img {
    transform: rotate(180deg);
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {background-color: #f1f1f1}

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown:hover .dropbtn {
    background-color: #1c2137;
  }
  .icon-bar {
    display: inline;
  }
  .icon-bar a {
    display: inline-block;
    border-radius: 10px;
    padding: 0;
  }
  .icon-bar img{
    width: 20px;
    padding-left: 5px;
    border: none;
  }
  /*.dropdown i {*/
    /*border: solid;*/
    /*!*border-width: 0 2px 2px 0;*!*/
    /*display: inline-block;*/
    /*padding: 3px;*/
    /*margin-left: 6px;*/
    /*margin-bottom: 2px;*/
    /*border-image: linear-gradient(to left, #2e98bc 0%, #c66262 100%);*/
    /*border-image-slice: 1;*/
    /*border-width: 3px;*/
  /*}*/
  /*.down {*/
    /*transform: rotate(45deg);*/
    /*-webkit-transform: rotate(45deg);*/
  /*}*/
  .float{
    display: flex;
    position:fixed;
    width:60px;
    height:50px;
    bottom:518px;
    right:1px;
    background-color:#1c2137;
    color:#FFF;
    text-align:center;
    box-shadow: 5px 5px 30px 5px #0b0d1a;
    -webkit-transition: width 1s; /* For Safari 3.1 to 6.0 */
    transition: width 1s;
  }
  .float:hover {
    width: 200px;
  }
  .my-float{
    margin-top:17px;
    display: flex;
  }
  .user-icon {
    padding: 5px 23px 0 2px;
    height: 23px;
    width: 40px;
  }

  .user_cell span {
    margin: 0 10px;
  }

  .user_cell svg:first-child {
    margin-left: 15px;
  }

  .user_cell svg:last-child {
    margin-right: 15px;
  }

  .float-social {
    position:fixed;
    width:60px;
    bottom:130px;
    right:1px;
    background-color:#1c2137;
    color:#5d6d94;
    text-align:center;
    box-shadow: 5px 5px 30px 5px #0b0d1a;
  }

  .float-social li {
    cursor: pointer;
  }

  .my-float-social{
    margin-right: 16px;
  }
  .my-float-social:last-child{
    margin-right:0;
  }
  .my-float-social:hover {
    color: #41e1ef;
  }




  /**
    * Responsive
  */
.inactive_nav {
    margin-top:-400px;
}

@media screen and (max-width: 1138px) {

  .logo_box{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    z-index: 1000;
    background: #05061c;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .user_plug {
    position: static!important;
    box-shadow: none!important;
  }

  .header {
    transition: margin-top .3s ease-in-out;
    position: fixed;
    width: 100%;
    flex-direction: column;
    background: #05061c;
    height: 366px;
  }

  .burger {
    display: flex;
    position: fixed;
    top: 21px;
    left: 20px;
    z-index: 600;
  }

  .header .nav_wrapper {
    flex-direction: column;
    width: 100%;
  }

  .header .nav_wrapper nav {
    width: 100%;
  }

  .header .nav_wrapper nav ul {
    flex-direction: column;
    /* width: 100px; */
    padding: 40px 0 10px;
  }

  .header .nav_wrapper nav ul li {
    width: auto;
    text-align: center;
    /* padding: 5px 10px!important; */
  }

/*   .dice-logo {
    margin: 7px 0!important;
  } */

  .header .nav_wrapper nav ul li a {
    border: none;
  }

  .header nav li a:after{
    display:none;
  }

  .header .icons_box{
    position:fixed;
    right:20px;
    top: 21px;
    z-index: 1010;
  }
}

</style>
