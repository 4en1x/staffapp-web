# Delete hiring

``` Text
Delete hirings/:id
```

## Description

Delete hiring

***

## Requires authentication

Authentication is required.

'admin' role is required to delete hiring.

***

## Parameters

- **id** *(required)* — hiring id

***

## Return format

{}

## Errors


- **403 Forbidden** — user tries to read hiring without required permission
## Example

### Request

``` Text
Delete hirings/2
```

### Return

``` JSON
{}
```
