# Url Shortener API

## In the project directory, you can run:

```
yarn start
```

## To run the tests

```
yarn test
```

or

```
yarn test:watch
```

## Technologies used:

- NodeJs
- Express
- Typescript
- Typeorm
- Postgres
- Docker
- Cors
- Jest
- Bcryptjs
- Dayjs
- Node-cron
- Tsyringe
- Shortid

## Routes

### Users

- ### To create a new user:

  ```
  Post: /users
  {
    "name": "user name example",
    "email": "user@example.com",
    "password": "dev"
  }

  ```

  Responses:

  - Success
    ```
    status: 201
    ```
  - Error:

  ```
  status: 400
    {
      "message": "User already exists"
    }

  ```

  or

  ```
  status: 400

    {
      "message": "Name, email and password are required!"
    }
  ```

- ### To authenticate a user

  ```
  Post: /users/auth
  {
    "email": "user@example.com",
    "password": "dev"
  }

  ```

  Responses

  - Success

    ```
      status: 200
    {
      "user": {
          "id": "1e7c036c-a6de-4a2d-8dff-0b542e15d702"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJpYXQiOjE2NjI4Njc1MDEsImV4cCI6MTY2MzQ3MjMwMSwic3ViIjoiMWU3YzAzNmMtYTZkZS00YTJkLThkZmYtMGI1NDJlMTVkNzAyIn0.LXDopKNGT64xOSBoAAdkafGe5op2wJAO_qDDerIbTWs"
    }
    ```

  - Error

    ```
      status: 401

      {
       "message": "Incorret email or password"
      }
    ```

## Urls (User must be authenticated)

- ### To create a new short url

  ```
    Post /urls

    {
      "original_url": "https://open.spotify.com/?_ga=2.15167158.1208334188.1618015493-1998320498.1613444301"
    }
  ```

  Responses

  - Success

    ```
    status: 200

    {
      "url": {
      "id": "fec1272f-9821-4deb-994d-408098b80da0",
      "original_url": "https://open.spotify.com/?_ga=2.15167158.1208334188.1618015493-1998320498.1613444301",
      "shortUrl": "http://localhost:3333/urls/hrh_npGji",
      "created_at": "2022-09-11T03:50:39.223Z",
      "clicks": 0,
      "last_click_date": null
    },
    "message": "Shortened urls that remain idle for 3 months or more, ie without clicks, will be automatically deleted!"
    }
    ```

  - Error

    ```
    status: 400

    {
    "message": "You already have this url registered"
    }
    ```

    or

    ```
      status: 400

      {
        "message": "Invalid url"
      }

    ```

* ### To list all user urls

```
  get /urls
```

Responses

```
Status : 200

[
  {
    "id": "5e4235c9-264e-4724-9c68-f745c8a19f27",
    "original_url": "https://open.spotify.com/?_ga=2.15167158.1208334188.1618015493-1998320498.1613444301",
    "hash": "HKpluez6I",
    "clicks": "0",
    "user_id": "1e7c036c-a6de-4a2d-8dff-0b542e15d702",
    "short_url": "http://localhost:3333/urls/HKpluez6I",
    "created_at": "2022-09-11T04:01:36.773Z",
    "last_click_date": null
  },
  {
    "id": "aeebfcae-d1bb-449c-a434-9d20e0a46558",
    "original_url": "https://app.rocketseat.com.br/h/forum/react-js",
    "hash": "UHUzP4ZE8",
    "clicks": "0",
    "user_id": "1e7c036c-a6de-4a2d-8dff-0b542e15d702",
    "short_url": "http://localhost:3333/urls/UHUzP4ZE8",
    "created_at": "2022-09-11T04:04:06.466Z",
    "last_click_date": null
  }
]
```

- ### To redirect to original url

  ```
  get urls/:hash
  ```

  Responses

  ```
  status: 308

  User should be redirected to the original url, the number of clicks incremented, and the date of the last click updated
  ```
