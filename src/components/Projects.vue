<template>
	<transition
    v-on:enter="onEnter"
    v-on:leave="onLeave">
    <div class="projects" ref="projectsContainer">
       
       <prev-work></prev-work>

       <router-link 
         class="current-work" 
         :to="{ name: 'project', params: { project_name: getProjects[getCurrentWork].slug } }"
         ref="workDropZone">

         <!-- <div class="current-work__bg" :style="{ 'background-image': 'url(../static/'+ getProjects[getCurrentWork].media_home +')' }" ref="workBg"></div> -->

         <div class="current-work__bg" ref="workBg"></div>
         <div class="current-work__drop-cover" ref="workDropCover">
           <p>Drop it like it's hot</p>
         </div>

         <div class="current-work__datas">
           <h1>{{ getProjects[getCurrentWork].name }}</h1>
           <p class="link"><img src="../assets/images/line.png" class="line before"/>Discover <img src="../assets/images/line.png" class="line after"/></p>
         </div>
       </router-link>

       <next-work></next-work>

     </div> 
  </transition>
</template>

<script>
  import PrevWork from '../components/PrevWork'
  import NextWork from '../components/NextWork'
  import Draggable from '../../node_modules/gsap/src/minified/utils/Draggable.min.js'
  import { TweenLite, TimelineLite } from 'gsap'
  import $ from 'jquery'
  import '../../node_modules/jquery.ripples/dist/jquery.ripples.js'

  import { mapGetters } from 'vuex'

  export default {
    name: 'projects-slider',
    components: {
      PrevWork,
      NextWork
    },
    data () {
      return {
        screenWidth: 0,
        projectWidth: window.innerWidth / 2
      }
    },
    mounted () {
      var that = this

      this.$store.commit('SET_PAGE', 'home')
      this.$store.commit('CHANGE_INDICATORS_STATE', false)

      $('.current-work__bg').ripples({
        imageUrl: '../static/' + this.getProjects[this.getCurrentWork].media_home,
        dropRadius: 30,
        perturbance: 0.015,
        interactive: true,
        crossOrigin: 'anonymous'
      })

      this.$store.commit('SET_PLACEHOLDER', false)
    },
    updated () {
      $('.current-work__bg').ripples('set', 'imageUrl', '../static/' + this.getProjects[this.getCurrentWork].media_home)
      this.$store.commit('SET_PLACEHOLDER', false)
    },
    beforeDestroy () {
      // Hide menu items with the nice animation
      $('.current-work__bg').ripples('destroy')
      this.$store.commit('CHANGE_INDICATORS_STATE', true)
      document.removeEventListener('keyup', function (e) {})
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentWork',
        'getWorkCount',
        'hasPrevWork',
        'hasNextWork',
        'isMenuOpen',
        'webGlContextInitiated'
      ])
    },
    methods: {
      onEnter: function (el, done) {
        var tl = new TimelineLite()
        tl.set(el.querySelector('.current-work__bg'), { opacity: 0 })
        tl.to(el.querySelector('.current-work__bg'), 0.8, { opacity: 1, delay: 0.5 })

        console.log('entered')

        done()
      },
      onLeave: function (el, done) {
        console.log('Leaving')

        done()
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/vars'

  .projects-container
    position: absolute
    display: flex
    align-items: center
    top: 0
    left: 0
    bottom: 0
    overflow: hidden
    white-space: nowrap
    text-align: center
    z-index: 2

  .current-work
    position: absolute
    width: 74%
    height: 70%
    max-height: 670px
    max-width: 1280px
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    text-decoration: none
    overflow: hidden
    z-index: 2
    background-color: $bg-color

    &:hover
      
      .current-work__bg
        // transform: scale(1.05)

      .link

        .before
          transform: translateX(-10px)

        .after
          transform: translateX(10px)

    &.get-dropped

      .current-work__drop-cover
        opacity: 1
        z-index: 4

    &__bg
      width: 100%
      height: 100%
      background-size: cover
      background-position: center center
      transition: transform 1.2s cubic-bezier(0.86, 0, 0.07, 1)
      z-index: 1

      &:before
        position: absolute
        content: ''
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: rgba($bg-color, 1)
        animation: fadeIn .7s ease .7s forwards
        z-index: 2

    &__drop-cover
      position: absolute
      content: ''
      display: flex
      justify-content: center
      align-items: center
      left: 0
      top: 0
      width: 100%
      height: 100%
      background-color: rgba($black, 0.7)
      font-family: 'mohavebold'
      font-size: 20px
      opacity: 0
      z-index: 0
      transition: opacity .3s ease

    &__datas
      position: relative
      margin-top: -140px
      color: $white
      z-index: 3

      h1
        font-size: 55px
        line-height: 55px
        font-family: 'mohavebold'

      .link
        position: relative
        display: inline-block
        margin-top: 10px
        font-size: 18px
        text-decoration: none
        color: $white

        img.line,
          position: absolute
          content: ''
          top: 9px 
          width: calc(210px / 2)
          height: auto
          // height: 1px
          border-radius: 10px
          transition: transform .3s ease
        
          &.before
            left: -120px

          &.after
            left: 80px

  @keyframes fadeIn
    to
      background-color: rgba($black, 0.1)

</style>