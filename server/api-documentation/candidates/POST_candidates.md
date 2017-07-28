# Add a candidate

``` Text
POST candidates
```

## Description

Add a candidate.

***

## Requires authentication

'hr' or 'admin' role is required.

***

## Body

- **name** *(required)* — candidate first name
- **surname** *(required)* — candidate last name
- **city** *(required)* — candidate city
- **links** string array of links
- **primarySkill** *(required)* — candidate primary skill
- **salary** — candidate salary
- **englishLevel** *(required)* — candidate english level: Beginner|Elementary|Pre-Intermediate|Intermediate|Upper-Intermediate|Pre-Advanced|Advanced
- **email** *(required)* — candidate email
- **skype** — candidate skype
- **phone** — candidate phone
- **resume** — candidate resume
- **status** *(required)* — candidate status
- **linkedin** — candidate linkedin
- **primarySkillYearStart** — year when candidate started their primary skill

***

## Return format

A JSON object that contains id of the candidate.

## Errors

- **403 Forbidden** — user with 'user' role can not add candidates

***

### Example

#### **Request**

``` Text
POST candidates
```

#### **Body**

``` JSON
{
  "name": "Name 1",
  "surname": "Surname 1",
  "city": "Minsk",
  "links": [
    "link 1",
    "link 2"
  ],
  "primarySkill": "Primary Skill 1",
  "salary": "500",
  "email": "Email 1",
  "englishLevel": "A1",
  "skype": "Skype 1",
  "status": "Pool"
}
```

#### **Return**

``` JSON
{
  "id": 14
}
```
