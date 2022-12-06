<template>
    <div class="search-list-item" @mousedown="selectItem()">
        <div class="search-list-item-title">{{searchItem.title}}</div>
        <div class="search-list-item-date">{{new Date(+searchItem.id).getDate()}}  {{monthes[new Date(+searchItem.id).getMonth()]}}</div>
    </div>
</template>

<script>
export default {
    props: ['searchItem', 'event', 'monthes'],
    methods: {
        //Функция отправляет данные для выполнения selectItemHandler
        selectItem: function() {
            this.$emit('selectItem', {id: this.searchItem.id})
        }
    },
}
</script>

<style>
.search-panel {
    display: flex;
    align-items: center;
}

.search-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 0px 7px 0px #00000040;
    z-index: 1;
    height: max-content;
    max-height: 18em;    
    cursor: default;
    overflow: auto;
    box-sizing: border-box;
    top: 35px;
}

.search-input > .search-list {
    width: 100%;
    box-sizing: border-box;
}

.search-input {
    position: relative;
}

.search-list::-webkit-scrollbar {
  width: 12px;
}
.search-list::-webkit-scrollbar-track {
  background: white;
}
.search-list::-webkit-scrollbar-thumb {
  background-color: #C4C4C4;
  border-radius: 20px;
  border: 3px solid white;
}

.search-list-item:hover > .search-list-item-title,.search-list-item:hover > .search-list-item-date {
    background-color: #27A1FF;
    color: white;
}

.search-list-item {
    margin: 6px;
}

.search-list-item-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #292929;
    padding: 4px;
}

.search-list-item-date {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #292929;
    padding: 4px;
}
</style>