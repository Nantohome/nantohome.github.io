<template>
  <section class="slider-container">
    <div class="slider">
      <div
        ref="slide"
        @click="slide"
        class="slider-bg">
        <div
          ref="range"
          :style="{'right': rangeDistance}"
          class="slider-range"></div>
        <div
          @mousedown="dragStart"
          :style="{'right': rangeDistance}"
          ref="handle"
          class="slider-handle">{{current}}</div>
      </div>
      <transition name="slide-fade" appear>
        <div :style="{'left' : `${GET_ROLL.value}%`}"
           :class="{slider_plug: true, green_plug: GET_ROLL.value < GET_ROLL.border, red_plug: GET_ROLL.value >= GET_ROLL.border}"
           v-show="GET_ROLL_STATE">
           {{ GET_ROLL.value }}
        </div>
      </transition>
    </div>
    <div class="numbers">
      <ul class="flex-container nowrap">
        <li class="flex-item">1</li>
        <li class="flex-item">25</li>
        <li class="flex-item">50</li>
        <li class="flex-item">75</li>
        <li class="flex-item">100</li>
      </ul>
    </div>
  </section>
</template>

<script>
import eventHub from '@/utils/event';

// Importing maps from VUEX
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    initial: {
      type: Number,
      default: 50
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    const { offsetWidth } = this.$refs.slide;
    const { left } = this.$refs.slide.getBoundingClientRect();

    this.left = left;
    this.slideWidth = offsetWidth;

    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.dragEnd);
    document.addEventListener('mouseleave', this.dragEnd);
  },
  data() {
    return {
      current: this.initial,
      isDraging: false,
      left: 0,
      slideWidth: 0,
      ROLL_COUNTDOWN: 7 // How much time IN SECONDS roll plug will be visible
    };
  },
  computed: {

    ...mapGetters(['GET_ROLL', 'GET_ROLL_STATE']),

    rangeDistance() {
      return this.slideWidth - this.offsetX + 'px';
    },

    offsetX() {
      return this.current / 100 * this.slideWidth;
    }
  },
  methods: {

    ...mapActions(['CHANGE_ROLL_STATE']),

    slide({ offsetX }) {
      const current = Math.floor(offsetX / this.slideWidth * 100);
      switch (true) {
        case (current < this.min):
          this.current = this.min;
          break;
        case (current > this.max):
          this.current = this.max;
          break;
        default:
          this.current = current;
      }
      eventHub.$emit('ROLLUNDER_CHANGE', this.current);
    },
    drag({ screenX, offsetX, pageX }) {
      if (!this.isDraging) return;
      this.slide({ offsetX: screenX - this.left });
    },
    dragStart() {
      this.isDraging = true;
    },
    dragEnd() {
      this.isDraging = false;
    }
  },

  watch: {
    GET_ROLL_STATE () {
      setTimeout(() => this.CHANGE_ROLL_STATE(false), (this.ROLL_COUNTDOWN + 2) * 1000);
    }
  },

  destroyed() {
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseleave', this.dragEnd);
    document.removeEventListener('mouseup', this.dragEnd);
  }
};
</script>

<style scoped>

  /**
    * Transition classes
  */

  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }


  .slider-container {
    background-color: transparent;
    border-radius: 50px;
    margin: 0 auto;
    /* width: 636px; */
    /* padding: 30px; */
    user-select: none;
    width: 100%;
  }

  .slider {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .slider .slider_plug {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 2px;
    top: 19px;
    z-index: 100;
    transition: left .8s ease-in-out, color .8s ease-in-out, background .8s ease-in-out;
    font-size: 14px;
    font-family: 'hel-l';
    width: 34px;
    height: 22px;
    padding: 0px;
    background:transparent;
  }

  .slider .red_plug {
    background: rgba(254, 73, 69, .1);
    border: 1px solid #fe4945;
    color: #fe4945;
  }
  .slider .red_plug:after{
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 2px 2px;
    border-color: #392033 transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -2px;
    left: 15px;
  }
  .slider .red_plug:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 2px 2px;
    border-color: #fe4945 transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -3px;
    left: 15px;
  }

  .slider .green_plug {
    background: rgba(44, 255, 64, .1);
    border: 1px solid #2cff40;
    color: #2cff40;
  }
  .slider .green_plug:after{
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 2px 2px;
    border-color: #243233 transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -2px;
    left: 15px;
  }
  .slider .green_plug:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 2px 2px;
    border-color: #2cff40 transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -3px;
    left: 15px;
  }

  .slider > span {
    color: #fff;
    font-weight: 600;
    padding: 0 10px;
    letter-spacing: .5px;
    font-size: 16px;
  }

  .slider-bg {
    background-color: rgba(255, 2555, 255, 0.1);
    height: 7px;
    border-radius: 3.5px;
    width: 513px;
    position: relative;
    cursor: pointer;
  }

  .slider-range {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #41e1ef;
    border-radius: 3.5px;
    transition: right ease 200ms;
  }

  .slider-handle {
    cursor: grabbing;
    position: absolute;
    z-index: 1;
    margin-right: -24px;
    transition: right ease 200ms;
    width: 36px;
    height: 21px;
    border-radius: 4px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -7px;
    font-family: 'hel-m';
    font-size:14px;
    color:#1c2137;
  }

  .slider-tooltip {
    width: 25px;
    text-align: center;
    position: absolute;
    margin-top: -30px;
    background: #1c2137;
    padding: 4px;
    border-radius: 4px;
    color: #fff;
    font-size: .8em;
    margin-right: -1em;
    transition: right ease 200ms;
    font-family: 'hel-r';
  }
  .flex-container {
    width: 513px;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 35px;
  }
  .nowrap  {
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  .flex-item {
    color: #5d6d94;
    font-size: 14px;
    text-align: center;
    font-family: 'hel-l';
  }

  .flex-item:first-child {
    text-align: left;
  }
  
  .flex-item:last-child {
    text-align: right;
  }


/*  @media screen and (max-width: 780px) {
    .slider-container {
      width: 80vw!important;
    }
    .flex-container {
      width: 80vw!important;
    }
  }*/

</style>
