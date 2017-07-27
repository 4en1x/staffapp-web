# Read the candidate

``` Text
GET candidates/:id
```

## Description

Read the candidate.

***

## Requires authentication

'hr' or 'admin' role is required.

***

## Parameters

- **id** — candidate id

***

## Return format

A JSON object, that contains candidate object.

### Candidate object

- **name** — first name of the candidate
- **surname** — second name of the candidate
- **status** — candidate status
- **contacts** — contacts object:
  - **email** — candidate email
  - **phone** *(may be null)* — candidate phone
  - **skype** *(may be null)* — candidate skype
  - **city** — candidate city
  - **linkedin** *(may be null)* — candidate linkedIn
  - **links** *(may be empty)* — array of additional links
- **skills** — skills object:
  - **primarySkill** — candidate primary skill
  - **englishLevel** — candidate english level: Beginner|Elementary|Pre-Intermediate|Intermediate|Upper-Intermediate|Pre-Advanced|Advanced
  - **secondarySkill** — array of candidate secondary skills
- **communication** — additional object:
  - **resume** *(may be null)* — candidate resume
  - **lastChangeDate** — last candidate change date ("YYYY-MM-DDTHH:mm:ss.000Z")
  - **salary** *(may be null)* — candidate salary (String)

## Errors

- **403 Forbidden** — user with 'user' role can not read candidates
- **404 Not found** — there is no candidate in DB with such id

***

### Example

#### **Request**

``` Text
GET candidates/4
```

#### **Return**

``` JSON
{
  "name": "Kostya",
  "surname": "Stsefanovich",
  "status": "Pool",
  "contacts": {
    "email": "freeplayercot@gmail.com",
    "phone": "+375293552746",
    "skype": null,
    "city": "Minsk",
    "linkedin": null,
    "links": []
  },
  "skills": {
    "primarySkill": "js",
    "englishLevel": "0",
    "secondarySkills": []
  },
  "communication": {
    "resume": null,
    "lastChangeDate": "04/06/2009",
    "salary": "5000$"
  }
}
```
