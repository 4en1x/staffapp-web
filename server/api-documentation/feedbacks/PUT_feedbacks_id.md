# Send a feedback

``` Text
PUT feedbacks/:id
```

## Description

Send a feedback

***

## Requires authentication

Authentication is required.

User can send only their feedback.

***

## Parameters

- **id** *(required)* — unique id of the feedback

## Body

- **comment** — review text
- **fields** — array of feedback field objects
  - **id** — unique feedback field id
  - **value** — skill level (integer)
  - **comment** — comment to a skill

***

## Return format

An empty JSON object.

## Errors

- **403 Forbidden** — user tries to send not their feedback

***

## Example

### Request

``` Text
PUT feedbacks/23
```

### Body

``` JSON
{
  "comment": "Review text",
  "fields": [
    {
      "id": 41,
      "value": 8,
      "comment": "Something about the skill"
    },
    {
      "id": 42,
      "value": 6
    }
  ]
}
```

### Return

``` JSON
{}
```
