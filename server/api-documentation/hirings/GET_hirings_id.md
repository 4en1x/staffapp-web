# Get hiring

``` Text
Get hirings/:id
```

## Description

Read hiring

***

## Requires authentication

Authentication is required.

'hr' or 'admin' role is required to get hiring.

***

## Parameters

- **id** *(required)* — hiring id

***

## Return format

A JSON object, that contains an array of hiring objects (but now only one).

### Hiring object

- **id** — unique id of the hiring
- **dateOpen** — date of opening hiring (DD/MM/YYYY)
- **timeOpen** — time of opening hiring (HH:mm)
- **dateClose** *(may be not defined)* — closing date of the hiring (DD/MM/YYYY)
- **timeClose** *(may be not defined)* — closing time of the hiring (HH:mm)
- **vacancyId** *(may be not defined)* — id vacancy attached to hiring
- **userId** — user who appointed hiring
- **interviews** — array of interview objects
  - **id** — unique interviews field id
  - **type** — type of the interview:
    - **type: 'TECH'** — technical interview
    - **type: 'HR'** — HRM interview
    - **type: 'OWNER'** — owner interview
  - **date** *(may be not defined)* — date of the interview (DD/MM/YYYY)
  - **time** *(may be not defined)* — time of the interview (HH:mm)
  - **place** *(may be not defined)* — place of the interview
 
## Errors


- **403 Forbidden** — user tries to read hiring without required permission
- **404 Not Found** — hiring don\'t exist
## Example

### Request

``` Text
Get hirings/20
```

### Return

``` JSON
{
    "id": 20,
    "userId": 1,
    "vacancyId": null,
    "candidateId": 16,
    "dateOpen": "29/07/2017",
    "dateClose": null,
    "interviews": [
        {
            "id": 28,
            "type": "TECH",
            "date": "27/07/2017",
            "place": null,
            "time": "18:00"
        }
    ],
    "timeOpen": "22:50",
    "timeClose": null
}
```
