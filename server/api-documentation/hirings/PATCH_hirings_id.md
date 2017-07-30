# Close hiring

``` Text
Patch hirings/:id
```

## Description

Close hiring

***

## Requires authentication

Authentication is required.

'hr' or 'admin' role is required to close hiring.

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
Patch hirings/2
```

### Return

``` JSON
{}
```
