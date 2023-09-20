<script setup lang="ts">
import { ref, onBeforeMount, watch, defineProps, withDefaults } from "vue"
import type { Ref } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import Backspace from 'vue-material-design-icons/Backspace.vue';

const props = withDefaults(defineProps<{
    label: string,
    displayItemFunction: (item: any) => string,
}>(), {
    label: "Select an option",
    displayItemFunction: (item: any) => {
        return item.toString();
    },
});

const items: Ref<Array<string>> = ref(["Imagen", "Iniciar", "Descargar imagen e imprimir", "Corte", "CorteParcial", "Imprimir imagen local", "Imagen en base64"]);
const filteredItems: Ref<Array<string>> = ref([]);
const inputValue: Ref<string> = ref("");
const shouldShowItems: Ref<boolean> = ref(false);
const isInputFocused: Ref<boolean> = ref(false);
const selectedItem: Ref<any> = ref(null);
const input: Ref<any> = ref(null);
const keyboardIndex: Ref<number> = ref(-1);

watch(shouldShowItems, (newValue, previousValue) => {
    if (newValue) {
        filterItems();
    }
})

onBeforeMount(() => {
    filteredItems.value = items.value;
})

const onItemSelected = (item: any) => {
    selectedItem.value = item;
    console.log({ opcion: item });
    shouldShowItems.value = false;
    inputValue.value = props.displayItemFunction(item);
    keyboardIndex.value = -1;
}

const onKeyup = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
        if (keyboardIndex.value < filteredItems.value.length - 1) {
            keyboardIndex.value++;
        } else {
            keyboardIndex.value = 0;
        }
        shouldShowItems.value = true;
    }
    if (event.key === "ArrowUp") {
        if (keyboardIndex.value > 0) {
            keyboardIndex.value--;
        } else {
            keyboardIndex.value = filteredItems.value.length - 1;
        }
    }
    if (event.key === "Enter") {
        if (keyboardIndex.value >= 0 && keyboardIndex.value < filteredItems.value.length)
            onItemSelected(filteredItems.value[keyboardIndex.value])
    }
    selectedItem.value = null;
    filterItems();
}

const filterItems = () => {
    filteredItems.value = filterFunction(inputValue.value, items.value);
}

const onInputClick = () => {
    shouldShowItems.value = true;
}

const onInputFocus = () => {
    isInputFocused.value = true;
}

const onInputBlur = () => {
    isInputFocused.value = false;
}

const shouldShowClearButton = () => {
    return (inputValue.value);
}

const clearSelectedItem = () => {
    selectedItem.value = null;
    inputValue.value = "";
    shouldShowItems.value = true;
    input.value.focus();
    filterItems();
}


const filterFunction = (criteria: string, items: any[]) => {
    const expresion = new RegExp(`${criteria}.*`, "i");
    return items.filter((opcion: any) => {
        return expresion.test(opcion);
    });
}
</script>
<template>
    <div class="flex flex-col">
        <strong>{{ label }}</strong>
        <div class="flex flex-col relative">
            <div class="flex">
                <input ref="input" @focus="onInputFocus" @blur="onInputBlur" @keyup="onKeyup" @click="onInputClick"
                    v-model="inputValue" placeholder="Selecciona una opción" type="input"
                    class="focus:outline-none w-full h-10 border border-l-emerald-200 border-t-emerald-200 border-b-emerald-200 border-r-0 rounded-tl-md p-2">
                <button v-if="shouldShowClearButton()" @click="clearSelectedItem"
                    class="focus:outline-none p-1 bg-white text-zinc-200 border border-l-0 border-r-0 border-t-emerald-200 border-b-emerald-200 ">
                    <Backspace />
                </button>
                <button @click="shouldShowItems = !shouldShowItems"
                    class="focus:outline-none p-1 bg-white text-zinc-200 rounded-tr-md border-b-emerald-200 border border-l-0 border-r-emerald-200 border-t-emerald-200">
                    <ChevronDown v-if="!shouldShowItems" />
                    <ChevronUp v-if="shouldShowItems" />
                </button>
            </div>
            <Transition>
                <ul class="w-full border border-emerald-200 border-t-0 absolute mt-10 z-10" v-show="shouldShowItems">
                    <li @click="onItemSelected(opcion)" v-for="(opcion, index) in filteredItems"
                        class="p-2  hover:bg-zinc-200 hover:cursor-pointer "
                        :class="{ 'bg-zinc-200': index === keyboardIndex, 'bg-white': index !== keyboardIndex }">
                        <slot :item="opcion" :index="index" name="item">
                            {{ opcion }}
                        </slot>
                    </li>
                </ul>
            </Transition>
        </div>
    </div>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>