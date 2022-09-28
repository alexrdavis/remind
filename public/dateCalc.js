
module.exports = {
    parseDate: function(str) {
        return new Date(str).toJSON().slice(0, 10);
    },
    dateDiff: function(first, second) {
        const diffTime = Math.abs(first - second)
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        let month = 0;
        let year = 0;
        let days = 0

        while(diffDays) {
          if(diffDays >= 365) {
            year+=1
            diffDays -= 365
          } else if(diffDays >= calcMonths(second.getMonth())) {
            month += 1
            diffDays -= calcMonths(second.getMonth())
          } else {
            days += 1
            diffDays--
          } 
        }
        let obj = {
            "year": year,
            "months": month,
            "days": Math.abs(first.getDate()-second.getDate())
          }
        return obj
    }
}

function calcMonths(month) {
    switch(month) {
        case 1:
            return 31
            break;
        case 2:
            return 28
            break;
        case 3:
            return 31
            break;
        case 4:
            return 30
            break;
        case 5: 
            return 31
            break;
        case 6:
            return 30
            break;
        case 7:
            return 31
            break;
        case 8:
            return 31
            break;
        case 9:
            return 30
            break;
        case 10:
            return 31
            break;
        case 11:
            return 30
            break;
        case 12:
            return 31
            break;
    }
}
