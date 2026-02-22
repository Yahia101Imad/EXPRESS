class apiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    let queryString = JSON.stringify(this.queryStr);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  select() {
    if (this.queryStr.fields) {
      const selectBy = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(selectBy);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || 10;
    const skip = (page - 1) * limit;

    // const moviesCount = await Movie.countDocuments(JSON.parse(queryStr));

    // if (skip >= moviesCount && moviesCount > 0) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "This page does not exist",
    //   });this.query
    // }

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = apiFeatures;
