# Create a hiring

``` Text
POST hirings
```

## Description

Create a hiring

***

## Requires authentication

Authentication is required.

'hr' or 'admin' role is required to create an interview.

***

## Body

- **candidateId** *(required)* — assigned candidate id
- **interviews** — array of interview objects

### Interview object

- **type** *(required)* — type of the interview:
  - **type: 'TECH'** — technical interview
  - **type: 'HR'** — HRM interview
  - **type: 'CLIENT'** — client interview
- **date** — date and time of the interview ("YYYY-MM-DDTHH:mm:ss.000Z")
- **place** — place of the interview
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

A JSON object, that contains hiring id.

## Errors

- **403 Forbidden** — user with 'user' role tries to create a hiring.
- **422 Unprocessable Entity** — user try add hiring to candidate which already have hiring.

***

## Example

### Request

``` Text
POST hirings
```

### Body

``` JSON
{
  "candidateId": 14,
  "interviews": [
    {
      "type": "TECH",
      "date": "2017-07-27T15:00:00.000Z",
      "users": [1, 2, 3],
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
  ]
}
```

### Return

``` JSON
{
  "id": 18
}
```
