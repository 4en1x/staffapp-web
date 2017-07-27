# Read one page of interviews

``` Text
GET interviews
```

## Description

Read interviews.

***

## Requires authentication

Authentication is required.

User with 'user' role can read only a page of interviews assigned to current user.

'hr' or 'admin' role is required to read a page of interviews created by current user.

***

## Parameters

- **type** *(default=my)* — type of interviews:
  - **type=my** — interviews assigned to current user
  - **type=assigned** — interviews created by current user
  - **type=all** — union of "my" and "assigned"

***

## Return format

A JSON object, that contains an array of interview objects.

### Interview object

- **id** — unique id of the interview
- **type** — type of the interview:
  - **type: 'TECH'** — technical interview
  - **type: 'HR'** — HRM interview
  - **type: 'CLIENT'** — clinet interview
- **date** *(may be not defined)* — date of the interview (DD/MM/YYYY)
- **time** *(may be not defined)* — time of the interview (HH:mm)
- **place** *(may be not defined)* — place of the interview
- **name** — candidate first name
- **surname** — candidate last name

## Errors

- **400 Bad request** — **type** !== my|assigned|all
- **403 Forbidden** — user tries to read 'assigned' or 'all' interviews without required permission

***

## Example

### Request

``` Text
GET interviews?type=assigned
```

### Return

``` JSON
{
  "interviews": [
    {
      "id": 3,
      "type": "TECH",
      "date": "18/07/2017",
      "time":  "15:30",
      "place": "somewhere",
      "name": "John",
      "surname": "Smith"
    },
    {
      "id": 2,
      "type": "HR",
      "place": "somewhere else",
      "name": "Sohn",
      "surname": "Jmith"
    },
    {
      "id": 1,
      "type": "CLIENT",
      "date": "19/07/2017",
      "time": "16:00",
      "name": "Nhos",
      "surname": "Htimj"
    }
  ]
}
```
