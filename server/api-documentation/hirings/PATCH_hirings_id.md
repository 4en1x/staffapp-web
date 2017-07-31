# Update hiring

``` Text
PATCH hirings/:id
```

## Description

Update hiring

***

## Requires authentication

Authentication is required.

'hr' or 'admin' role is required to close hiring.

***

## Parameters

- **id** *(required)* — hiring id

## Body

- **vacancyId** — attached vacancy id

***

## Return format

{}

## Errors

- **403 Forbidden** — read **"Requires authentication"** section

## Example

### Request

``` Text
PATCH hirings/2
```

### Return

``` JSON
{}
```
