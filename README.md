# todo-api

A restful API built using AWS CDK which could form the backend of a to-do list app.

### Technologies

```
- API Gateway
- DynamoDB
- Lambda
```

```
endpoints: {
    /todos: {
        GET: get all todos,
        POST: post new todo,
        PUT: update existing todo
    }
}
```

### Version Information

- aws-cdk-lib: 2.33.0
- node: v18.0.0
