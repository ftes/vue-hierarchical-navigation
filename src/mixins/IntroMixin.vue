<script>
import { introJs } from 'intro.js'

const introCompleted = () => window.localStorage.getItem('introCompleted')
const setIntroCompleted = () => window.localStorage.setItem('introCompleted', true)

const configurations = {
  'cart.list': intro => {
    intro.setOptions({
      doneLabel: 'Next page',
      steps: [{
        intro: 'Welcome to the hierarchical navigation demo. You can use the arrow keys to navigate this demo.'
      }, {
        element: '#step2-4',
        intro: 'Here is a list of shopping carts.'
      }, {
        element: '#step2-4',
        intro: 'You can sort the table.'
      }, {
        element: '#step2-4',
        intro: 'Notice that "Wooden" is now the top entry.',
        position: 'top'
      }, {
        element: '#step2-4',
        intro: 'Let us take a closer look.',
        position: 'top'
      }]
    }).oncomplete(() => document.querySelector('td a').click())
    .onafterchange(function () {
      if (this._currentStep === 3) {
        document.querySelector('#nameHeader').click()
      }
    })
  },

  'cart.details': intro => {
    intro.setOptions({
      steps: [{
        element: '#step5',
        intro: 'Notice the paging and sorting information in the breadcrumbs.'
      }, {
        element: '#step6',
        intro: 'Navigate between carts in the order you chose in the list. You can also use the arrow keys for this.'
      }, {
        element: '#step6',
        intro: 'Let us navigate to the next cart.'
      }, {
        element: '#step7',
        intro: 'We have navigated to the next cart, sorted by descending name.'
      }, {
        intro: 'Try drilling deeper and navigating via breadcrumbs, arrow keys and the back button.'
      }]
    }).onafterchange(function () {
      if (this._currentStep === 3) {
        document.querySelector('#next').click()
      }
    })
    .oncomplete(() => {
      window.introActive = false
      setIntroCompleted()
    })
    window.introActive = true
  }
}

export default {
  mounted () {
    if (!introCompleted()) {
      const intro = introJs()
      configurations[this.$route.name](intro)
      intro.start()
    }
  }
}
</script>
