<script setup lang="ts">
import { ref } from "vue";
const plataformasConCostos = [
    { nombre: "Android", costo: 140, },
    { nombre: "Desktop", costo: 140, }
];
const quiereVerPrecios = ref(false);
const quiereContactarme = ref(false);
</script>
<template>
    <div class="flex flex-col bg-white p-2 m-2 break-words">
        <p class="text-black text-6xl font-bold">{{ $t("removeFooter.getALicense") }}</p>
        <p class="text-4xl">{{ $t("removeFooter.hopeDesignerIsUseful") }}</p>
        <div class="overflow-x-auto mt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="px-6 py-3">
                            {{ $t("removeFooter.platform") }}
                        </th>
                        <th class="px-6 py-3">
                            {{ $t("removeFooter.monthlyPrice") }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plataforma in plataformasConCostos" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ plataforma.nombre }}
                        </th>
                        <td class="px-6 py-4">
                            {{ plataforma.costo }} {{ $t("removeFooter.mexicanPeso") }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ol class="list-inside list-decimal">
            <li>{{ $t("removeFooter.pricesAreMonthly") }}</li>
            <li>{{ $t("removeFooter.licenseOnlyRemovesFooter") }}</li>
        </ol>
        <div class="flex flex-row">
            <button @click="quiereVerPrecios = !quiereVerPrecios"
                class="bg-green-500 max-w-fit p-2 text-white font-semibold rounded-md text-xl m-2">{{ !quiereVerPrecios ?
                    $t("removeFooter.wantToBuy") : $t("removeFooter.hidePaymentMethods") }}
            </button>
            <button @click="quiereContactarme = !quiereContactarme"
                class="bg-sky-500 max-w-fit p-2 text-white font-semibold rounded-md text-xl m-2">{{ quiereContactarme ?
                    $t("removeFooter.hideContact") : $t("removeFooter.wantToGetInTouch") }}</button>
        </div>
        <div v-if="quiereContactarme" class="text-xl bg-yellow-100 p-2 rounded m-2">
            <i18n-t keypath="removeFooter.getInTouch" tag="p">
                <template #webpageLink>
                    <a class="text-sky-500 hover:text-sky-400" href="https://parzibyte.me/#contacto"
                        target="_blank">https://parzibyte.me/#contacto</a>
                </template>
            </i18n-t>
            <p>{{ $t("removeFooter.moreWaysToGetInTouch") }}</p>

        </div>
        <div v-if="quiereVerPrecios" class="text-xl bg-blue-100 p-2 rounded m-2">
            <p>{{ $t("removeFooter.pricesAreInMexicanPesos") }}</p>
            <i18n-t keypath="removeFooter.paymentMethods" tag="p">
                <template #paypalLink>
                    <a class="text-sky-500 hover:text-sky-400" href="https://paypal.me/LuisCabreraBenito"
                        target="_blank">https://paypal.me/LuisCabreraBenito</a>
                </template>
                <template #bankDetails>
                    <ol>
                        <li>{{ $t("removeFooter.myNameIs") }}
                            <pre>{{ $t("removeFooter.fullName") }}</pre>
                        </li>
                        <li>{{ $t("removeFooter.myClabeIs") }}
                            <pre>{{ $t("removeFooter.clabe") }}</pre>
                        </li>
                        <li>{{ $t("removeFooter.myAccountNumberIs") }}
                            <pre>{{ $t("removeFooter.accountNumber") }}</pre>
                        </li>
                        <li>{{ $t("removeFooter.myCardNumberIs") }}
                            <pre>{{ $t("removeFooter.cardNumber") }}</pre>
                        </li>
                    </ol>
                </template>
            </i18n-t>
        </div>

        <h1 class="text-3xl">{{ $t("removeFooter.faq") }}</h1>
        <ol class="list-inside list-decimal">
            <li
                v-for="question in ['paymentDone', 'bothPlatforms', 'licenseInArchitecture', 'printerLimit', 'whatIsAMonth', 'unlimitedLicense', 'expiredLicense', 'renewLicense', 'shareLicense']">
                <span>
                    <strong>{{ $t("removeFooter.faqList." + question + ".question") }}</strong>
                    {{ $t("removeFooter.faqList." + question + ".answer") }}
                </span>
            </li>
            <li>
                <span>
                    <strong> {{ $t("removeFooter.faqList.sourceCode.question") }} </strong>
                </span>
                <i18n-t keypath="removeFooter.faqList.sourceCode.answer">
                    <template #designerCodeLink>
                        <a class="text-sky-500 font-bold hover:text-sky-400"
                            href="https://github.com/parzibyte/esc-pos-ticket-designer/"
                            target="_blank">https://github.com/parzibyte/esc-pos-ticket-designer/</a>
                    </template>
                    <template #version1PluginCode>
                        <a class="text-sky-500 font-bold hover:text-sky-400" target="_blank"
                            href="https://parzibyte.me/blog/2022/10/04/codigo-fuente-plugin-impresora-termica-v1/">https://parzibyte.me/blog/2022/10/04/codigo-fuente-plugin-impresora-termica-v1/</a>
                    </template>
                    <template #version2PluginCode>
                        <a class="text-sky-500 font-bold hover:text-sky-400" target="_blank"
                            href="https://parzibyte.me/blog/2022/10/05/codigo-fuente-plugin-impresoras-termicas-v2/">https://parzibyte.me/blog/2022/10/05/codigo-fuente-plugin-impresoras-termicas-v2/</a>
                    </template>
                </i18n-t>

            </li>
        </ol>
    </div>
</template>