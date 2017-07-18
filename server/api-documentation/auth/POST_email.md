# Authentication. Part 1

``` Text
POST email
```

## Description

The first stage of authentication. It checks for an existing email.

***

## Body

- **email** *(required)* - user email

***

## Return format

Status code 200 with an empty body means, that user with a provided email exists in the DB.

## Errors

- **401 Unauthorized** — There is no user in the DB with such email.

***

## Example

### Request

``` Text
POST email
```

### Body

``` Text
email=email@address.com
```

### Return

``` Text
Empty response with 200 status code.
```
