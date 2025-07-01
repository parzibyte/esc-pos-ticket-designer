<script setup lang="ts">
import GuiaVideoYouTube from '@/components/GuiaVideoYouTube.vue';

</script>

<template>
    <div class="p-2">
        <p class="text-xl">{{ $t("help.title") }}</p>
        <ol class="list-inside list-decimal">
            <li>{{ $t("help.followFirstSteps") }}</li>
            <li>
                <strong>{{ $t("help.checkYoutubeTutorials") }}:</strong>
                <a class="text-sky-500 hover:text-sky-400 font-semibold" target="_blank"
                    href="https://www.youtube.com/playlist?list=PLat1rFhO_zZiFR2CdNJWkcCcRKO0sYQVL">
                    https://www.youtube.com/playlist?list=PLat1rFhO_zZiFR2CdNJWkcCcRKO0sYQVL
                </a>
            </li>
            <li>{{ $t("help.askForAVirtualMeeting") }}
                <a class="text-sky-500 hover:text-sky-400" target="_blank"
                    href="https://parzibyte.me/#contacto">https://parzibyte.me/#contacto</a>

            </li>
        </ol>
        <GuiaVideoYouTube></GuiaVideoYouTube>
    </div>
</template>