/** Функция создаёт массив дней, которые отображаются на экране
*@param "currYear" - текущий год
*@param "currMonth" - текущий месяц
*/
export default function addCalendarData(currYear = new Date().getFullYear(), currMonth = new Date().getMonth()) {
    let calendarData = [];
    let month = currMonth;
    let year = currYear;
    let lastDay =  new Date(year, month+1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 7).getDay();
    let lastDayOfLastMonth = month == 0 ? new Date(year-1, 0, 0).getDate() : new Date(year, month, 0).getDate();
      
    let i=1;
    do {

    let dow = new Date(year, month, i).getDay();
    
    // Если первый день недели не понедельник показать последние дни предидущего месяца
        if ( i == 1 && dow !== 1 ) {
        let k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for(let j=0; j < firstDayOfMonth; j++) {
        calendarData.push({id:k, idEvent: new Date(year, month-1, k).getTime()});
        k++;
        }
    }
        calendarData.push({id:i, idEvent: new Date(year, month, i).getTime()})

    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    if ( i == lastDay && dow !== 0 ) {
        let k=1;
        for(dow; dow < 7; dow++) {
        calendarData.push({id:k, idEvent: new Date(year, month+1, k).getTime()});
        k++;
        }
    }  
    i++;
    } while(i <= lastDay);
return calendarData
}