export default function crypt(str) {
    let parentMonthes = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let array = str.split(',');
    let date = array[0];
    let currentYear = new Date().getFullYear();
    let indexOfSpace = date.indexOf(' ');
    let day = [];
    let month = [];
    for (let i = 0; i < indexOfSpace; i++) {
        day.push(date[i])
    };
    for (let i = indexOfSpace + 1; i < date.length; i++) {
        month.push(date[i].toLowerCase())
    };
    day = day.join('');
    month = month.join('');
    let monthIndex = parentMonthes.indexOf(month);
    let dayId = new Date(currentYear, monthIndex, day).getTime()
    let title = array[1];
    let name = array[2];
    
    return {
        dayId,
        title,
        name
    }
}