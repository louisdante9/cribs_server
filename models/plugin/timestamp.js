export default function timestamp(schema) {
  // Add the two fields to the schema
  schema.add({
    createdAt: Date,
    updatedAt: Date,
  });

  // Create a pre-save hook
  schema.pre('save', function (next) {
    const now = Date.now();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  });
}
