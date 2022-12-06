<template>
  <div id="app">
    <Calendar v-bind:data="data"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import addCalendarData from '@/helper'
import Vue from 'vue'
import { TooltipPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(TooltipPlugin)

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
    let calendarData = addCalendarData(year, month);

    return {
      data: {
        firstDayOfMonth: new Date(year, month, 7).getDay(), //день недели последнего дня прошлого месяца
        oneHour, //один час
        oneDay, //один день
        lastDay,  //последний день месяца
        month,    //текущий месяц
        year,  //текущий год
        today, //текущее число
        firstDayName, //день недели первого числа месяца
        dayName:["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        monthes:["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        parentMonthes:["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        event: JSON.parse(localStorage.getItem('event')) || [],
        calendarData, // массив дней в текущем месяце
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