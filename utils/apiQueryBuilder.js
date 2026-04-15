class APIQueryBuilder {
    constructor(query, queryString) {
        this.query = query; // Mongoose query object
        this.queryString = queryString; // Express req.query object
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);


        this.query = this.query.find(queryObj);

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // Default sorting by newest
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        return this;
    }

    paginate() {
        const page = parseInt(this.queryString.page * 1 ) || 1;
        const limit = parseInt(this.queryString.limit * 1 ) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        this.page = page;
        this.limit = limit;

        return this;

    }

    search() {
        if (this.queryString.search) {
            const search = this.queryString.search;

            this.query = this.query.find({
              $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
              ],
            });
            this.isSearch = true;
    }
        return this;
}
}

module.exports = APIQueryBuilder;