# Authentication. Part 2

``` Text
POST login
```

## Description

The second stage of authentication. It checks correctness of an email+password pair.

***

## Body

- **email** *(required)* - user email
- **password** *(required)* - user password

***

## Return format

Status code 200 with user name and role means, that user has been successfully signed in.

## Errors

- **401 Unauthorized** — Email+password pair does not match any DB entry.

***

## Example

### Request

``` Text
POST login
```

### Body

``` Text
email=email@address.com
password=userpass
```

### Return

``` JSON
{
  "name": "User Name",
  "role": "hr"
}
```
