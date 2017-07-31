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
  - **secondarySkills** — array of candidate secondary skills
- **communication** — additional object:
  - **resume** *(may be null)* — candidate resume
  - **lastChangeDate** — last candidate change date ("DD/MM/YYYY")
  - **salary** *(may be null)* — candidate salary (String)
- **hirings** — array of hiring objects:

### Hiring object

- **id** — unique id of the hiring
- **dateOpen** — hiring opening date (DD/MM/YYYY)
- **timeOpen** — hiring opening time (HH:mm)
- **dateClose** *(may be not defined)* — hiring closing (DD/MM/YYYY)
- **timeClose** *(may be not defined)* — hiring closing time (HH:mm)
- **vacancyId** *(may be not defined)* — attached vacancy id
- **userId** — hiring creator id
- **interviews** — array of interview objects
  - **id** — unique interview id
  - **type** — type of the interview:
    - **type: 'TECH'** — technical interview
    - **type: 'HR'** — HRM interview
    - **type: 'OWNER'** — owner interview
  - **date** *(may be not defined)* — date of the interview (DD/MM/YYYY)
  - **time** *(may be not defined)* — time of the interview (HH:mm)
  - **place** *(may be not defined)* — place of the interview
  - **feedbacks** — array of feedback objects
    - **id** — unique feedback id
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
        - **type: 'owner'** — has **comment**

## Errors

- **403 Forbidden** — user with 'user' role can not read candidates
- **404 Not found** — there is no candidate in DB with such id

***

### Example

#### **Request**

``` Text
GET candidates/16
```

#### **Return**

``` JSON
{
    "name": "myfavorite",
    "surname": "unic",
    "status": "Pool",
    "contacts": {
        "email": "grixl",
        "phone": null,
        "skype": null,
        "city": "Minsk",
        "linkedin": null,
        "links": [
            "1234",
            "myl555nk",
            "someting"
        ]
    },
    "skills": {
        "primarySkill": ".NET",
        "englishLevel": "0",
        "secondarySkills": []
    },
    "communication": {
        "resume": null,
        "lastChangeDate": "28/07/2017",
        "salary": null
    },
    "hirings": [
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
                    "feedbacks": [
                        {
                            "id": 52,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 28,
                            "fields": [
                                {
                                    "id": 110,
                                    "name": "C++ skill",
                                    "typeSkill": "primary",
                                    "feedbackId": 52,
                                    "type": "tech"
                                },
                                {
                                    "id": 111,
                                    "name": "Some skill",
                                    "typeSkill": "secondary",
                                    "feedbackId": 52,
                                    "type": "tech"
                                }
                            ]
                        },
                        {
                            "id": 53,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 28,
                            "fields": []
                        },
                        {
                            "id": 54,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 28,
                            "fields": []
                        }
                    ],
                    "time": "18:00"
                }
            ],
            "timeOpen": "22:50",
            "timeClose": null
        },
        {
            "id": 19,
            "userId": 1,
            "vacancyId": null,
            "candidateId": 16,
            "dateOpen": "29/07/2017",
            "dateClose": "29/07/2017",
            "interviews": [],
            "timeOpen": "22:45",
            "timeClose": "22:50"
        },
        {
            "id": 18,
            "userId": 1,
            "vacancyId": null,
            "candidateId": 16,
            "dateOpen": "29/07/2017",
            "dateClose": "29/07/2017",
            "interviews": [
                {
                    "id": 27,
                    "type": "TECH",
                    "date": "27/07/2017",
                    "place": null,
                    "feedbacks": [
                        {
                            "id": 49,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 27,
                            "fields": [
                                {
                                    "id": 108,
                                    "name": "C++ skill",
                                    "typeSkill": "primary",
                                    "feedbackId": 49,
                                    "type": "tech"
                                },
                                {
                                    "id": 109,
                                    "name": "Some skill",
                                    "typeSkill": "secondary",
                                    "feedbackId": 49,
                                    "type": "tech"
                                }
                            ]
                        },
                        {
                            "id": 50,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 27,
                            "fields": []
                        },
                        {
                            "id": 51,
                            "userId": 3,
                            "candidateId": 16,
                            "comment": null,
                            "status": 0,
                            "interviewId": 27,
                            "fields": []
                        }
                    ],
                    "time": "18:00"
                }
            ],
            "timeOpen": "21:19",
            "timeClose": "22:42"
        }
    ]
}
```
