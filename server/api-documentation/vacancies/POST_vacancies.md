# Add a vacancy

``` Text
POST vacancies
```

## Description

Add a vacancy.

***

## Requires authentication

'hr' or 'admin' role is required.

***

## Body

- **name** *(required)* — cvacancy title
- **status** *(required)* — vacancy status
- **city** — vacancy city
- **jobStart** — job start date ("YYYY-MM-DDTHH:mm:ss.000")
- **primarySkill** — vacancy primary skill
- **salary** — vacancy salary
- **description** — vacancy description
- **skills** — array of skill objects:
  - **name** — skill name
  - **weight** — skill weight

***

## Return format

A JSON object that contains id of the vacancy.

## Errors

- **403 Forbidden** — user with 'user' role can not add vacancies

***

### Example

#### **Request**

``` Text
POST vacancies
```

#### **Body**

``` JSON
{
  "name": "Vacancy Name",
  "status": "On hold",
  "city": "Minsk",
  "primarySkill": "JavaScript",
  "salary": 1000,
  "description": "Long description",
  "skills": [
    {
      "name": "html",
      "weight": 6
    },
    {
      "name": "css3",
      "weight": 4
    }
  ]
}
```

#### **Return**

``` JSON
{
  "id": 8
}
```
