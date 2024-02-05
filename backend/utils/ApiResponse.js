class ApiResponse {
  constructor(statusCode, data, message = "Success", productCount) {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.productCount = productCount),
      (this.success = statusCode < 400);
  }
}

export { ApiResponse };
