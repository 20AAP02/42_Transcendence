<template>
  <v-expansion-panel title="Friends">
    <v-expansion-panel-text class="friends">
      <div class="friends d-flex flex-wrap">
        <v-card
          v-for="friend in friends"
          :key="friend.id"
          class="ma-2 w-25 d-flex flex-column flex-sm-row align-center friends__card"
          :height="smAndUp ? '60px' : '75%'"
          target="_"
          :href="`/users/${friend.username}`"
          :title="friend.username"
        >
          <template v-slot:prepend>
            <v-avatar size="45px" class="mx-2">
              <v-img
                :src="avatar(friend.avatar, friend.id)"
                @error="pictureErr.push(friend.id)"
                alt="friend avatar"
                cover
              />
            </v-avatar>
          </template>
          <template v-slot:append v-if="isSelf">
            <v-tooltip
              location="top"
              text="Remove friend"
              :attach="false"
              content-class="mb-n4 mt-3 text-caption py-0 px-1 ml-2"
            >
              <template v-slot:activator="{ props }">
                <v-icon
                  @click.prevent="
                    $emit('friendRequest', 'remove-friend', friend.id)
                  "
                  v-bind="props"
                  class="friends__card__icon"
                  >mdi-account-minus</v-icon
                >
              </template>
            </v-tooltip>
          </template>
        </v-card>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const props = defineProps(["account", "isSelf"]);
defineEmits(["friendRequest"]);
const { smAndUp } = useDisplay();

const friends = props.account?.friends || [];
const pictureErr = ref<string[]>([]);
const defaultPicture =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";

const avatar = (source: string, id: string) => {
  if (pictureErr.value.includes(id)) return defaultPicture;
  return source.length && source !== "#" ? source : defaultPicture;
};
</script>

<style lang="scss">
.friends {
  &__card {
    // max-width: 200px !important;
    width: 275px !important;
    background-color: rgb(var(--v-theme-code));
    &__icon:hover {
      color: #c62828;
    }
    & .v-card-item {
      width: inherit;
    }
    & .v-card-title {
      overflow-x: hidden;
    }
  }
}

.stats {
  &__card {
    min-width: fit-content !important;
    background-color: rgb(var(--v-theme-code));
  }
}
</style>
