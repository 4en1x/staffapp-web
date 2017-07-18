# Logging out

``` Text
POST logout
```

## Description

Log the user out of the system and destroy the session.

***

## Return format

Status code 200 means, that user has been successfully logged out.

## Errors

- **401 Unauthorized** — User is not logged in to log out.

***

## Example

### Request

``` Text
POST logout
```

### Return

``` Text
Empty response with 200 status code.
```
