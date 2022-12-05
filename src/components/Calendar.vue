<template>
    <div class="container">
        <div class="header">
            <div class="header-container">
                <div class="header-buttons">
                    <button class="main-button" v-on:click="quickModalHandler()">Добавить</button>
                        <QuickEventModal 
                            v-if="quickFlag" 
                            v-on:addQuickEvent="addQuickEventHandler"
                            v-on:quickModal="quickModalHandler"
                        />
                    <button class="main-button" v-on:click="reload()">Обновить</button>
                </div>
                <div class="search-panel">
                    <div class="search-icon">
                        <img src="@/assets/search.svg">
                    </div>
                    <div class="search-input" @input="search()">
                        <input placeholder="Поиск..."  v-model="searchInput" @focus="focused = true" @blur="focused = false">
                        <div class="search-list" v-if="focused">
                            <SearchListItem 
                                v-for="(searchItem, index) in searchArray" :key="index"
                                v-bind:event="data.event"
                                v-bind:searchItem="searchItem"
                                v-on:selectItem="selectItemHandler"
                                v-bind:monthes="data.parentMonthes"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="layout">
            <div class="layout-container">
                <div class="button-row">
                    <div class="month-control">
                        <div class="left-button-icon" v-on:click="decreaseMonth(data)">
                            <img src="@/assets/arrow.svg">
                        </div>
                        <div>{{data.monthes[data.month]}} {{data.year}}</div>
                        <div class="right-button-icon" v-on:click="increaseMonth(data)">
                            <img src="@/assets/arrow.svg">
                        </div>
                    </div>
                    <button class="extra-button" v-on:click="today(data)">Сегодня</button>
                </div>
                <div class="table" id="table"> 
                    <div v-for="(day, index) in data.pole" :key="index">
                        <b-tooltip  v-if="flag"  :target="`${index}`" placement="auto" triggers="click">
                            <EventModal 
                                v-on:addEvent="addEventHandler"
                            />
                        </b-tooltip>
                        <b-tooltip  v-if="overFlag"  :target="`${index}`" placement="auto" triggers="click">
                            <EventOverview
                                v-on:openModal="onOpenModalHandler"
                                v-on:remove="removeEventHandler"
                                v-on:changeDescription="changeDescriptionHandler"
                                v-bind:event="data.event" 
                                v-bind:title="cellTitle" 
                                v-bind:name="cellName" 
                                v-bind:description="cellDescription" 
                                v-bind:day="cellDay" 
                                v-bind:monthes="data.parentMonthes" 
                            />
                        </b-tooltip>
                        <Cell
                            v-bind:index="index"
                            v-bind:day="day"
                            v-bind:dayName="data.dayName" 
                            v-bind:event="data.event"
                            v-bind:isActive="isActive"
                            v-on:openModal="onOpenModalHandler"
                        />
                    </div>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cell from '@/components/Cell'
