import { useState } from "react";
import "./styles.css";

const isPalindrome = (dateString) =>
{
  return dateString == dateString.split("").reverse().join("");
}

const generateDateObject = (formattedDate) =>
{
  let yearFull = formattedDate.slice(0, 4);
  let yearHalf = formattedDate.slice(2, 4);
  let month = formattedDate.slice(4, 6);
  let day = formattedDate.slice(6, 8);

  const dateObj =
  {
    y: yearFull,
    yh: yearHalf,
    m: month,
    d: day
  }
  return dateObj;
}

const incrementDate = (formattedDate) =>
{
  let dateObj = generateDateObject(formattedDate);
  let day = Number(dateObj.d) + 1;
  let month = Number(dateObj.m);
  let year = Number(dateObj.y);

  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2)
  {
    if (isLeapYear(year))
    {
      if (day > 29)
      {
        day = 1;
        month++
      }
    }
    else
    {
      if (day > 28)
      {
        day = 1;
        month++;
      }
    }
  }
  else
  {
    if (day > daysInMonths[month - 1])
    {
      day = 1;
      month++;
    }
  }
  if (month > 12)
  {
    month = 1;
    year++;
  }

  let dateObject =
  {
    y: year.toString(),
    yh: year.toString().slice(2, 4),
    m: month.toString().padStart(2, "0"),
    d: day.toString().padStart(2, "0")
  }

  return dateObject;
}

const isLeapYear = (year) =>
{
  if (year % 400 === 0)
  {
    return true;
  }
  if (year % 100 === 0)
  {
    return false;
  }
  if (year % 4 === 0)
  {
    return true;
  }
  return false;
}

const getAllDateFormats = (formattedDate) =>
{
  let dateObj = generateDateObject(formattedDate);

  let yyyymmdd = dateObj.y + dateObj.m + dateObj.d;
  let mmddyyyy = dateObj.m + dateObj.d + dateObj.y;
  let ddmmyyyy = dateObj.d + dateObj.m + dateObj.y;
  let yymmdd = dateObj.yh + dateObj.m + dateObj.d;
  let mmddyy = dateObj.m + dateObj.d + dateObj.yh;
  let ddmmyy = dateObj.d + dateObj.m + dateObj.yh;

  return [
    {
      date: yyyymmdd,
      format: dateObj.y + "-" + dateObj.m + "-" + dateObj.d
    },
    {
      date: mmddyyyy,
      format: dateObj.m + "-" + dateObj.d + "-" + dateObj.y
    },
    {
      date: ddmmyyyy,
      format: dateObj.d + "-" + dateObj.m + "-" + dateObj.y
    },
    {
      date: yymmdd,
      format: dateObj.yh + "-" + dateObj.m + "-" + dateObj.d
    },
    {
      date: mmddyy,
      format: dateObj.m + "-" + dateObj.d + "-" + dateObj.yh
    },
    {
      date: ddmmyy,
      format: dateObj.d + "-" + dateObj.m + "-" + dateObj.yh
    }
  ];
}


export default function App()
{
  const [rawInputDate, setRawInputDate] = useState();
  const [formattedDateStr, setFormattedDate] = useState();
  const [result, setResult] = useState("");

  const onDateChange = (event) =>
  {
    let dateString = (event.target.value).toString().replaceAll("-", "");
    setRawInputDate(event.target.value);
    setFormattedDate(dateString);
  };

  const nextPalindromeDate = () =>
  {
    //not palindrome
    let nextPalFound = false;
    let currentDateStr = formattedDateStr;
    let nextDateObj = incrementDate(currentDateStr);
    let nextDateString = nextDateObj.y + nextDateObj.m + nextDateObj.d;
    let dayCount = 0;
    while (true)
    {
      let allDateFormats = getAllDateFormats(nextDateString);
      for (let index = 0; index < allDateFormats.length; index++)
      {
        if (isPalindrome(allDateFormats[index].date))
        {
          nextPalFound = true;

          let nextPalObj =
          {
            dateStr: allDateFormats[index].date.toString(),
            dateFormat: allDateFormats[index].format.toString(),
            dCount: dayCount
          };
          return nextPalObj;
        }
        else
        {
        }
      }
      dayCount++;
      nextDateObj = incrementDate(nextDateString);
      nextDateString = nextDateObj.y + nextDateObj.m + nextDateObj.d;
    }
  }

  const onCheck = () =>
  {
    //if is a number
    if (!isNaN(formattedDateStr))
    {
      let allDateFormats = getAllDateFormats(formattedDateStr);
      for (let index = 0; index < allDateFormats.length; index++)
      {
        if (isPalindrome(allDateFormats[index].date))
        {
          setResult("Your birthdate " + rawInputDate + " in the format " + allDateFormats[index].format + " is palindrome! ");
          return;
        }
      }
      // setResult("Your birthdate is NOT palindrome! Next palindrome date is: ");
      let nextPalDate = nextPalindromeDate();
      setResult("Your birthdate is NOT palindrome! Next palindrome date is: " + nextPalDate.dateFormat + ". It is " + nextPalDate.dCount + " days away.");
    }
    //not a number
    else
    {
      setResult("Please enter your birth date!");
    }
  };
  return (
    <div className="App">
      <section>
        <h1>Palindrome Birthday!</h1>
        <h2>Enter your birth-date</h2>
        <input type="date" onChange={onDateChange}></input>
        <button className="cta-btn" onClick={() => onCheck()}>
          Check
        </button>
        <h3>{result}</h3>
      </section>
    </div>
  );
}
