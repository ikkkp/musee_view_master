<template>
    <v-avatar size="36px">
        <v-img v-if="message.avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>
        <v-icon v-else :color="message.color" :icon="message.icon"></v-icon>
    </v-avatar>
</template>
  
<script>

</script>