<script setup lang="ts">
import { ref } from 'vue'
import FeatherIcon from '@/components/FeatherIcon.vue'

const inputValue = ref('')
const patronBarcode = ref('')
const itemBarcodes = ref<string[]>([])
const error = ref('')

function handleSubmit() {
  if (inputValue.value) {
    // If there's no patron barcode scan and set this value first
    if (!patronBarcode.value) patronBarcode.value = inputValue.value
    // Else add new item to start of the barcodes array
    else itemBarcodes.value.splice(0, 0, inputValue.value)

    inputValue.value = ''
  }
}

function resetCheckout() {
  inputValue.value = ''
  patronBarcode.value = ''
  itemBarcodes.value = []
  error.value = ''
}

function removeItem(index: number) {
  error.value = ''
  itemBarcodes.value.splice(index, 1)
}

function submitCheckout() {
  const url = `/api/checkouts`

  async function postCheckout() {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        patronBarcode: patronBarcode.value,
        itemBarcodes: itemBarcodes.value,
      }),
    })

    const json = await res.json()

    if (!json.success) {
      // TODO: Improve error handling
      error.value = 'Unable to save checkout. Try again'
    } else {
      resetCheckout()
    }
  }

  postCheckout()
}
</script>

<template>
  <div class="container">
    <!-- Check out form section -->
    <section class="form-section">
      <form @submit.prevent="handleSubmit">
        <fieldset>
          <label for="barcode">{{ !patronBarcode ? 'Patron' : 'Item' }} Barcode</label>
          <input
            type="text"
            name="barcode"
            v-model="inputValue"
            autocomplete="off"
            minlength="1"
            maxlength="14"
            autofocus
            required
          />
        </fieldset>
      </form>
      <button
        :class="{ 'hidden-element': !patronBarcode, 'reset-button': true }"
        @click="resetCheckout"
      >
        <FeatherIcon icon="refresh-cw" />
        <span>Reset</span>
      </button>
    </section>

    <!-- Current checkout sidebar -->
    <section :class="{ 'checkout-section': true, 'hidden-element': !patronBarcode }">
      <div class="checkout-section-header">
        <h3>Current Checkout</h3>
        <div>
          Patron Barcode: <span>{{ patronBarcode }}</span>
        </div>
      </div>
      <div>
        <div v-for="(item, index) in itemBarcodes" :key="item">
          <div class="item-barcode">
            <button @click="() => removeItem(index)"><FeatherIcon icon="x" /></button>
            <span>
              {{ item }}
            </span>
          </div>
        </div>
      </div>
      <div class="button-container">
        <button
          v-if="itemBarcodes.length > 0 && patronBarcode"
          @click="submitCheckout"
          class="submit-button"
        >
          Submit checkout
        </button>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </section>
  </div>
</template>

<style lang="css" scoped>
.container {
  --sidebar-width: 25dvw;
  display: flex;
  position: absolute;
  top: 3.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
}

/* UI layout */

.form-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  /* background-color: rebeccapurple; */
  width: calc(100dvw - var(--sidebar-width));
}

.form-section:has(+ .checkout-section.hidden-element) {
  width: 100dvw;
}

.checkout-section.hidden-element {
  display: flex;
}

.checkout-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 1rem;

  overflow-y: scroll;

  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: var(--sidebar-width);
  margin: 0.75rem;
  margin-top: 0;
  border-radius: 10px;

  background-color: var(--clr-main-800);

  @media (prefers-color-scheme: light) {
    background-color: var(--clr-main-200);
  }
}

section {
  transition: all 200ms ease-in-out;
}

/* Checkout UI Elements */

.reset-button {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkout-section-header,
.button-container {
  padding: 0.5rem;
  background-color: inherit;
}

.checkout-section-header {
  position: sticky;
  top: 0;
}

.button-container {
  margin-top: auto;
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
}

.item-barcode {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.item-barcode > button {
  padding: 0.25rem;
}

.item-barcode svg {
  height: 14px;
  width: 14px;
}

.hidden-element {
  opacity: 0;
  display: none;
}

.error-message {
  width: 100%;
  text-align: center;
  color: var(--c-danger);
  font-size: 0.75rem;
  font-style: italic;
}
</style>
