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
        <p class="text-black text-6xl font-bold">Consigue una licencia y apoya al desarrollo</p>
        <p class="text-4xl">Hola. Espero que mi diseñador te esté siendo útil. Si quieres quitar el pie de página de todos
            los tickets puedes
            comprar una licencia</p>
        <div class="overflow-x-auto mt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="px-6 py-3">
                            Plataforma
                        </th>
                        <th class="px-6 py-3">
                            Precio mensual
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="plataforma in plataformasConCostos" class="bg-white border-b">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ plataforma.nombre }}
                        </th>
                        <td class="px-6 py-4">
                            {{ plataforma.costo }} MXN (Pesos mexicanos)
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ol class="list-inside list-decimal">
            <li>Los precios son mensuales, cubren un período de 30 días</li>
            <li>La licencia solo remueve el pie de página. Tenerla o no tenerla no afecta en nada al funcionamiento. Si el
                diseñador no sirve en cierto lugar, tampoco lo hará con la licencia</li>
        </ol>
        <div class="flex flex-row">
            <button @click="quiereVerPrecios = !quiereVerPrecios"
                class="bg-green-500 max-w-fit p-2 text-white font-semibold rounded-md text-xl m-2">{{ !quiereVerPrecios ?
                    'Quiero comprar una licencia' : 'Ocultar métodos de pago' }}
            </button>
            <button @click="quiereContactarme = !quiereContactarme"
                class="bg-sky-500 max-w-fit p-2 text-white font-semibold rounded-md text-xl m-2">{{ quiereContactarme ?
                    'Ocultar contacto' : 'Primero quiero contactarte' }}</button>
        </div>
        <div v-if="quiereContactarme" class="text-xl bg-yellow-100 p-2 rounded m-2">
            <p>
                La forma más segura de contactarte conmigo es a través de <a class="text-sky-500 hover:text-sky-400"
                    href="https://parzibyte.me/#contacto">mi página
                    web</a>

            </p>
            <p>También puedes enviarme un correo en parzibyte arroba gmail punto com <br>y en Telegram me encuentras como
                parzibyte</p>

        </div>
        <div v-if="quiereVerPrecios" class="text-xl bg-blue-100 p-2 rounded m-2">
            <p>
                Los costos están especificados en MXN, es decir, pesos mexicanos. Usted siempre puede usar un conversor en
                línea
                si su moneda no es pesos mexicanos, solo asegúrese de enviar el monto exacto.
            </p>
            <p>
                Actualmente acepto Paypal y transferencia bancaria. Para hacer el pago en
                <strong>Paypal</strong> por favor siga el siguiente enlace:
                <a class="text-blue-500 hover:text-blue-400" target="_blank"
                    href="https://paypal.me/LuisCabreraBenito">https://paypal.me/LuisCabreraBenito</a>
            </p>
            <p>
                En caso de que usted se encuentre dentro de México y pueda hacer la
                <strong>transferencia bancaria</strong>, a continuación los datos de pago:
            </p>
            <ol>
                <li>Mi nombre es
                    <pre>Luis Cabrera Benito</pre>
                </li>
                <li>
                    Mi número de cuenta CLABE para transferencias interbancarias es:
                    <pre>1271 8001 6673 3458 66</pre>

                </li>
                <li>

                    Mi número de cuenta para transferencias en banco azteca es:
                    <pre>9546 1667 3345 86</pre>

                </li>
                <li>
                    Mi número de tarjeta para envíos desde otros bancos es:
                    <pre>4198 2101 6489 6028</pre>
                </li>
            </ol>



            Si me lo pregunta, prefiero la transferencia bancaria, pero el método de pago no afecta de ninguna manera a la
            licencia
        </div>
        <h1 class="text-3xl">Preguntas frecuentes</h1>
        <ol class="list-inside list-decimal">
            <li><strong>¿Qué pasa cuando hago el pago?</strong> Una vez que usted me confirme el pago y la versión del
                plugin, yo le enviaré
                su
                licencia en un plazo de hasta 24 horas (normalmente es mucho menos). La licencia es una cadena de caracteres
                que usted debe colocar en el mismo diseñador dentro de
                <strong>Plataformas</strong> en <strong>Serial</strong>. Tome en cuenta que el plazo de la licencia empezará
                a
                contar el día que usted haga el pago. Si usted quiere que el plazo comience a contar en otra fecha, avíseme
                al momento de enviarme el comprobante de pago
            </li>
            <li><strong>¿Puedo tener licencia para ambas plataformas?</strong> Claro, las licencias se manejan
                individualmente, así que
                usted
                puede tener una para Android y otra para Desktop.</li>
            <li>
                <strong>
                    ¿La licencia funcionará en X lugar con X arquitectura?
                </strong>
                Lo que yo recomiendo es que usted pruebe el diseñador
                en todos los lugares donde usted vaya a usarlo más adelante. Donde sea que el diseñador funcione sin
                licencia,
                funcionará con licencia. Si el diseñador no funciona, entonces la licencia no hará que funcione. Una vez
                enviada la licencia,
                no se puede hacer el reembolso, por ello es que recomiendo que pruebe todo sin licencia
            </li>
            <li>
                <strong>
                    ¿Hay límite de impresoras o tickets?
                </strong> No, el único límite es el mes de la licencia. Mientras el plazo de su
                licencia sea válido, puede usarlo infinitamente en cualquier dispositivo e impresora, sin límite de tickets
                ni contenido.
            </li>
            <li>
                <strong>
                    ¿Qué es "un mes"?
                </strong>
                Para estos casos, un mes se define como un período de 30 días
            </li>
            <li>
                <strong>
                    ¿Puedo contratar una licencia ilimitada?
                </strong>
                Técnicamente hablando: no; pero no hay límite en los meses que
                usted puede contratar. Por ejemplo, puede contratar una licencia de 10, 100 o más meses. En ese caso solo
                multiplique el costo de la licencia mensual por el número de meses que quiere contratar, y recuerde, usted
                siempre puede probar con un mes y si le funciona puede contratar más meses
            </li>
            <li><strong>¿Puedo comprar el código fuente? </strong>Si se refiere al código fuente del diseñador, el mismo es
                open source: <a class="text-sky-500 font-bold hover:text-sky-400"
                    href="https://github.com/parzibyte/esc-pos-ticket-designer/">https://github.com/parzibyte/esc-pos-ticket-designer/</a>.
                Si, por otro lado, se refiere al código fuente de los plugins: el código fuente de las últimas versiones no
                está
                disponible,
                solo lo está el de la versión Desktop 1
                <a class="text-sky-500 font-bold hover:text-sky-400"
                    href="https://parzibyte.me/blog/2022/10/04/codigo-fuente-plugin-impresora-termica-v1/">https://parzibyte.me/blog/2022/10/04/codigo-fuente-plugin-impresora-termica-v1/</a>
                y 2
                <a class="text-sky-500 font-bold hover:text-sky-400"
                    href="https://parzibyte.me/blog/2022/10/05/codigo-fuente-plugin-impresoras-termicas-v2/">https://parzibyte.me/blog/2022/10/05/codigo-fuente-plugin-impresoras-termicas-v2/</a>
            </li>
            <li>
                <strong>¿Qué pasa cuando se vence la licencia?</strong> El pie del ticket volverá a aparecer. Funcionará
                como cuando no
                tenía licencia, pero no dejará de funcionar
            </li>
            <li><strong>¿Debo colocar otra licencia cuando la anterior se venza?</strong> Sí, debido a que el plugin no
                necesita conexión a
                internet, usted debe actualizar la licencia cuando la anterior se venza. </li>
            <li><strong>¿Qué pasa con la compartición de licencias?</strong> Usted puede usar la licencia individualmente
                sin límites, pero no puede
                compartirla con externos. De hacerlo, su licencia será removida y el pago no será reembolsado. Recuerde leer
                las condiciones.
            </li>
        </ol>
    </div>
</template>