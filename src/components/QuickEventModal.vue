<template>
    <div class="quick-event-add">
        <div class="modal-close-button" v-on:click="closeQuickAdd()">
            <img src="@/assets/cross.svg">
        </div>
        <form class="modal-input" @submit.prevent="onSubmit">
            <input placeholder="25 ноября, Кутёж, Серж" v-model="quickInput" :class="{empty: this.inputFlag}">
        </form>
        <div class="modal-button" @click="onSubmit">
            <button class="extra-button">Создать</button>                        
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            quickInput: '',
            inputFlag: false,
        }
    },
    
    methods: {
        closeQuickAdd: function() {
            this.$emit('quickModal')
        },

        onSubmit: function() {
            if (this.quickInput == '') {
                alert('Необходимо заполнить обязательные поля')
                this.inputFlag = true;
                return
            } else if (this.quickInput.split(',').length !== 3) {
                this.inputFlag = true;
                alert('Введите данные в правильной форме: День, Название события, Участники')
                return
            } else {
                this.$emit('addQuickEvent', {quickString: this.quickInput})
                this.inputFlag = false
            }
        },
        
    }
}
</script>

<style>
.empty {
    border: solid #E94E4E 1px;
}

.empty::-webkit-input-placeholder {
    color: #E94E4E;
}
</style>