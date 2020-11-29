<template>
    <div class="con-exemple-prompt">
        <div class="w-full p-2">
            <vs-input
                class="w-full"
                label-placeholder="Nombre Clase"
                v-model="form.title"
                name="Nombre Clase"
                v-validate="'required'"
                :danger="errors.has('Nombre Clase')"
            />
            <span
                class="text-danger text-sm"
                v-show="errors.has('Nombre Clase')"
                >{{ errors.first("Nombre Clase") }}</span
            >
        </div>
        <div class="w-full p-2">
            <div class="">
                <vs-input
                    class="w-full"
                    label-placeholder="Descripción"
                    v-model="form.description"
                    name="Descripción"
                    v-validate="'required'"
                    :danger="errors.has('Descripción')"
                />
                <span
                    class="text-danger text-sm"
                    v-show="errors.has('Descripción')"
                    >{{ errors.first("Descripción") }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Classes",
    props: {
        courseId: String,
    },
    data() {
        return {
            form: {
                title: null,
                description: null,
                course_id: this.courseId,
            },
        };
    },
    methods: {
        save() {
            this.create();
        },
        closeModalClass() {
            this.$emit("close-modal-class");
        },
        create() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    const payload = this.form;
                    this.$store.dispatch(
                        "courseClass/createCourseClass",
                        payload
                    );
                    this.closeModalClass();
                }
            });
        },
    },
};
</script>