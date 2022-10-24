/* 
    ============================ Code Steps ============================
    1- Get the current day's date  
        هجيب تاريخ اليوم الحالي
    2- Calculate the date of the first day of Ramadan 
        هحسب تاريخ اول يوم رمضان
    3- Subtract the date of the first day of Ramadan from the current day's date
        هطرح تاريخ اول يوم رمضان من تاريخ اليوم الحالي   
        The result of subtracting the two dates will have 3 possibilities :
            ناتج طرح التاريخين هيكون ليه 3 احتمالات
        3.1- the day will be Before Ramadan  
            الناتج من الطرح ممكن يكون "يوم قبل رمضان فهنظهر جملة "باقي علي رمضان" عدد الايام
        3.2- the day will be During Ramadan So, the phrase “remaining from Ramadan” appears
            التاريخ الناتج من الطرح ممكن يكون "يوم خلال رمضان" فهنظهر جملة "باقي من رمضان" عدد الايام 
        3.3- the day will be After Ramadan So, the phrase “The rest on Ramadan” will appear 
            الناتج من الطرح ممكن يكون "يوم بعد رمضان" فهنظهر جملة "باقي علي رمضان" عدد الايام
        
*/
/* +++++++++++++++++++++++++++++ Variables +++++++++++++++++++++++++ */
/* The "container" where the "remaining days of Ramadan" will fall */
// المكان اللي هنحط فيه الايام المتبقية علي رمضان
const remainingTimeElement = document.querySelector('.container_remainingTime');
/* Gregorian date */
// تاريخ اليوم الميلادي 
const todayGeorgianDate = moment();
// Convert the "Gregorian date" to "Hijri date"
// هجيب تاريخ اليوم الهجري عن طريق تحويل تاريخ اليوم الميلادي الي هجري
const todayHijriFormat  = todayGeorgianDate.format("iYYYY/iM/iD");
// Parse a Hijri date
const todayHijriDate    = moment(todayHijriFormat,'iYYYY/iM/iD');
// Get "Current Hijri Year"
// هنجيب السنة الهجرية الحالية
const thisHijriYear     = parseInt(todayGeorgianDate.format('iYYYY'));
// Get "The first day of Ramadan Date"
// هحيب  تاريخ اول يوم رمضان
let ramadanDate = moment( `${thisHijriYear} / 9 / 1 ` , 'iYYYY/iM/iD' ) ;
// The number of days of Ramadan
// عدد ايام شهر رمضان 
let daysInRamadan = ramadanDate.daysInMonth();
// -------- subtract "current date" from "Ramadan Day" --------
// هحسب الفرق بين تاريخ اليوم الهجري الحالي و تاريخ اول يوم رمضان
let diff = todayHijriDate.diff(ramadanDate,'days');
/* "from" or "on" span  */
let fromOrTo =  document.querySelector(".container_text_fromOrTo");

/* ++++++++++++++++++++++++++++++++++ Make Conditions ++++++++++++++++++++++++++++++++++ */
/* 
    ==============================================================================
    1- if ( currentHijriDate - ramadanDate ) >= 0 , there are two probabilities
        1.1- "During ramadan" ==> if( diff == 0 )
        1.2- "After ramadan"  ==> if( diff > 0 )
    2- if ( currentHijriDate - ramadanDate ) < 0 , "Before Ramadan" 
    ==============================================================================
 */
// ***************** 1- if ( currentHijriDate - ramadanDate ) >= 0 , there are two probabilities *****************
// لو ناتج الطرح كان بالموجب او 0 فكده احنا في اول يوم رمضان او بعد اول يوم رمضان
if( diff >= 0 )
{
    // ------------------- During "Ramadan Month" -------------------
    // لو الفرق كان اصغر من او بيساوي عدد ايام شهر رمضان فكده احنا موجودين في شهر رمضان وهنسحب الايام المتبقية منه
    if( diff <= daysInRamadan )
    {   
        document.querySelector(".container").classList.add("container--duringRamadan");
        diff = dayInRamadan - diff ;
        // appear word "من" 
        fromOrTo.textContent = "من";
    }
    // ------------------- After "Ramadan Month" -------------------
    // لو الفرق كان اكبر من عدد ايام رمضان فكده تاريخ اليوم الحالي موجود بعد شهر رمضان فهنحسب عدد الايام المتبقية علي شهر رمضان السنة اللي بعدها
    else
    {
        // nextHijriYear = currentHijriYear + 1
        const nextHijriYear = thisHijriYear + 1 ;
        // Get "The first day of Ramadan Date"
        // هحيب  تاريخ اول يوم رمضان في السنة الهجرية الجديدة
        ramadanDate = moment( `${nextHijriYear}/9/1` , 'iYYYY/iM/iD' );
        // -------- subtract "current date" from "Ramadan Day" --------
        // هحسب الفرق بين تاريخ اليوم الهجري الحالي و تاريخ اول يوم رمضان
        diff = todayHijriDate.diff(ramadanDate,'days');      
        // appear word "علي" 
        fromOrTo.textContent = "علي";          
    }
}
// ***************** 2- if ( currentHijriDate - ramadanDate ) < 0 , We Are Before Ramadan *****************
else
{
    // ---------------------------- Before Ramadan ----------------------
    //  وخلي بالك الفرق هيكون بالسالب فهنحذف منه علامة السالب وهنظهره الرقم باللغة العربية.container_remainingTime هنحط فرق الايام بين تاريخ اليوم الحالي وتاريخ شهر رمضان في العنصر اللي واخد كلاس
    // remove "minus sign" from diff and display it in arabic format in case of  ( currentHijriDate - ramadanDate ) < 0
    remainingTimeElement.textContent = Math.abs(diff).toLocaleString('ar-sa');  
    fromOrTo.textContent = "علي";          
}
