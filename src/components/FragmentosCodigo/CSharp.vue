<script lang="ts" setup>
import BloqueDeCodigo from './BloqueDeCodigo.vue';

type Propiedades = {
    json: string,
    diseño: object,
    payloadEscapado: string,
};
const propiedades = withDefaults(defineProps<Propiedades>(), {
    json: "",
    diseño: () => {
        return {};
    },
})
</script>
<template>
    Importa los paquetes:
    <BloqueDeCodigo><template #default>using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
</template>
    </BloqueDeCodigo>


    Define la función <strong><code>Imprimir</code></strong>:
<BloqueDeCodigo>
    <template #codigo>

    </template>
</BloqueDeCodigo>

    <pre class="bg-gray-200 overflow-x-auto p-4 break-all whitespace-pre-wrap rounded-md">public class ResultadoAlImprimir
{
    public bool EsExitoso { get; set; }
    public string Mensaje { get; set; }

    public override string ToString()
    {
        return "Exitoso: " + EsExitoso + " Mensaje: " + Mensaje;
    }
};
public static async Task&lt;ResultadoAlImprimir&gt; Imprimir()
{

    var payload = "{{ payloadEscapado }}";
    try
    {
        using (HttpClient client = new HttpClient())
        {
            StringContent content = new StringContent(payload, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync("{{ diseño.ruta_api }}/imprimir", content);
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
}</pre>

    <p>Después, invoca a la función. Recuerda agregar <code>Async</code> a la función desde donde la invoques. Ejemplo:</p>
    <pre>static async Task Main(string[] args)
{
    var resultado = await Imprimir();
    if (resultado.EsExitoso)
    {
        Console.WriteLine("Todo bien");
    }
    else
    {
        Console.WriteLine("Error: " + resultado.Mensaje);
    }

    Console.ReadLine();
}</pre>
</template>