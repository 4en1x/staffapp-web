# Read a feedback

``` Text
GET feedbacks/:id
```

## Description

Read a feedback.

***

## Requires authentication

Authentication is required.

User with **user** / **hr** / **admin** role can read a feedback assigned to them.

User with **hr** / **admin** role can read all feedbacks.

***

## Parameters

- **id** *(required)* — feedbacks id

***

## Return format

A JSON object that contains feedback fields.

### Feedback object

- **id** — unique id of the feedback
- **userId** — assigned user id
- **interviewId** — parent interview id
- **candidateId** — assigned candidate id
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
- **404 Not found** — there is no feedback in DB with such id

***

## Example

### Request

``` Text
GET feedbacks/49
```

### Return

``` JSON
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
}
```
