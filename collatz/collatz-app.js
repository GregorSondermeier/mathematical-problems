const infiniteLoopPreventionThreshold = 100;

const getSequence = (sequence) => {
  const numberOfSteps = sequence.length - 1;

  const currentTerm = sequence[numberOfSteps];
  if (currentTerm === 1) {
    return sequence;
  }

  let isCancelled = false;
  if (numberOfSteps > 0 && numberOfSteps % infiniteLoopPreventionThreshold === 0) {
    isCancelled = !window.confirm(`Reached ${numberOfSteps} steps.\n\nCurrent Term: ${currentTerm}\n\nContinue?`);
  }

  if (isCancelled) {
    return sequence;
  }
  const nextTerm = getNextTerm(currentTerm);
  return getSequence([...sequence, nextTerm]);
}

const getNextTerm = (number) => {
  if (isOdd(number)) {
    return number * 3 + 1
  }
  return number / 2;
}

const isOdd = (number) => (number % 2) === 1;
const isEven = (number) => !isOdd(number);

const collatzApp = Vue.createApp({
  data() {
    return {
      startValue: 8,
      sequence: undefined,
    };
  },

  computed: {
    numberOfSteps() {
      if (this.sequence) {
        return this.sequence.length - 1;
      }
      return 0;
    },
    sequenceFormatted() {
      if (this.sequence) {
        return this.sequence.join(', ');
      }
      return '';
    }
  },

  methods: {
    calculate(startValue) {
      this.sequence = getSequence([startValue]);
    }
  },

  template: `
    <form v-on:submit.prevent="calculate(startValue)">
      <label>
        Start Value:<br />
        <input
          type="number"
          min="0"
          v-model="startValue"
        />
      </label>
      
      <button type="submit">
        Calculate!
      </button>
    </form>
    
    <template v-if="sequence">
      <h2>Sequence</h2>
      <p>Took {{numberOfSteps}} steps.</p>
      <p>{{sequenceFormatted}}</p>
    </template>
  `,
});

const vm = collatzApp.mount('#collatz-app');