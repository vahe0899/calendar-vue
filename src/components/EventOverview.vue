<template>
    <div class="event-overview">
        <div class="modal-close-button" v-on:click="closeModal()">
            <img src="@/assets/cross.svg">
        </div>
        <div class="modal-description">
            <div class="modal-description-title">{{title}}</div>
            <div class="modal-description-date">{{day.id}} {{monthes[new Date(day.idEvent).getMonth()]}}</div>
            <div class="modal-description-people">
                <div class="modal-description-people-header">Участники:</div>
                <div class="modal-description-people-body">{{name}}</div>
                <div class="modal-description-people-header">Описание:</div>
                <div class="modal-description-people-body">{{description}}</div>
            </div>
        </div>
        <form class="modal-input" @submit.prevent="onSubmit">
            <input placeholder="Событие" v-model="eventInput">
        </form>
        <form class="modal-input" @submit.prevent="onSubmit">
            <input placeholder="Имена участников" v-model="nameInput">
        </form>
        <form class="modal-textarea" @submit.prevent="onSubmit">
            <textarea placeholder="Описание" v-model="textareaInput"></textarea>
        </form>
        <div class="modal-button">
            <button class="extra-button" v-on:click="onSubmit()">Готово</button>      
            <button class="extra-button" v-on:click="removeEvent()">Удалить</button>                                          
        </div>
    </div>
</template>

<script>
export default {
    props: ['event', 'title', 'description', 'day', 'monthes', 'name'],
    methods: {
        closeModal: function() {
            this.$root.$emit('bv::hide::tooltip')
            this.$emit('remove', {})
        },

        removeEvent: function() {
            this.$emit('remove', {id: this.day.idEvent})
            this.$root.$emit('bv::hide::tooltip')
        },

        onSubmit: function() {
            if (this.eventInput == '') {
                this.$root.$emit('bv::hide::tooltip')
            } else {
                this.$emit('changeDescription', {
                    id: this.day.idEvent, 
                    newDescription: this.textareaInput,
                    newName: this.nameInput,
                    newTitle: this.eventInput
                })
                this.$root.$emit('bv::hide::tooltip')
            }
        },
    },

    data() {
        return {
            textareaInput: this.description,
            eventInput: this.title,
            nameInput: this.name,
            inputFlag: false
        }
    }
}
</script>
