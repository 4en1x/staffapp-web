# Read one page of candidates

``` Text
GET candidates
```

## Description

Read a page of candidates.

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
  - **lastChangeDate** *(may be not defined)* — last change date section:
    - **from** *(may be not defined)* — from date
    - **to** *(may be not defined)* — to date
  - **lastChangeDate** *(may be not defined)* — notification date section:
    - **from** *(may be not defined)* — from date
    - **to** *(may be not defined)* — to date
  - **salary** *(may be not defined)* — salary section:
    - **from** *(may be not defined)* — from salary (String)
    - **to** *(may be not defined)* — to salary (String)
  - **status** *(may be not defined)* — array of statuses
  - **englishLevel** *(may be not defined)* — array of english levels

***

## Return format

A JSON object, that contains an array of candidate objects.

## Errors

- **400 Bad request** — **page** is not a number or filters can not be parsed

***

### Example

#### **Request**

``` Text
POST candidates?p=3&city[0]=Minsk&city[1]=Gomel&last change date[from]=2009-06-02T14:00:00.000Z&status[0]=Hired
```

#### **Return**

``` JSON
{
  "candidates": [
    {
      "id": 1,
      "name": "Kostya",
      "surname": "Stsefanovich",
      "primarySkill": "js",
      "status": "Hired",
      "lastChangeDate": "2009-06-04T15:13:56.000Z",
      "city": "Minsk"
    },
    {
      "id": 4,
      "name": "John",
      "surname": "Smith",
      "primarySkill": "js",
      "status": "Hired",
      "lastChangeDate": "2009-06-04T15:13:56.000Z",
      "city": "Minsk"
    },
    {
      "id": 5,
      "name": "Sergey",
      "surname": "Moiseenko",
      "primarySkill": "java",
      "status": "Hired",
      "lastChangeDate": "2009-06-03T15:13:56.000Z",
      "city": "Gomel"
    }
  ]
}
```
