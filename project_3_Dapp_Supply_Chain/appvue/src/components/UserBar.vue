<template>
  <div v-if="details.enabled" class="component">
    <v-container>
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-avatar size=110>
            <v-img v-bind:src="getImgUrl(details.avatar)"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title :id="details.id+'-title'" class="title">{{
              details.addr
            }}</v-list-item-title>
            <v-list-item-subtitle :id="details.id+'-subtitle'">{{ details.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action> -->
        </v-list-item>
      </v-list>
      <v-divider inset></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="details.selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in details.items"
            :key="i"
            :disabled="details.items_locked[i]"
			@click="item.action"
          >
            <v-list-item-icon>
              <v-icon
                :color="details.items_locked[i] ? 'gray' : 'green'"
                v-text="item.icon"
              ></v-icon>
            </v-list-item-icon>

            <v-list-item-content :id="details.id+'-item-'+i">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>


<script>

export default {
  props: {
    details: {
      id: {
        type: String,
      },
      title: {
        type: String,
      },
      subtitle: {
        type: String,
      },
      avatar: {
        type: String,
      },
      items: {
        type: Array,
      },
      items_locked: {
        type: Array,
      },
    },
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    // lockSelection(i) {
    //   return details.items_locked[i] == true;
    // },
  },
};
</script>