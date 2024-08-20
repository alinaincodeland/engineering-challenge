export default class Job {
  constructor(name, id, request, favourite = false) {
    this.name = name;
    this.id = id;
    this.request = request;
    this.response = null;
    this.favorite = favourite;
  }
  setResponse(response) {
    this.response = response;
  }
}
