<template>
    <div class="event-add">
        <div class="modal-close-button" v-on:click="closeModal()">
            <img src="@/assets/cross.svg">
        </div>
        <form class="modal-input" @submit.prevent="onSubmit">
            <input placeholder="Событие" v-model="eventInput" :class="{empty: this.inputFlag}">
        </form>
        <form class="modal-input" @submit.prevent="onSubmit">
            <input placeholder="Имена участников" v-model="nameInput">
        </form>
        <form class="modal-textarea" @submit.prevent="onSubmit">
            <textarea placeholder="Описание" v-model="textareaInput"></textarea>
        </form>
        <div class="modal-button">
            <button class="extra-button" v-on:click="onSubmit()">Готово</button>      
            <button class="extra-button" v-on:click="closeModal()">Удалить</button>                                          
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods: {

        // Функция отвечает за открытие и закрытие модального окна EventModal
        closeModal: function() {
            this.$root.$emit('bv::hide::tooltip')
        },

        // Функция проверяет заполненность обязательных полей 
        // и отправляет данные для выполнения addEventHandler и закрывает окно
        onSubmit: function() {
            if (this.eventInput == '') {
                alert('Необходимо заполнить обязательные поля')
                this.inputFlag = true
            } else {
                this.$emit('addEvent', {
                    eventInput: this.eventInput, 
                    nameInput: this.nameInput,
                    textareaInput: this.textareaInput,
                })
                    this.$root.$emit('bv::hide::tooltip')
            }
        }
    },

    data() {
        return {
            eventInput: '',
            nameInput: '',
            textareaInput: '',
            inputFlag: false
        }
    },
}
</script>

<style>
.event-overview, .event-add, .quick-event-add {
    width: 300px;
    background-color: white;
    box-shadow: 0px 0px 7px 0px #00000040;
    z-index: 1;
}

.quick-event-add {
    bottom: -6em;
    position: absolute;
}

.modal-close-button {
    display: flex;
    justify-content: flex-end;
    padding: 12px 14px;;
}

.modal-input {
    display: flex;
    justify-content: center;
    padding: 4px 12px;
}

.modal-button {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
}

textarea {
    display: flex;
    justify-content: center;
    border-radius: 4px;
    border: solid #CFCFCF 1px;
    box-shadow: 0px 0px 1px 2px #00000040 inset;
    padding: 6px 12px;
    outline: none;
    width: -webkit-fill-available;
    height: 8em;
    resize: none;
    font-family: 'Roboto', sans-serif;
}

.modal-textarea {
    display: flex;
    justify-content: center;
    padding: 0px 12px;
    padding-top: 24px;
}

.modal-description {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0px 12px;
}

.modal-description-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
}

.modal-description-date {
    padding: 16px 0px;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}

.modal-description-people {
    display: flex;
    flex-direction: column;
}

.modal-description-people-header {
    font-size: 14px;
    font-weight: 300;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #6B6B6B;
}

.modal-description-people-body {
    font-size: 12px;
    color: #292929;
    margin-bottom: 15px;
}

.empty {
    border: solid #E94E4E 1px;
}

.empty::-webkit-input-placeholder {
    color: #E94E4E;
}
</style>