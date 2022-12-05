<template>
  <div id="app">
    <Calendar v-bind:data="data"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import addPole from '@/helper'
import Vue from 'vue'
import { TooltipPlugin } from 'bootstrap-vue'
Vue.use(TooltipPlugin)
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  data () {
    let oneHour = 3600000;
    let oneDay = 86400000;
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let today = new Date().getDate();
    let firstDayName = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    let lastDay =  new Date(year, month+1, 0).getDate();
    let pole = addPole(year, month);

    return {
      data: {
        firstDayOfMonth: new Date(year, month, 7).getDay(),
        oneHour,
        oneDay,
        lastDay,
        month,    //текущий месяц
        year,  //текущий год
        today, //текущее число
        firstDayName, //день недели первого числа месяца
        dayName:["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        monthes:["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        parentMonthes:["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        event: [{id: '1671037200000', title: 'Шашлыки', name: 'Филипп Коров', description: 'Пацаны на чиле'}, 
                {id: '1670173200000', title: 'Сдача проекта', name: 'Ваге', description: 'Успеть написать тестовое за неделю и отправить на проверку'},
                {id: '1669741200000', title: 'Основная вёрстка', name: 'Ваге', description: 'Сверстать страницу'},
                {id: '1669827600000', title: 'Знакомство с Vue', name: 'Ваге', description: 'Познакомиться с Vue и начать изучать его. Первые сложности с календарём'},
                {id: '1669914000000', title: 'Функционал', name: 'Ваге', description: 'Написать добавление и удаление событий'},
                {id: '1670000400000', title: 'Быстрое добавление событий', name: 'Ваге', description: 'Продумать варианты событий и написать дешифратор'},
                {id: '1670086800000', title: 'Поездка в Тюмень', name: 'Ваге', description: 'День в поезде и попытки дошлифовать проект'},
                {id: '1669654800000', title: 'Начальная вёрстка', name: 'Ваге', description: 'Начать делать вёрстку UI компонентов'}],
        pole,
      }
    }
  },
  components: {
    Calendar
  }
}
</script>

<style>

</style>