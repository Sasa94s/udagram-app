# This file is used for convenience of local development.
export POSTGRES_USERNAME=udagram
export POSTGRES_PASSWORD=udagram1
export POSTGRES_HOST=127.0.0.1
export POSTGRES_DB=feeds_db
export AWS_BUCKET=arn:aws:s3:::udaconnect
export AWS_REGION=us-west-2
export AWS_PROFILE=test
export JWT_SECRET=testing
export URL=http://localhost:8100

psql -d postgres -f ./set_db.sql
