# Create an interview

``` Text
POST interviews
```

## Description

Create an interview

***

## Requires authentication

Authentication is required.

'hr' or 'admin' role is required to create an interview.

***

## Body

- **type** *(required)* — type of the interview:
  - **type: 'TECH'** — technical interview
  - **type: 'HR'** — HRM interview
  - **type: 'CLIENT'** — client interview
- **date** — date and time of the interview ("YYYY-MM-DDTHH:mm:ss.000Z")
- **place** — place of the interview
- **hiringId** *(required)* — parent hiring id
- **users** *(required)* — array of users ids
- **fields** — array of feedbacks fields:
  - **name** — feedback field name (title)
  - **typeSkill** — type of a skill (primary, secondary, etc.), if the interview is a '**TECH**' interview
  - **type** — type of field:
    - **type: 'tech'** — has **name**, **value**, **comment** and **typeSkill**
    - **type: 'hr'** — has **name** and **comment**
    - **type: 'client'** — has **comment**

***

## Return format

A JSON object, that contains interview id.

## Errors

- **403 Forbidden** — user with 'user' role tries to create an interview

***

## Example

### Request

``` Text
POST interviews
```

### Body

``` JSON
{
  "type": "TECH",
  "hiringId": 1,
  "users": [1, 2, 3],
  "date": "2017-07-27T15:00:00.000Z",
  "fields": [
    {
      "name": "C++ skill",
      "typeSkill": "primary",
      "type": "tech"
    },
    {
      "name": "Some skill",
      "typeSkill": "secondary",
      "type": "tech"
    }
  ]
}
```

### Return

``` JSON
{
  "id": 17
}
```
