# Read an interview

``` Text
GET interviews/:id
```

## Description

Read an interview.

***

## Requires authentication

Authentication is required.

User with **user** / **hr** / **admin** role can read interviews assigned to them.

User with **hr** / **admin** role can read interviews assigned to them or created by them.

User with **admin** role can read all interviews.

***

## Parameters

- **id** *(required)* — interview id

***

## Return format

A JSON object that contains interview fields.

### Interview object

- **id** — unique id of the interview
- **type** — type of the interview:
  - **type: 'TECH'** — technical interview
  - **type: 'HR'** — HRM interview
  - **type: 'CLIENT'** — client interview
- **date** *(may be not defined)* — date of the interview (DD/MM/YYYY)
- **time** *(may be not defined)* — time of the interview (HH:mm)
- **place** *(may be not defined)* — place of the interview
- **hiringId** — parent hiring id
- **candidate** — candidate object:
  - **name** *(may be not defined)* — candidate first name
  - **surname** *(may be not defined)* — candidate last name
- **users** — array of user objects:
  - **id** — user id
  - **name** — user name
- **skills** — string array of skills
- **userFeedback** (*undefined if `status: 1`*) — feedback assigned to current user:
  - **id** — unique feedback id
  - **userId** — assigned user id
  - **interviewId** — parent interview id
  - **candidateId** — assigned candidate id
  - **comment** — review text
  - **status: 0** — feedback status (redundant info)
  - **fields** — array of feedback field objects
    - **id** — unique feedback field id
    - **name** — feedback field name (title)
    - **typeSkill** — type of a skill (primary, secondary, etc.), if the interview is a '**TECH**' interview
    - **feedbackId** — parent feedback id
    - **type** — type of field:
      - **type: 'tech'** — has **name**, **value**, **comment** and **typeSkill**
      - **type: 'hr'** — has **name** and **comment**
      - **type: 'client'** — has **comment**
- **feedbacks** (*undefined if user role is 'user'*) — array of feedback objects:
  - **id** — unique feedback id
  - **userId** — assigned user id
  - **interviewId** — parent interview id
  - **candidateId** — assigned interview id
  - **comment** — review text
  - **status** — feedback status:
    - **status: 0** — opened feedback
    - **status: 1** — closed feedback
  - **fields** — array of feedback field objects
    - **id** — unique feedback field id
    - **name** — feedback field name (title)
    - **value** — skill level (integer)
    - **comment** — comment to a skill
    - **typeSkill** — type of a skill (primary, secondary, etc.), if the interview is a '**TECH**' interview
    - **feedbackId** — parent feedback id
    - **type** — type of field:
      - **type: 'tech'** — has **name**, **value**, **comment** and **typeSkill**
      - **type: 'hr'** — has **name** and **comment**
      - **type: 'client'** — has **comment**

## Errors

- **403 Forbidden** — read **"Requires authentication"** section
- **404 Not found** — there is no interview in DB with such id

***

## Example

### Request

``` Text
GET interviews/3
```

### Return

``` JSON
{
  "id": 3,
  "type": "TECH",
  "date": "18/07/2017",
  "time": "15:30",
  "place": "somewhere",
  "hiringId": 1,
  "candidate": {
    "name": "First Name",
    "surname": "Last Name"
  },
  "users": [
    {
      "id": 1,
      "name": "John Smith"
    },
    {
      "id": 2,
      "name": "Sohn Jmith"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "Super Skill"],
  "userFeedback": {
    "id": 5,
    "userId": 1,
    "interviewId": 3,
    "candidateId": 1,
    "status": 0,
    "fields": [
      {
        "id": 11,
        "name": "C++ level",
        "typeSkill": "primary",
        "feedbackId": 5,
        "type": "tech"
      },
      {
        "id": 12,
        "name": "Some skill",
        "typeSkill": "secondary",
        "feedbackId": 5,
        "type": "tech"
      }
    ]
  }
  "feedbacks": [
    {
      "id": 5,
      "userId": 1,
      "interviewId": 3,
      "candidateId": 1,
      "status": 0,
      "fields": [
        {
          "id": 11,
          "name": "C++ level",
          "typeSkill": "primary",
          "feedbackId": 5,
          "type": "tech"
        },
        {
          "id": 12,
          "name": "Some skill",
          "typeSkill": "secondary",
          "feedbackId": 5,
          "type": "tech"
        }
      ]
    },
    {
      "id": 6,
      "userId": 2,
      "interviewId": 3,
      "candidateId": 1,
      "comment": "Review text 2",
      "status": 1,
      "fields": [
        {
          "id": 13,
          "name": "C++ level",
          "value": 7,
          "comment": "Comment about C++ level",
          "typeSkill": "primary",
          "feedbackId": 5,
          "type": "tech"
        }
      ]
    }
  ]
}
```
