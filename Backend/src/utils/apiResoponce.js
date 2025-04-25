class Apiresponce{
  constructor(stauscode,message="Success",data)
  {
    this.statusCode=stauscode,
    this.message=message,
    this.data=data
    this.success=stauscode>=200 && stauscode<300 ? true : false
  }
}

export {Apiresponce}