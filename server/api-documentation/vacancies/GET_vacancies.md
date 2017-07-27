# Read one page of vacancies

``` Text
GET vacancies
```

## Description

Read a page of vacancies.

***

## Requires authentication

'hr' or 'admin' role is required.

***

## Parameters

- **page** *(default=1)* — number of page
- **filter** — filter object:
  - **city** *(may be not defined)* — array of cities
  - **primarySkill** *(may be not defined)* — array of primary skills
  - **secondarySkill** *(may be not defined)* — array of secondary skills
  - **jobStart** *(may be not defined)* — job start date section:
    - **from** *(may be not defined)* — from date
    - **to** *(may be not defined)* — to date
  - **salary** *(may be not defined)* — salary section:
    - **from** *(may be not defined)* — from salary (String)
    - **to** *(may be not defined)* — to salary (String)
  - **status** *(may be not defined)* — array of statuses

***

## Return format

A JSON object, that contains an array of vacancy objects.

### Vacancy object

- **id** — unique id of the vacancy
- **name** — vacancy title
- **status** — vacancy status
- **jobStart** — job start date (DD/MM/YYYY)
- **primarySkill** — primary skill of the vacancy
- **city** — vacancy city

## Errors

- **400 Bad request** — **page** is not a number or filters can not be parsed
- **403 Forbidden** — user with 'user' role can not read vacancies

***

### Example

#### **Request**

``` Text
GET vacancies?page=3&filter={"city":["Minsk"],"jobStart":{"from":"2009-06-03T14:00:00.000Z"},"salary":{"from":5000}}
```

#### **Return**

``` JSON
{
  "vacancies": [
    {
      "id": 1,
      "name": "job in exadel",
      "status": "On hold",
      "jobStart": "03/06/2009",
      "primarySkill": "js",
      "city": "Minsk"
    },
    {
      "id": 2,
      "name": "job in exadel 2",
      "status": "On hold",
      "jobStart": "03/06/2009",
      "primarySkill": "js",
      "city": "Minsk"
    },
    {
      "id": 3,
      "name": "job in exadel 3",
      "status": "On hold",
      "jobStart": "03/06/2009",
      "primarySkill": "js",
      "city": "Minsk"
    }
  ]
}
```
