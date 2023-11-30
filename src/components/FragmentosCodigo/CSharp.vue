<script lang="ts" setup>
import { computed } from 'vue';
import BloqueDeCodigo from './BloqueDeCodigo.vue';
import type { PropiedadesParaFragmentoDeCodigo } from '@/types/Tipos';
const propiedades = withDefaults(defineProps<PropiedadesParaFragmentoDeCodigo>(), {
    json: () => {
        return {
            nombreImpresora: "",
            serial: "",
            operaciones: [],
        };
    },
    diseño: () => {
        return {
            ruta_api: "",
            id: 0,
            licencia: "",
            plataforma: "",
            impresora: "",
            id_plataforma: 0,
            nombre: "",
            fecha_modificacion: 0,
        };
    },
})
const bloques = computed(() => {
    return {
        "imports": `using System.Net.Http;
using System.Text;
using System.Threading.Tasks;`,
        "funcion": `public class ResultadoAlImprimir
{
    public bool EsExitoso { get; set; }
    public string Mensaje { get; set; }

    public override string ToString()
    {
        return "Exitoso: " + EsExitoso + " Mensaje: " + Mensaje;
    }
};
public static async Task<ResultadoAlImprimir> Imprimir()
{

    var payload = "${propiedades.payloadEscapado}";
    try
    {
        using (HttpClient client = new HttpClient())
        {
            StringContent content = new StringContent(payload, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync("${propiedades.diseño.ruta_api}/imprimir", content);
            string responseString = await response.Content.ReadAsStringAsync();
            if (bool.TryParse(responseString, out bool exitoso))
            {
                return new ResultadoAlImprimir { EsExitoso = exitoso, Mensaje = "OK" };
            }
            else
            {
                return new ResultadoAlImprimir { EsExitoso = exitoso, Mensaje = responseString };
            }
        }
    }
    catch (Exception e)
    {
        Console.WriteLine("Error haciendo petición al plugin. ¿El plugin se está ejecutando y ha comprobado el puerto? el error es: " + e.ToString());
        return new ResultadoAlImprimir { EsExitoso = false, Mensaje = e.Message };
    }
}`,
        "invocacion": `static async Task Main(string[] args)
{
    var resultado = await Imprimir();
    if (resultado.EsExitoso)
    {
        Console.WriteLine("Todo bien");
    }
    else
    {
        Console.WriteLine("Error con el plugin: " + resultado.Mensaje);
    }

    Console.ReadLine();
}`,
    }
});
</script>
<template>
    Importa los paquetes:
    <BloqueDeCodigo :codigo="bloques.imports"></BloqueDeCodigo>
    Define la función <strong><code>Imprimir</code></strong>:
    <BloqueDeCodigo :codigo="bloques.funcion"></BloqueDeCodigo>
    <p>Después, invoca a la función. Recuerda agregar <code>Async</code> a la función desde donde la invoques. Ejemplo:</p>
    <BloqueDeCodigo :codigo="bloques.invocacion"></BloqueDeCodigo>
</template>