import EventModal from '@/components/EventModal'
import EventOverview from '@/components/EventOverview'
import QuickEventModal from '@/components/QuickEventModal'
import SearchListItem from '@/components/SearchListItem'
import addPole from '@/helper'
import crypt from '@/quickHelper'
export default {
    props: ['data'],
    components: {
        Cell,
        EventModal,
        SearchListItem,
        QuickEventModal,
        EventOverview
    },
    methods: {
       
        today: function(data) {
            data.month = new Date().getMonth()
            data.year = new Date().getFullYear()
            data.lastDay = new Date(data.year, data.month+1, 0).getDate()
            data.pole = addPole(data.year, data.month)
        },

        increaseMonth: function(data) {
            data.month++;
            if (data.month > 11) {
                data.month = -1;
                data.month++;
                data.year++;
            }
            data.firstDayName = new Date(data.year, data.month, 1).getDay()
            data.lastDay = new Date(data.year, data.month+1, 0).getDate()
            data.pole = addPole(data.year, data.month)
        },

        decreaseMonth: function(data) {
            data.month--;
            if (data.month < 0) {
                data.month = 12;
                data.month--;
                data.year--;
            }
            data.firstDayName = new Date(data.year, data.month, 1).getDay()
            data.lastDay = new Date(data.year, data.month+1, 0).getDate()
            data.pole = addPole(data.year, data.month)
        },

        reload: function() {
            location.reload();
            return false
        },
        
        search: function() {
            this.searchArray.splice(0, this.searchArray.length)
            this.data.event.forEach((item) => {
            if (item.name.slice(0, this.searchInput.length).toLowerCase() === this.searchInput.toLowerCase() || item.title.slice(0, this.searchInput.length).toLowerCase() === this.searchInput.toLowerCase()) {
                this.searchArray.push(item)
            }});
        },

        quickModalHandler: function() {
            this.quickFlag = !this.quickFlag
            this.$root.$emit('bv::hide::tooltip')
        },

        addQuickEventHandler: function(data) {
            let quickData = crypt(data.quickString)
            let newObj = {id: quickData.dayId, title: quickData.title, name: quickData.name, description: ''};
            this.data.event.push(newObj);
            this.quickFlag = false;
        },

        onOpenModalHandler: function(cellData) {
            this.flag = cellData.flag;
            this.overFlag = cellData.overFlag;
            this.cellTitle = cellData.cellTitle;
            this.cellDescription = cellData.cellDescription;
            this.cellDay = cellData.cellDay
            this.cellName = cellData.cellName
            this.quickFlag = false
            this.isActive = cellData.isActive
        },

        removeEventHandler: function(eventData) {
            const itemIndex = this.data.event.findIndex(element => element.id == eventData.id);
            this.data.event = [
                ...this.data.event.slice(0, itemIndex),
                ...this.data.event.slice(itemIndex + 1)
            ]
          
            this.isActive = ''
        },

        addEventHandler: function(eventData) {
            let newObj = {id: this.cellDay, title: eventData.eventInput, description: eventData.textareaInput, name: eventData.nameInput};
            this.data.event.push(newObj);
            this.quickFlag = false
            this.isActive = ''
        },

        changeDescriptionHandler: function(eventData) {
            console.log(eventData)
            let newD = this.data.event.find(item => item.id == eventData.id);
            newD.description = eventData.newDescription;
            newD.title = eventData.newTitle;
            newD.name = eventData.newName
            this.isActive = ''
        },

        selectItemHandler: function(itemData) {
            let selectedDate = new Date(+itemData.id);
            this.data.month = selectedDate.getMonth();
            this.data.year = selectedDate.getFullYear();
            this.data.pole = addPole(this.data.year, this.data.month)
            this.isActive = +itemData.id
        },
    },

    data() {
        return {
            flag: true,
            overFlag: false,
            quickFlag: false,
            cellTitle: '',
            cellDescription: '',
            cellName: '',
            cellDay: '',
            searchInput: '',
            searchArray : [],
            focused: false,
            buttonPressed: false,
            isActive: '',
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=Roboto&display=swap');

html, body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
}

.header {
    background-color: #F4F4F4;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 61.5em
}

.layout {
    background-color: #FFFFFF;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.header-buttons {
    display: flex;
    align-items: center;
    position: relative;
}

.button-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.table {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 61.5em;
    position: relative;
}

.main-button {
    background-color: #0271C7;
    color: white;
    border-radius: 2px;
    padding: 6px 12px;
    margin-right: 5px;
    border: none;
    box-shadow: 0px 1px 1px 0px #00000040;
}

.main-button:hover {
    background-color: #27A1FF;
}

.main-button:active {
    background-color: #C2E4FE;
}

input {
    border-radius: 4px;
    border: solid #CFCFCF 1px;
    box-shadow: 0px 0px 1px 2px #00000040 inset;
    padding: 6px 12px;
    outline: none;
    width: -webkit-fill-available;
}

input:focus {
    border: solid #27A1FF 1px;
}

.search-icon {
    display: flex;
    margin: 20px;
}

.left-button-icon {
    transform: scale(-1, 1)
}

.right-button-icon, .left-button-icon {
    display: flex;
    padding: 4px 10px;
    border-radius: 4px;
    border: solid 1px;
    justify-content: center;
    margin: 12px 0px;
    box-shadow: 0px 0px 1px 1px #00000040 inset;
    border: none;
}

.left-button-icon > img, .right-button-icon > img {
    background: url('@/assets/arrow-button.svg');
}

.left-button-icon:hover > img, .right-button-icon:hover > img {
    background: url('@/assets/white-arrow-button.svg');
}

.right-button-icon:hover, .left-button-icon:hover {
    background-color: #6B6B6B;
}

.right-button-icon:active, .left-button-icon:active {
    background-color: #CFCFCF;
}

.extra-button {
    border-radius: 4px;
    padding: 2px 6px;
    background-color: white;
    box-shadow: 0px 0px 1px 1px #00000040 inset;
    border: none;
    color: #292929;
    margin: 12px;
}

.extra-button:active {
    color: white;
    background-color: #6B6B6B;
}

.month-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 12em;
    justify-content: space-between;
}

.tooltip.b-tooltip {
    opacity: 1 !important;
}
</style>