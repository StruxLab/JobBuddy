module.exports = `
INSERT INTO jobpostings AS j (
  user_id,
  portal,
  status_code,
  position,
  salary,
  location,
  employer,
  external_id
) VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  COALESCE ($8::VARCHAR, uuid_generate_v4()::VARCHAR)
)
ON CONFLICT (user_id, external_id, portal)
DO UPDATE SET status_code = $3
RETURNING external_id, portal;
`;