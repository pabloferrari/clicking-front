<template>
    <div class="dropdown-button-container">
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <feather-icon
                icon="MoreVerticalIcon"
                svgClasses="h-5 w-5 cursor-pointer"
            />
            <vs-dropdown-menu>
                <vs-dropdown-item
                    class="color-text-menu font-semibold"
                    v-for="item in items"
                    :key="item.id"
                    :data-id="item.id"
                    :data-classId="dataSelected.id"
                    :data-classTitle="dataSelected.title"
                    @click="item.action"
                >
                    {{ item.title }}
                </vs-dropdown-item>
            </vs-dropdown-menu>
        </vs-dropdown>
    </div>
</template>

<script>
export default {
    name: "ButtonDropDown",
    props: {
        items: Array,
        dataSelected: {},
    },

    methods: {
        actionDropdown(arrayData, params) {
            this.$emit("action-dropdown-item", arrayData, params);
        },
    },
};
</script>

<style lang="scss">
.con-vs-dropdown--menu {
    width: 18rem !important;
}
.dropdown-button-container {
    display: flex;
    align-items: center;

    .btnx {
        border-radius: 5px 0px 0px 5px;
    }
    .color-text-menu {
        color: #22215b;
    }
    .btn-drop {
        border-radius: 0px 5px 5px 0px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
}
</style>
