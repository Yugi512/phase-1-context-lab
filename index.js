const createEmployeeRecord = (employee) => {
    const employeeInfo = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeInfo
}

function createEmployeeRecords(array){
    return array.map((element) => {
        return createEmployeeRecord(element)
      })
}

function createTimeInEvent(dateStamp){
    let day = dateStamp.split(' ');
    let ymd = day[0];
    let time = day[1];
    let obj = this;
    obj.timeInEvents.push({type: "TimeIn" , date: ymd, hour: parseInt(time)})
    return obj
    
}

function createTimeOutEvent(dateStamp){
    let day = dateStamp.split(' ');
    let ymd = day[0];
    let time = day[1];
    let obj = this;
    obj.timeOutEvents.push({type: "TimeOut" , date: ymd, hour: parseInt(time)})
    return obj
    
}

function hoursWorkedOnDate(dateStamp){
    let employeeRecord = this;
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++ ){
        if( employeeRecord.timeOutEvents[i].date === dateStamp){
          let lastHour = employeeRecord.timeOutEvents[i].hour;
          let firstHour = employeeRecord.timeInEvents[i].hour
         return (lastHour - firstHour)/100
         }
    }
    
}

function wagesEarnedOnDate(dateStamp){
    let hrs = hoursWorkedOnDate.call(this,dateStamp)
    let pay = this.payPerHour;
    return (hrs * pay)
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(arrayOfEmp,name){
    for(const employee of arrayOfEmp){
        debugger;
        if(employee.firstName !== name){
            return (undefined)
        } else if ( employee.firstName === name){
            return (employee)
        }
    }
}

function calculatePayroll(array){
    return array.reduce((prev,next) => {
        return prev + (allWagesFor.call(next))
    },0)
}