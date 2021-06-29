
module.exports=getDate;

function getDate(){
    var today = new Date();
    var day = "";

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    day = today.toLocaleDateString('en-us', options);
    return day;
}