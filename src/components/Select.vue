<script setup lang="ts">
import { ref, onBeforeMount, watch, defineProps, withDefaults, computed, defineExpose } from "vue"
import type { Ref } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import Backspace from 'vue-material-design-icons/Backspace.vue';

type MyComponentProps<T> = {
    label: string;
    displayItemFunction: (item: T) => string;
    modelValue: T;
    items: T[];
    filterFunction: (criteria: string, items: T[]) => T[];

};
const props = withDefaults(defineProps<MyComponentProps<any>>(), {
    label: "Select an option",
    displayItemFunction: (item: any) => {
        return item.toString();
    },
    filterFunction: (criteria: string, items: MyComponentProps<any>["modelValue"][]) => {
        const expresion = new RegExp(`${criteria}.*`, "i");
        return items.filter((opcion: MyComponentProps<any>["modelValue"]) => {
            return expresion.test(opcion);
        });
    }
});
const emit = defineEmits(['update:modelValue', "change"])
const selectedItem = computed<MyComponentProps<any>["modelValue"]>({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const filteredItems: Ref<Array<MyComponentProps<any>["modelValue"]>> = ref([]);
const inputValue: Ref<string> = ref("");
const shouldShowItems: Ref<boolean> = ref(false);
const isInputFocused: Ref<boolean> = ref(false);
const input: Ref<any> = ref(null);
const keyboardIndex: Ref<number> = ref(-1);

watch(shouldShowItems, (newValue, previousValue) => {
    if (newValue) {
        filterItems();
    }
})

onBeforeMount(() => {
    filteredItems.value = props.items;
})

const onItemSelected = (item: MyComponentProps<any>["modelValue"]) => {
    selectedItem.value = item;
    shouldShowItems.value = false;
    inputValue.value = props.displayItemFunction(item);
    keyboardIndex.value = -1;
    emit("change", item);
}

const onKeyup = (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowDown":
            if (keyboardIndex.value < filteredItems.value.length - 1) {
                keyboardIndex.value++;
            } else {
                keyboardIndex.value = 0;
            }
            shouldShowItems.value = true;
            break;
        case "ArrowUp":
            if (keyboardIndex.value > 0) {
                keyboardIndex.value--;
            } else {
                keyboardIndex.value = filteredItems.value.length - 1;
            }
            break;
        case "Enter":
            if (keyboardIndex.value >= 0 && keyboardIndex.value < filteredItems.value.length) {
                onItemSelected(filteredItems.value[keyboardIndex.value])
            }
            break;
        default:
            filterItems();
    }
}

const filterItems = () => {
    filteredItems.value = props.filterFunction(inputValue.value, props.items);
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

const clearSelectedItem = (showItems: boolean, focus: boolean) => {
    selectedItem.value = null;
    inputValue.value = "";
    if (showItems) {
        shouldShowItems.value = true;
    }
    if (focus) {
        input.value.focus();
    }
    filterItems();
}
defineExpose({ clearSelectedItem });
</script>
<template>
    <div class="flex flex-col">
        <strong class="text-xl font-semibold">{{ label }}</strong>
        <div class="flex flex-col relative">
            <div class="flex">
                <input ref="input" @focus="onInputFocus" @blur="onInputBlur" @keyup="onKeyup" @click="onInputClick"
                    v-model="inputValue" placeholder="Selecciona una opción" type="input"
                    class="focus:outline-none text-xl w-full h-10 border border-l-gray-200 border-t-gray-200 border-b-gray-200 border-r-0 rounded-tl-md p-2 focus:border-2 focus:border-l-blue-500  focus:border-t-blue-500  focus:border-b-blue-500 focus:border-r-0">
                <button v-if="shouldShowClearButton()" @click="clearSelectedItem(true, true)"
                    class="focus:outline-none p-1 bg-white  border border-l-0 border-r-0 border-t-gray-200 border-b-gray-200 ">
                    <Backspace />
                </button>
                <button @click="shouldShowItems = !shouldShowItems"
                    class="focus:outline-none p-1 bg-white  rounded-tr-md border-b-gray-200 border border-l-0 border-r-gray-200 border-t-gray-200">
                    <ChevronDown v-if="!shouldShowItems" />
                    <ChevronUp v-if="shouldShowItems" />
                </button>
            </div>
            <Transition>
                <div class="w-full border border-gray-200 border-t-0 absolute mt-10 z-10" v-show="shouldShowItems">
                    <div @click="onItemSelected(opcion)" v-for="(opcion, index) in filteredItems"
                        class="p-2  hover:bg-zinc-200 hover:cursor-pointer "
                        :class="{ 'bg-zinc-200': index === keyboardIndex, 'bg-white': index !== keyboardIndex }">
                        <slot :item="opcion" :index="index" name="item">
                            {{ opcion }}
                        </slot>
                    </div>
                </div>
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