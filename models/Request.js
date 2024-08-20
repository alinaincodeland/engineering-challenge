export default class Request {
  constructor(httpMethod, apiEndpoint, headers, body, executionTime) {
    this.httpMethod = httpMethod;
    this.apiEndpoint = apiEndpoint;
    this.headers = headers;
    this.body = body;
    this.executionTime = executionTime;
  }
}
