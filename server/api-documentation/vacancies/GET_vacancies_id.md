# Read the vacancy

``` Text
GET vacancies/:id
```

## Description

Read the vacancy.

***

## Requires authentication

'hr' or 'admin' role is required.

***

## Parameters

- **id** — vacancy id

***

## Return format

A JSON object, that contains vacancy object.

### Vacancy object

- **id** — unique vacancy id
- **name** — vacancy title
- **status** — vacancy status
- **jobStart** — job start date (DD/MM/YYYY)
- **createdDate** — vacancy create date (DD/MM/YYYY)
- **salary** *(may be null)* — vacancy salary (Number)
- **primarySkill** — primary skill of the vacancy
- **description** — vacancy description
- **city** — vacancy city
- **skills** — array of skill objects:
  - **name** — skill title
  - **weight** — skill weight

## Errors

- **403 Forbidden** — user with 'user' role can not read vacancies
- **404 Not found** — there is no vacancy in DB with such id

***

### Example

#### **Request**

``` Text
GET vacancies/123
```

#### **Return**

``` JSON
{
    "id": 1,
    "name": "job in exadel",
    "status": "On hold",
    "jobStart": "12/08/2017",
    "createdDate": "03/06/2017",
    "salary": "5000$",
    "primarySkill": "js",
    "description": "Long description",
    "city": "Minsk",
    "skills": [
        {
            "name": "js",
            "weight": 6
        },
        {
            "name": "java",
            "weight": 2
        },
        {
            "name": "c++",
            "weight": 2
        },
        {
            "name": "html",
            "weight": 4
        }
    ]
}
```
