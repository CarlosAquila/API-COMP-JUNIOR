### Prisma

https://www.prisma.io/docs/orm/prisma-client/queries/crud

### Reasons to use import or require

https://pt.stackoverflow.com/questions/213910/javascript-diferen%C3%A7as-entre-import-e-require

### 404 or 204

https://medium.com/localizalabs/404-204-200-qual-status-a-api-deve-retornar-quando-a-resposta-for-vazia-e4b153936398

### 401 or 403

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403

### Prisma M:N connect

https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/working-with-many-to-many-relations
https://stackoverflow.com/questions/65950407/prisma-many-to-many-relations-create-and-connect
https://www.youtube.com/watch?v=Z06vWUUoATU

### Prisma Error Codes
https://www.prisma.io/docs/orm/reference/error-reference#error-codes

### Node Mailer
https://www.freecodecamp.org/portuguese/news/como-usar-o-nodemailer-para-enviar-emails-do-seu-servidor-do-node-js/

### Admin
https://www.youtube.com/watch?v=AUY2AUAmT44
https://www.youtube.com/watch?v=jubl8MVIyX0
https://www.youtube.com/watch?v=DbKwNEBwZwI

### Jest and TypeScript
https://jestjs.io/pt-BR/docs/getting-started
https://jestjs.io/pt-BR/docs/mock-functions
https://jestjs.io/pt-BR/docs/asynchronous
https://www.devmedia.com.br/teste-unitario-com-jest/41234
https://www.youtube.com/watch?v=jBOLRzjEERk
https://github.com/HugoDF/express-supertest-moxios/blob/master/hugo.js
https://codewithhugo.com/testing-an-express-app-with-supertest-moxios-and-jest/
https://codewithhugo.com/express-request-response-mocking/
https://stackoverflow.com/questions/70737323/jest-error-typeerror-cannot-read-properties-of-undefined-reading-send

### Injeção de dependencias
https://medium.com/@eduardolanfredi/inje%C3%A7%C3%A3o-de-depend%C3%AAncia-ff0372a1672
https://stackoverflow.com/questions/557742/dependency-injection-vs-factory-pattern
https://gago.io/blog/ioc-e-dependency-injection-os-erros-comuns/
https://www.treinaweb.com.br/blog/container-de-injecao-de-dependencia-di-container

## KnownErrorParams 
https://github.com/prisma/prisma/issues/19353
export declare class PrismaClientKnownRequestError extends Error implements ErrorWithBatchIndex {
    code: string;
    meta?: Record<string, unknown>;
    clientVersion: string;
    batchRequestIdx?: number;
    constructor(message: string, { code, clientVersion, meta, batchRequestIdx }: KnownErrorParams);
    get [Symbol.toStringTag](): string;
}